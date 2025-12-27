import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Next Terminal",
    description: "Next Terminal 官方文档 - 一个简单、好用、安全的开源运维审计系统",
    head: [
        ['link', { rel: 'icon', href: '/logo.svg' }],
        ['meta', { name: 'keywords', content: 'Next Terminal, 运维审计, 堡垒机, SSH, RDP, VNC, Telnet, 开源' }],
        ['meta', { property: 'og:title', content: 'Next Terminal - 开源运维审计系统' }],
        ['meta', { property: 'og:description', content: 'Next Terminal 是一个简单、好用、安全的开源运维审计系统，支持 SSH、RDP、VNC、Telnet 等多种协议' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:url', content: 'https://next-terminal.typesafe.cn' }],
        ['meta', { property: 'og:image', content: 'https://next-terminal.typesafe.cn/logo.svg' }],
        [
            'script',
            {
                async: '',
                src: 'https://umami.typesafe.cn/script.js',
                'data-website-id': '4693b455-683d-4012-a715-cb5fd297ccdc'
            }
        ]
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        lastUpdated: {
            text: '最后更新',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },
        editLink: {
            pattern: 'https://github.com/dushixiang/next-terminal-document/edit/main/:path',
            text: '在 GitHub 上编辑此页'
        },
        outline: {
            level: [2, 3],
            label: '页面导航'
        },
        nav: [
            {text: 'GitHub', link: 'https://github.com/dushixiang/next-terminal'},
            {text: '官网地址', link: 'https://next-terminal.typesafe.cn'}
        ],

        sidebar: [
            {
                text: '安装文档',
                collapsed: false,
                items: [
                    {
                        text: '系统需求',
                        link: '/install/system-requirements.md'
                    }, {
                        text: '容器安装',
                        link: '/install/container-install.md'
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
                collapsed: false,
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
                        text: '访问资产',
                        items: [
                            {
                                text: '资产访问',
                                link: '/usage/access.md'
                            },
                            {
                                text: 'RDP/VNC 错误码',
                                link: '/usage/error-codes.md'
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
                            {
                                text: '2fa(TOTP)',
                                link: '/usage/otp.md'
                            },
                            {
                                text: '绑定授权',
                                link: '/usage/license.md'
                            }
                        ]
                    },
                ]
            },
            {
                text: '常见问题',
                collapsed: false,
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
                        text: '备份恢复',
                        link: '/faq/backup.md'
                    },
                    {
                        text: 'v1 升级 v2',
                        link: '/faq/v1tov2.md'
                    }
                ]
            },
            {
                text: '付费服务',
                collapsed: false,
                items: [
                    {
                        text: '安装服务',
                        link: '/services/readme.md'
                    }
                ]
            },
            {
                text: 'API 文档',
                collapsed: false,
                items: [
                    {
                        text: '证书管理',
                        link: '/api/certificate.md'
                    }
                ]
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/dushixiang/next-terminal'}
        ]
    }
})
