import { Link } from 'react-router-dom';
import Background from '../Components/Common/Background/Background';
import Footer from '../Components/Common/Footer/Footer';
import useDocumentTitle from '../Utils/Hooks/useDocumentTitle';


const NotFound = () => {
    useDocumentTitle(({ documentTitle: "404" }));
    return (
        <>
            <div
                style={{
                    height: '100vh',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    overflowX: 'hidden',
                }}
            >
                <div
                    style={{
                        fontSize: '64px',
                        fontWeight: 'bold',
                        color: 'var(--color-accent-title)',
                    }}
                >
                    <h3>404 Not Found</h3>
                    <Link to="/" style={{
                        fontSize: '24px',
                        fontWeight: 'normal',
                        color: 'var(--color-accent-title)',
                        textDecoration: 'none',
                        border: '1px solid var(--color-accent-title)',
                        padding: '10px 20px',
                        borderRadius: '12px',
                        transition: 'background-color 0.3s, color 0.3s',
                    }}>返回主页</Link>
                </div>
                <Background text='Error' />
            </div>
            <Footer />
        </>
    );
};

export default NotFound;