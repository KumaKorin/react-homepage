import BlogCard from "./BlogCard"
import style from "./Blog.module.css"
import Background from "../Share/Background/Background"

const Blog = () => {
    return (
        <>
            <div className={style.blog_wrapper}>
                <div className={style.blog_container}>
                    <h1 className={style.blog_title}>博客</h1>
                    <div className={style.blog_card_wrapper}>
                        {/* {
                            articles.map((article) => {
                                return (
                                    <BlogCard key={article.id} articleId={article.id} articleTitle={article.title} articleDescription={article.description} articleDate={article.date} />
                                )
                            })
                        } */}
                        <BlogCard key="1" articleId="https://ali-a.cn" articleTitle="你别急，后端还没写" articleDescription="但是前端的博客卡片大概长这样..." articleDate="114514" />
                        <h1 className={style.blog_comingsoon}>你先别急，后端还没写<br />你可以先去 <a href="https://ali-a.cn" target="_blank">ali-a.cn</a> 看看</h1>
                    </div>
                </div>
            </div>
            <Background text="BLOG" />
        </>
    )
}

export default Blog
