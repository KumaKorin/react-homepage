import React from "react";
import style from "./LinksCard.module.css"

interface LinksCardProps {
    title: string;
    subtitle?: string;
    link: string;
    avatar: string;
}

const LinksCard: React.FC<LinksCardProps> = ({ title, subtitle, link, avatar }) => {
    return (
        <div className={style.links_card_wrapper}>
            <div className={style.links_card_container} onClick={() => window.open(link, "_blank")}>
                <img className={style.links_card_avatar} src={avatar} alt="Avatar" />
                <div className={style.links_card_content}>
                    <h1 className={style.links_card_title}>{title}</h1>
                    {subtitle && <p className={style.links_card_subtitle}>{subtitle}</p>}
                </div>
            </div>
        </div >
    )
}

export default LinksCard