import Background from '../Share/Background/Background'
import style from './Links.module.css'
import LinksCard from './LinksCard'

const links = [
    {
        "title": "KumaKorin",
        "subtitle": "熊可狸",
        "link": "https://korin.im",
        "avatar": "https://m1.miaomc.cn/uploads/20210623_b735dde7c665d.jpeg"
    },
    {
        "title": "Another Friend",
        "subtitle": "另一个朋友",
        "link": "https://another-example.com",
        "avatar": "https://picsum.photos/200?2"
    },
    {
        "title": "Tech Blog",
        "subtitle": "技术博客",
        "link": "https://techblog.com",
        "avatar": "https://picsum.photos/200?3"
    },
    {
        "title": "Design Hub",
        "subtitle": "设计中心",
        "link": "https://designhub.com",
        "avatar": "https://picsum.photos/200?4"
    },
    {
        "title": "Travel Diaries",
        "subtitle": "旅行日记",
        "link": "https://traveldiaries.com",
        "avatar": "https://picsum.photos/200?5"
    },
    {
        "title": "Food Lover",
        "subtitle": "美食爱好者",
        "link": "https://foodlover.com",
        "avatar": "https://picsum.photos/200?6"
    },
    {
        "title": "Code Master",
        "subtitle": "代码大师",
        "link": "https://codemaster.com",
        "avatar": "https://picsum.photos/200?7"
    },
    {
        "title": "Nature Explorer",
        "subtitle": "自然探索者",
        "link": "https://natureexplorer.com",
        "avatar": "https://picsum.photos/200?8"
    },
    {
        "title": "Art Studio",
        "subtitle": "艺术工作室",
        "link": "https://artstudio.com",
        "avatar": "https://picsum.photos/200?9"
    },
    {
        "title": "Fitness Guru",
        "subtitle": "健身达人",
        "link": "https://fitnessguru.com",
        "avatar": "https://picsum.photos/200?10"
    }
]

const Links = () => {
    return (
        <>
            <div className={style.links_wrapper}>
                <div className={style.links_container}>
                    <h1 className={style.links_title}>友链</h1>
                    <div className={style.links_card_wrapper}>
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
            <Background text="LINKS" />
        </>
    )
}

export default Links