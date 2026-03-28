import style from './Footer.module.css'
import { useTheme } from '../../../Context/themeContext'
const Footer = () => {
    const miitLicense: string | null | undefined = import.meta.env.VITE_MIIT_LICENSE
    const miitLicenseUrl: string | null | undefined = import.meta.env.VITE_MIIT_LICENSE_URL

    const { theme } = useTheme()
    const currentTheme = theme

    const upyunLogo = {
        dark: 'https://i1.mcobj.com/imgb/u1/20251205_6932d7514e80a.png',
        light: 'https://i1.mcobj.com/imgb/u1/20251205_6932da72e6d1b.png'
    }

    const logoUrl = currentTheme === 'dark' ? upyunLogo.dark : upyunLogo.light

    return (
        <div className={style.footer_wrapper}>
            <div className={style.footer_container}>
                <div
                    className={style.footer_upyun}
                    onClick={() =>
                        window.open('https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral', '_blank')
                    }
                >
                    由
                    <img src={logoUrl} alt="UPYUN Logo" />
                    提供存储与加速服务
                </div>
                {miitLicense && (
                    <div className={style.footer_miit}>
                        <a href={`${miitLicenseUrl}`} target="_blank" rel="noopener noreferrer">
                            {miitLicense}
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
    // } else {
    //     return null
    // }
}

export default Footer
