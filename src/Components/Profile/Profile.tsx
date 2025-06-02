import { FaBilibili, FaYoutube } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { FaGithub, FaQq, FaTelegram, FaTwitter } from 'react-icons/fa'
import { SiFrontendmentor } from 'react-icons/si'
import { JSX, useRef, useState } from 'react'
import style from './Profile.module.css'
import { profile } from '../../profile'
import { BsTwitterX } from 'react-icons/bs'

const Profile = () => {
    const [nameClicked, setNameClicked] = useState(1)
    const profileName = useRef<HTMLHeadingElement | null>(null)

    const profileNames = profile.names

    const handleNameClick = () => {
        setNameClicked((prev) => (prev + 1) % profileNames.length)
        if (profileName.current) {
            profileName.current.textContent = profileNames[nameClicked]
        }
    }

    const socialIcons: { [key: string]: JSX.Element } = {
        github: <FaGithub />,
        youtube: <FaYoutube />,
        bilibili: <FaBilibili />,
        telegram: <FaTelegram />,
        qq: <FaQq />,
        twitter: <FaTwitter />,
        x: <BsTwitterX />,
        email: <MdEmail />,
        frontendMentor: <SiFrontendmentor />
    }

    return (
        <div className={style.profile_wrapper}>
            <div className={style.profile_container}>
                <div className={style.profile_image_wrapper}>
                    <img src={profile.image} className={style.profile_image} />
                </div>
                <div className={style.profile_content_wrapper}>
                    <div className={style.profile_info_wrapper}>
                        <h1
                            className={style.profile_info_name}
                            ref={profileName}
                            onClick={() => handleNameClick()}
                            title="Try click it!"
                        >
                            {profileNames[0]}
                        </h1>
                        <p className={style.profile_info_signature}>{profile.description}</p>
                    </div>
                    <div className={style.profile_social_wrapper}>
                        {Object.entries(profile.socialLinks).map(([key, link]) => (
                            <a key={key} href={link} target="blank" className={style.profile_social_item}>
                                {socialIcons[key]}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <p className={style.profile_background}>{`<PROFILE/>`}</p>
        </div>
    )
}

export default Profile
