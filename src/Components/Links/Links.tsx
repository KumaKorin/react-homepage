import Background from '../Common/Background/Background'
import style from './Links.module.css'
import LinksCard from './LinksCard'

const links = [
    {
        "title": "纸绫",
        "subtitle": "MoriDreamers",
        "link": "https://www.moridreamers.com/?from=korin.im",
        "avatar": "https://cravatar.com/avatar/2b826c131afe46c2166d3acf46862b35?s=512"
    },
    {
        "title": "Aira",
        "subtitle": "艾了个拉",
        "link": "https://aira.cafe/?from=korin.im",
        "avatar": "https://cravatar.com/avatar/588a9fd8fde139d73aaeb95dd19b6827?s=512"
    },
    {
        "title": "Akuta Zehy",
        "link": "https://akutazehy.github.io/?from=korin.im",
        "avatar": "https://cravatar.com/avatar/54e2d9927b6a0b0bbce12bd4df8a913ae364f4de3b428e7a5cb1bddcec37ffb4?s=512"
    }
]

const Links = () => {
    return (
        <>
            <div className={style.links_wrapper}>
                <div className={style.links_container}>
                    <h1 className={style.links_title}>Friends</h1>
                    <div className={style.links_card_wrapper}>
                        <div className={style.links_card_container}>
                            {
                                links.map((item, index) => {
                                    return (
                                        <LinksCard
                                            key={index}
                                            title={item.title}
                                            subtitle={item.subtitle}
                                            link={item.link}
                                            avatar={item.avatar}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Background text="LINKS" />
        </>
    )
}

export default Links