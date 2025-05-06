import Profile from '../Components/Profile/Profile'
import Footer from '../Components/Common/Footer/Footer'
import useDocumentTitle from '../Utils/Hooks/useDocumentTitle'

const HomePage = () => {
    useDocumentTitle({ documentTitle: "Home" });
    return (
        <>
            <Profile />
            <Footer />
        </>
    )
}

export default HomePage