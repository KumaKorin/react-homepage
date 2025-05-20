import style from './BlogPost.module.css'
import Background from '../Common/Background/Background'
import { getPostsContent } from '../../Utils/Content/Providers/Contentful'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Document } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Link } from 'react-router-dom'
import { BLOCKS } from '@contentful/rich-text-types';
import parse from 'html-react-parser';
import useDocumentTitle from '../../Utils/Hooks/useDocumentTitle'
import useStorage from '../../Utils/Hooks/useStorage'

const options = {
    renderNode: {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
            const content = node.content.map((child: any) => child.value).join('');
            if (content.includes('<img')) {
                return parse(content);
            }
            return <p>{children}</p>;
        },
    },
};

interface getPostsContentShape {
    title: string,
    content: Document,
    publishedTime: string,
    isPinned?: boolean
}

const BlogPost = () => {
    let userLanguage = navigator.language;

    if (import.meta.env.VITE_I18N) {
        if (navigator.language.toLowerCase().startsWith("zh")) {
            userLanguage = "zh-Hans";
        } else {
            userLanguage = "en";
        }
    }
    const { slug } = useParams<{ slug: string }>();

    const storageKey = `${userLanguage}_BlogPost_${slug}`;
    const storageHandler = useStorage<getPostsContentShape>(storageKey);

    const [status, setStatus] = useState<"Loading" | "Error" | "Done">("Loading");
    const [articleContent, setArticleContent] = useState<getPostsContentShape | null>(null);
    const [documentTitle, setDocumentTitle] = useState<string | undefined>("Loading");
    useDocumentTitle({ documentTitle: documentTitle });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getPostsContent(slug || " ", userLanguage);
                storageHandler("put", res);
                setArticleContent(res);
                setStatus("Done");
            } catch (error) {
                console.error('Error fetching blog post:', error);
                setStatus("Error");
                setDocumentTitle("Error");

                // 缓存错误状态
                storageHandler("put", { status: "error", message: `${error}` } as unknown as getPostsContentShape);

                setTimeout(() => {
                    document.getElementById("error_details")!.innerHTML = String(error);
                }, 200);
            }
        };

        const isValid = storageHandler("check") as boolean;
        if (isValid) {
            const localPosts = storageHandler("get") as getPostsContentShape | { status: string } | null;
            if (localPosts) {
                if ((localPosts as { status: string, message: string }).status === "error") {
                    // 如果缓存中是错误状态
                    setStatus("Error");
                    setDocumentTitle("Error");
                    setTimeout(() => {
                        document.getElementById("error_details")!.innerHTML = (localPosts as { status: string; message: string }).message;
                    }, 200);
                    return;
                }

                setArticleContent(localPosts as getPostsContentShape);
                setStatus("Done");
                return;
            }
        }

        fetchData();
    }, [slug, storageHandler, userLanguage]);

    useEffect(() => {
        setDocumentTitle(articleContent?.title);
    }, [articleContent?.title])

    return (
        <div className={style.post_wrapper}>
            <article className={style.post_container} key={status}>
                <h1 className={style.post_title}>
                    {
                        status === "Done"
                            ? articleContent!.title
                            : status === "Error"
                                ? ""
                                : "Now Loading ..."
                    }
                </h1>
                <section className={style.post_content} style={{ animationDelay: "200ms" }}>
                    {
                        status === "Done" && articleContent
                            ? documentToReactComponents(articleContent.content, options)
                            : status === "Error"
                                ? <>
                                    <div className={style.tip_error}>Something went wrong :(</div>
                                    <div className={style.tip_error_details} id="error_details"></div>
                                    <div className={style.tip_error_details}><Link to="/blog" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{`< Back to blog list`}</Link></div>
                                </>
                                : <div className={style.tip_loading}> Now Loading ...</div>
                    }
                    {
                        status === "Done"
                            ? <Link to="/blog" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{`< Back to blog list`}</Link>
                            : null
                    }

                </section>
            </article>
            {
                status === "Done" || status === "Loading"
                    ? <Background text="POST" />
                    : <Background text="OOPS" />
            }
        </div>
    )
}

export default BlogPost