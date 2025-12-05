import { createBrowserRouter } from 'react-router-dom'
import Layout from '../Components/Layout/Layout'
import HomePage from '../Pages/Home'
import BlogPage from '../Pages/Blog'
import BlogPostPage from '../Pages/BlogPost'
import LinksPage from '../Pages/Links'
import NotFoundPage from '../Pages/NotFound'
import State from '../Components/State/State'

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/blog', element: <BlogPage /> },
            { path: '/blog/:slug', element: <BlogPostPage /> },
            { path: '/links', element: <LinksPage /> },
            { path: '/state', element: <State /> },
            { path: '*', element: <NotFoundPage /> }
        ]
    }
])

export default appRouter
