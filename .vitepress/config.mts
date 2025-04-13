import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Next Terminal",
    description: "Next Terminal 官方文档",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'GitHub', link: 'https://github.com/dushixiang/next-terminal'},
            {text: '官网地址', link: 'https://next-terminal.typesafe.cn'}
        ],

        sidebar: [
            {
                text: '安装文档',
                collapsible: true,
                items: [
                    {
                        text: '容器安装',
                        link: '/install/docker-install.md'
                    },
                    {
                        text: '原生安装',
                        link: '/install/native-install.md'
                    },
                    {
                        text: '配置文件',
                        link: '/install/config-desc.md'
                    },
                    {
                        text: '反向代理',
                        link: '/install/reverse-proxy.md'
                    },
                ],
            },
            {
                text: '使用文档',
                items: [
                    {
                        text: '快速开始',
                        link: '/usage/readme.md'
                    },
                    {
                        text: '资源管理',
                        items: [
                            {
                                text: '资产管理',
                                link: '/usage/asset.md'
                            },
                            {
                                text: 'Web资产',
                                link: '/usage/website.md'
                            },
                        ]
                    },
                    {
                        text: '接入网关',
                        items: [
                            {
                                text: 'SSH网关',
                                link: '/usage/ssh-gateway.md'
                            },
                            {
                                text: '安全网关',
                                link: '/usage/agent-gateway.md'
                            },
                        ]
                    },
                    {
                        text: '系统设置',
                        items: [
                            {
                                text: '通行令牌（Passkey）',
                                link: '/usage/passkey.md'
                            },
                        ]
                    },
                ]
            },
            {
                text: '常见问题',
                collapsible: true,
                items: [
                    {
                        text: 'FAQ',
                        link: '/faq/readme.md'
                    },
                    {
                        text: '命令行',
                        link: '/faq/cli.md'
                    },
                    {
                        text: 'v1 升级 v2',
                        link: '/faq/v1tov2.md'
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

        socialLinks: [
            {icon: 'github', link: 'https://github.com/dushixiang/next-terminal'}
        ]
    }
})
