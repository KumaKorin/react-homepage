import { index, layout, route, type RouteConfig } from '@react-router/dev/routes'

export default [
    layout('./routes/layout.tsx', [
        index('./routes/home.tsx'),
        route('blog', './routes/blog.tsx'),
        route('blog/:slug', './routes/blog.$slug.tsx'),
        route('links', './routes/links.tsx'),
        route('state', './routes/state.tsx'),
        route('*', './routes/not-found.tsx')
    ])
] satisfies RouteConfig
