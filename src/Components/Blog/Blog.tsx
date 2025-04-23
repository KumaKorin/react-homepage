import BlogCard from "./BlogCard"
import style from "./Blog.module.css"
import Background from "../Common/Background/Background"
import { getPostsList } from "../../Utils/Content/Providers/Contentful"
import Pagination from "../Common/Pagination/Pagination"
import React, { useEffect, useState } from "react"

interface PostsListShape {
    title: string;
    description: string;
    slug: string;
    publishedTime: string;
    isPinned?: boolean;
}

const Blog: React.FC = () => {

    const itemsLimit = parseInt(import.meta.env.VITE_BLOG_ITEMS_PER_PAGE) || 10;

    const [totalItems, setTotalItems] = useState<number>(0);

    const [posts, setPosts] = useState<PostsListShape[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [status, setStatus] = useState<"Loading" | "Error" | "Done">("Loading");

    let userLanguage = navigator.language;

    if (import.meta.env.VITE_I18N) {


        if (navigator.language.toLowerCase().startsWith("zh")) {
            userLanguage = "zh-Hans";
        } else {
            userLanguage = "en";
        }
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await getPostsList(currentPage - 1, userLanguage);
                setTotalItems(res.total);
                setPosts(res.items);
                setStatus("Done");
            } catch (err) {
                console.log(err);
                setStatus("Error");
                setTimeout(() => {
                    document.getElementById("error_details")!.innerHTML = String(err);
                }, 200)
            }
        };
        fetchPosts();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className={style.blog_wrapper}>
                <div className={style.blog_container}>
                    <h1 className={style.blog_title}>Blog</h1>
                    <div className={style.blog_card_wrapper}>
                        {
                            posts.length === 0 && status === "Done" ? (
                                <>
                                    <div className={style.blog_tip_error}>{`Something went wrong :(`}</div>
                                    <div className={style.blog_tip_error_details} id="error_details">No Posts Yet</div>
                                </>
                            ) : status === "Loading" ? (
                                <div className={style.blog_tip_loading}>Now Loading ...</div>
                            ) :
                                status === "Done" ? (
                                    posts.map((post, index) => (
                                        <BlogCard
                                            key={post.slug}
                                            articleId={post.slug}
                                            articleTitle={post.title}
                                            articleDescription={post.description}
                                            articleDate={post.publishedTime}
                                            cardStyle={{ animationDelay: `${index * 0.1}s` }}
                                        />
                                    ))
                                ) : status === "Error" ? (
                                    <>
                                        <div className={style.blog_tip_error}>{`Something went wrong :(`}</div>
                                        <div className={style.blog_tip_error_details} id="error_details"></div>
                                    </>
                                ) : (
                                    <div className={style.blog_tip_loading}>Now Loading ...</div>
                                )
                        }
                    </div>
                    <Pagination totalItems={totalItems} itemsLimitPerPage={itemsLimit} visiblePages={5} currentPage={currentPage} handlePageChange={handlePageChange} />
                </div>
            </div>
            <Background text="BLOG" />
        </>
    );
};

export default Blog
