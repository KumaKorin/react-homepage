import { useEffect } from "react";
import { profile } from "../../profile"

const useDocumentTitle = ({ documentTitle }: { documentTitle?: string }) => {

    const siteName = profile.sitename;

    useEffect(() => {
        if (documentTitle) {
            document.title = `${documentTitle} - ${siteName}`;
        } else {
            document.title = `${siteName}`;
        }
    }, [documentTitle, siteName])

}

export default useDocumentTitle