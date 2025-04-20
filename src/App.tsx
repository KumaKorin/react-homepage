import appRouter from './Routers/Router';
import { RouterProvider } from 'react-router-dom';

const App = () => {
    return (
        <RouterProvider router={appRouter} />
    );
};

export default App;