import appRouter from './Routers/Router';
import { RouterProvider } from 'react-router-dom';
import { getPostsList } from './Utils/Content/Providers/Contentful';

const App = () => (
    <RouterProvider router={appRouter} />
);

console.log(getPostsList('Blog', 0));

export default App;