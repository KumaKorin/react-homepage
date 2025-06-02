import Background from '../Common/Background/Background'
import style from './Links.module.css'
import LinksCard from './LinksCard'
import { links } from '../../profile'

const Links = () => {
    return (
        <>
            <div className={style.links_wrapper}>
                <div className={style.links_container}>
                    <h1 className={style.links_title}>Friends</h1>
                    <div className={style.links_card_wrapper}>
                        <div className={style.links_card_container}>
                            {links.map((item, index) => {
                                return (
                                    <LinksCard
                                        key={index}
                                        title={item.title}
                                        subtitle={item.subtitle}
                                        link={item.link}
                                        avatar={item.avatar}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Background text="LINKS" />
        </>
    )
}

export default Links
