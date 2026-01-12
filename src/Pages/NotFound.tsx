import { Link } from 'react-router'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import Background from '../Components/Common/Background/Background'
import Footer from '../Components/Common/Footer/Footer'
import useDocumentTitle from '../Utils/Hooks/useDocumentTitle'

const NotFound = () => {
    useDocumentTitle({ documentTitle: 'Not Found' })
    return (
        <>
            <NotFoundContainer>
                <ContentWrapper>
                    <h3>404 Not Found</h3>
                    <ReturnButton to="/">返回主页</ReturnButton>
                </ContentWrapper>
                <Background text="Error" />
            </NotFoundContainer>
            <Footer />
        </>
    )
}

const NotFoundContainer = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow-x: hidden;
`

const fadeInUp = keyframes`
    from {
        opacity: 0;
        filter: blur(10px);
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        filter: blur(0);
        transform: translateY(0);
    }
`

const ContentWrapper = styled.div`
    font-size: 64px;
    font-weight: bold;
    color: var(--color-accent-title);

    h3 {
        margin-bottom: 20px;
        animation: ${fadeInUp} 0.5s ease forwards;
    }
`

const buttonFadeInUp = keyframes`
    from {
        opacity: 0;
        filter: blur(10px);
        transform: translateY(-40px);
    }
    to {
        opacity: 1;
        filter: blur(0);
        transform: translateY(0);
    }
`

const ReturnButton = styled(Link)`
    display: inline-block;
    font-size: 24px;
    font-weight: normal;
    color: var(--color-accent-title);
    text-decoration: none;
    border: 1px solid var(--color-accent-title);
    padding: 10px 20px;
    border-radius: 12px;
    transition: all ease 0.3s;
    animation: ${buttonFadeInUp} 0.5s ease forwards;

    &:hover {
        border: 1px solid var(--color-accent-solid);
        background-color: var(--color-accent-solid);
        color: var(--color-text-secondary);
    }
`

export default NotFound
