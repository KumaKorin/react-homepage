import BlogCard from './BlogCard'
import style from './Blog.module.css'
import Background from '../Common/Background/Background'
import { getPostsList } from '../../Utils/Content/Providers/Contentful'
import Pagination from '../Common/Pagination/Pagination'
import React, { useEffect, useState } from 'react'
import useStorage from '../../Utils/Hooks/useStorage'

interface PostsListShape {
    title: string
    description: string
    slug: string
    publishedTime: string
    isPinned?: boolean
}

const Blog: React.FC = () => {
    const itemsLimit = parseInt(import.meta.env.VITE_BLOG_ITEMS_PER_PAGE) || 10
    const [totalItems, setTotalItems] = useState<number>(0)
    const [posts, setPosts] = useState<PostsListShape[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [status, setStatus] = useState<'Loading' | 'Error' | 'Done'>('Loading')

    let userLanguage = navigator.language
    if (import.meta.env.VITE_I18N) {
        if (navigator.language.toLowerCase().startsWith('zh')) {
            userLanguage = 'zh-Hans'
        } else {
            userLanguage = 'en'
        }
    }

    const storageKey = `${userLanguage}_BlogList_Page${currentPage}`
    const storageHandler = useStorage<PostsListShape[]>(storageKey)

    const totalItemsHandler = useStorage<number>('TotalItems')

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await getPostsList(currentPage - 1, userLanguage)
                setTotalItems(res.total)
                totalItemsHandler('put', res.total)
                storageHandler('put', res.items)
                setPosts(res.items)
                setStatus('Done')
            } catch (err) {
                console.log(err)
                setStatus('Error')
            }
        }

        const isValid = storageHandler('check') as boolean
        if (isValid) {
            const localPosts = storageHandler('get') as PostsListShape[] | null
            const totalItems = totalItemsHandler('get') as number
            if (localPosts) {
                setTotalItems(totalItems)
                setPosts(localPosts)
                setStatus('Done')
            }
            // 如果存在本地缓存且有效直接 return
            return
        }

        fetchPosts()
    }, [currentPage, userLanguage, storageHandler, totalItems, totalItemsHandler])

    const handlePageChange = (page: number) => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setCurrentPage(page)
    }

    return (
        <>
            <div className={style.blog_wrapper}>
                <div className={style.blog_container}>
                    <h1 className={style.blog_title}>Blog</h1>
                    <div className={style.blog_card_wrapper}>
                        {posts.length === 0 && status === 'Done' ? (
                            <>
                                <div className={style.blog_tip_error}>{`Something went wrong :(`}</div>
                                <div className={style.blog_tip_error_details} id="error_details">
                                    No Posts Yet
                                </div>
                            </>
                        ) : status === 'Loading' ? (
                            <div className={style.blog_tip_loading}>Now Loading ...</div>
                        ) : status === 'Done' ? (
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
                        ) : status === 'Error' ? (
                            <>
                                <div className={style.blog_tip_error}>{`Something went wrong :(`}</div>
                                <div className={style.blog_tip_error_details} id="error_details"></div>
                            </>
                        ) : (
                            <div className={style.blog_tip_loading}>Now Loading ...</div>
                        )}
                    </div>
                    <Pagination
                        totalItems={totalItems}
                        itemsLimitPerPage={itemsLimit}
                        visiblePages={5}
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </div>
            <Background text="BLOG" />
        </>
    )
}

export default Blog
