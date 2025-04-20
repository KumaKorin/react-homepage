import { FaBilibili, FaYoutube } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { useRef, useState } from "react";

import style from './Profile.module.css'

const Profile = () => {

    const profileNames = [
        "KumaKorin", "熊こりん", "熊可狸", "阿狸丶A"
    ]

    const [nameClicked, setNameClicked] = useState(1)

    const profileName = useRef<HTMLHeadingElement | null>(null)

    const handleNameClick = () => {
        setNameClicked((prev) => (prev + 1) % profileNames.length);
        if (profileName.current) {
            profileName.current.textContent = profileNames[nameClicked]
        }
    }

    return (
        <div className={style.profile_wrapper}>
            <div className={style.profile_container}>
                <div className={style.profile_image_wrapper}>
                    <img src="https://m1.miaomc.cn/uploads/20210623_b735dde7c665d.jpeg" className={style.profile_image} />
                </div>
                <div className={style.profile_content_wrapper}>
                    <div className={style.profile_info_wrapper}>
                        <h1 className={style.profile_info_name} ref={profileName} onClick={() => handleNameClick()} title="Try click it!">KumaKorin</h1>
                        <p className={style.profile_info_signature}>My existence is a perpetual miracle to me.</p>
                    </div>
                    <div className={style.profile_social_wrapper}>
                        <a href="https://github.com/KumaKorin" target="blank" className={style.profile_social_item}><FaGithub /></a>
                        <a href="https://www.youtube.com/@KumaKorin" target="blank" className={style.profile_social_item}><FaYoutube /></a>
                        <a href="https://space.bilibili.com/37078929" target="blank" className={style.profile_social_item}><FaBilibili /></a>
                        <a href="mailto:kumakorin@duck.com" target="blank" className={style.profile_social_item}><MdEmail /></a>
                    </div>
                </div>
            </div>
            <p className={style.profile_background}>{`<PROFILE>`}</p>
        </div>
    )
}

export default Profile