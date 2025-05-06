import Blog from "../Components/Blog/Blog";
import useDocumentTitle from "../Utils/Hooks/useDocumentTitle";

const BlogPage = () => {
    useDocumentTitle({ documentTitle: "Blog" });
    return (
        <>
            <Blog />
        </>
    );
};

export default BlogPage;