import { createBrowserRouter } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import HomePage from "../Pages/Home";
import BlogPage from "../Pages/Blog";
import LinksPage from "../Pages/Links";

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/blog', element: <BlogPage /> },
            { path: '/links', element: <LinksPage /> },
        ],
    },
]);

export default appRouter;