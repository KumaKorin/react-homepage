import React from "react";
import { Link } from "react-router-dom";
import { AiFillCalendar } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";
import style from "./BlogCard.module.css"

interface BlogCardProps {
    articleId: string;
    articleTitle: string;
    articleDescription: string;
    articleDate?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ articleId, articleTitle, articleDescription, articleDate }) => {
    return (
        <div className={style.blog_card_wrapper}>
            <div className={style.blog_card_container}>
                <h1 className={style.blog_card_title}>{articleTitle}</h1>
                <p className={style.blog_card_description}>{articleDescription}</p>
                <div className={style.blog_card_info}>
                    <p className={style.blog_card_date}><AiFillCalendar /> {articleDate} </p>
                    <Link className={style.blog_card_link} target="_blank" to={articleId} >Read More <FaAngleRight /></Link>
                    {/* <Link className={style.blog_card_link} to={`/blog/${articleId}`} >Read More <FaAngleRight /></Link> */}
                </div>
            </div>
        </div>
    )
}

export default BlogCard