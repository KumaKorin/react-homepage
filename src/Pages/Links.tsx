import Links from '../Components/Links/Links'
import Footer from '../Components/Common/Footer/Footer'
import useDocumentTitle from '../Utils/Hooks/useDocumentTitle'

const LinksPage = () => {
    useDocumentTitle({ documentTitle: 'Links' })
    return (
        <>
            <Links />
            <Footer />
        </>
    )
}

export default LinksPage
