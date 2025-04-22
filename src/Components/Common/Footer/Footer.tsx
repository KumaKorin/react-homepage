import style from "./Footer.module.css"


const Footer = () => {

    const miitLicense: string | null | undefined = import.meta.env.VITE_MIIT_LICENSE;

    if (miitLicense) {
        return (
            <div className={style.footer_wrapper}>
                <div className={style.footer_container}>
                    <div className={style.footer_miit}>
                        <a href="https://beian.miit.gov.cn" target="_blank">{miitLicense}</a>
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }

}

export default Footer