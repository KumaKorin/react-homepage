import Background from '../Common/Background/Background'
import style from './Links.module.css'
import LinksCard from './LinksCard'
import { links } from '../../profile'
import { useState } from 'react'

const Links = () => {
    // 等待进场动画结束
    const animateTime = 0.8
    const [inAnimate, setInAnimate] = useState(true)

    setTimeout(() => {
        setInAnimate(false)
    }, animateTime * 1000)

    const [tipsDisplay, setTipsDisplay] = useState(false)

    return (
        <>
            <div className={style.links_wrapper} style={inAnimate ? { pointerEvents: 'none' } : {}}>
                <div className={style.links_container}>
                    <h1
                        className={style.links_title}
                        onClick={() => {
                            if (!tipsDisplay) setTipsDisplay(true)
                        }}
                        title="Try click it!"
                    >
                        Friends
                    </h1>
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
                                        animationDelay={index * 60}
                                    />
                                )
                            })}
                        </div>
                    </div>

                    {tipsDisplay ? (
                        <p className={style.links_tip}>
                            <span>
                                排名不分先后。欢迎交换友链，请联系 <a href="mailto:me@korin.im">me@korin.im</a>！
                            </span>
                        </p>
                    ) : null}
                </div>
            </div>
            <Background text="LINKS" />
        </>
    )
}

export default Links
