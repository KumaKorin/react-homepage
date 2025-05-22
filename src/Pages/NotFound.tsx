import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Background from '../Components/Common/Background/Background';
import Footer from '../Components/Common/Footer/Footer';
import useDocumentTitle from '../Utils/Hooks/useDocumentTitle';

const NotFound = () => {
    useDocumentTitle({ documentTitle: "404" });
    return (
        <>
            <NotFoundContainer>
                <ContentWrapper>
                    <h3>404 Not Found</h3>
                    <StyledLink to="/">返回主页</StyledLink>
                </ContentWrapper>
                <Background text='Error' />
            </NotFoundContainer>
            <Footer />
        </>
    );
};

const NotFoundContainer = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow-x: hidden;
`;

const ContentWrapper = styled.div`
    font-size: 64px;
    font-weight: bold;
    color: var(--color-accent-title);

    h3 {
        margin-bottom: 20px;
    }
`;

const StyledLink = styled(Link)`
    font-size: 24px;
    font-weight: normal;
    color: var(--color-accent-title);
    text-decoration: none;
    border: 1px solid var(--color-accent-title);
    padding: 10px 20px;
    border-radius: 12px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: var(--color-accent-hover);
        color: var(--color-text-secondary);
    }
`;

export default NotFound;