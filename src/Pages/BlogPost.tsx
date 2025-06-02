import BlogPost from '../Components/Blog/BlogPost'
import useDocumentTitle from '../Utils/Hooks/useDocumentTitle'

const BlogPostPage = () => {
    useDocumentTitle({ documentTitle: 'Posts' })
    return (
        <>
            <BlogPost />
        </>
    )
}

export default BlogPostPage
