import Header from '../Share/Header/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <Header />

            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;