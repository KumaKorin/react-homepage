import Blog from '../Components/Blog/Blog'
import Footer from '../Components/Common/Footer/Footer'
import useDocumentTitle from '../Utils/Hooks/useDocumentTitle'

const BlogPage = () => {
    useDocumentTitle({ documentTitle: 'Blog' })
    return (
        <>
            <Blog />
            <Footer />
        </>
    )
}

export default BlogPage
