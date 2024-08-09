module.exports = {
    title: 'Next Terminal',
    description: 'Next Terminal 官方文档',
    themeConfig: {
        search: true,
        footer: {
            copyright: 'Copyright © 2019-2024 指针漂移科技工作室'
        },
        head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
        nav: [
            { text: 'GitHub', link: 'https://github.com/dushixiang/next-terminal' },
            { text: 'Gitee', link: 'https://gitee.com/dushixiang/next-terminal' },
            { text: '官网地址', link: 'https://next-terminal.typesafe.cn' },
        ],
        sidebar: [
            {
                text: '安装文档',
                collapsible: true,
                items: [
                    {
                        text: '企业版/专业版安装',
                        link: '/install/pro-install.md'
                    },
                    {
                        text: '开源版 Docker 安装',
                        link: '/install/docker-install.md'
                    },
                    {
                        text: '开源版 原生安装',
                        link: '/install/native-install.md'
                    },
                    {
                        text: '反向代理',
                        link: '/install/reverse-proxy.md'
                    },
                ],
            },
            {
                text: '使用文档',
                collapsible: true,
                items: [
                    {
                        text: '快速开始',
                        link: '/usage/readme.md'
                    },
                    {
                        text: '资源管理',
                        link: '/usage/resource.md'
                    }
                ]
            },
            {
                text: '常见问题',
                collapsible: true,
                items: [
                    {
                        text: '常见问题',
                        link: '/faq/readme.md'
                    }
                ]
            },
            {
                text: '付费服务',
                collapsible: true,
                items: [
                    {
                        text: '安装服务',
                        link: '/services/readme.md'
                    }
                ]
            }
        ],
    },
    base: '.',
}