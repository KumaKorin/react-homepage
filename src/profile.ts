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
    image: 'https://m1.miaomc.cn/uploads/20210623_b735dde7c665d.jpeg',
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
        avatar: 'https://cravatar.com/avatar/2b826c131afe46c2166d3acf46862b35?s=512'
    },
    {
        title: '艾了个拉',
        subtitle: 'Aira',
        link: 'https://aira.cafe/?from=korin.im',
        avatar: 'https://cravatar.com/avatar/588a9fd8fde139d73aaeb95dd19b6827?s=512'
    },
    {
        title: 'Akuta Zehy',
        link: 'https://akutazehy.github.io/?from=korin.im',
        avatar: 'https://cravatar.com/avatar/54e2d9927b6a0b0bbce12bd4df8a913ae364f4de3b428e7a5cb1bddcec37ffb4?s=512'
    },

    {
        title: '是未来呐',
        subtitle: 'Wenuu',
        link: 'https://www.wenuu.cn/?from=korin.im',
        avatar: 'https://cravatar.com/avatar/23c51fce715e221bb371b4bd2437d8bc?s=512'
    }

    // {
    //     title: '唐辫小二',
    //     subtitle: 'LARMAXHARKER',
    //     link: 'https://larmaxharkerx.github.io/?from=korin.im',
    //     avatar: 'https://i1.mcobj.com/imgb/u1/20260109_69606ac284bd2.jpeg'
    // }
]
