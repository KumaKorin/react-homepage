interface profile {
    sitename: string
    names: string[]
    description: string
    image: string
    socialLinks: object
}

interface links {
    title: string
    avatar: string
    subtitle?: string
    link: string
}

export const profile: profile = {
    sitename: 'KumaKorin',
    names: ['KumaKorin', '熊こりん', '熊可狸', '阿狸丶A'],
    description: 'Nothing easy is worth doing.',
    image: '/avatar.jpg',
    socialLinks: {
        github: 'https://github.com/KumaKorin',
        youtube: 'https://www.youtube.com/@KumaKorin',
        bilibili: 'https://space.bilibili.com/37078929',
        telegram: 'https://t.me/KumaKorin',
        email: 'mailto:kumakorin@duck.com',
        frontendMentor: 'https://www.frontendmentor.io/profile/KumaKorin'
    }
}

export const links: links[] = [
    {
        title: '纸绫',
        subtitle: 'MoriDreamers',
        link: 'https://www.yuque.com/moridreamers?from=korin.im',
        avatar: 'https://i1.mcobj.com/imgb/u1/20260605_6a22ca4f28dc4.png'
    },
    {
        title: '艾了个拉',
        subtitle: 'Aira',
        link: 'https://aira.cafe/?from=korin.im',
        avatar: 'https://aira.cafe/images/avatar.webp'
    },
    {
        title: 'Akuta Zehy',
        link: 'https://akutazehy.github.io/?from=korin.im',
        avatar: 'https://avatars.githubusercontent.com/u/42381419'
    },
    {
        title: '是未来呐',
        subtitle: 'Wenuu',
        link: 'https://www.wenuu.cn/?from=korin.im',
        avatar: 'https://cravatar.com/avatar/23c51fce715e221bb371b4bd2437d8bc?s=512'
    },
    {
        title: 'Smirnova Oyama',
        link: 'https://mahiro.uk/?from=korin.im',
        avatar: 'https://mahiro.uk/content/nekoxun.jpg'
    },
    {
        title: 'WaveYo',
        link: 'https://www.waveyo.cn?from=korin.im',
        avatar: 'https://www.waveyo.cn/WaveYo.jpg'
    }

    // {
    //     title: '唐辫小二',
    //     subtitle: 'LARMAXHARKER',
    //     link: 'https://larmaxharkerx.github.io/?from=korin.im',
    //     avatar: 'https://i1.mcobj.com/imgb/u1/20260109_69606ac284bd2.jpeg'
    // }
]
