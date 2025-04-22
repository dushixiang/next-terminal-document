# 系统需求
## 硬件及依赖最小需求
| Name                         | Hardware Requirements                                                                                                        | Software Requirements                                                                                     |
|------------------------------|------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| docker安装 | - CPU: 1 cores<br/> - RAM: >= 1GB <br/>- Storage: >= 40 GB SSD | - [docker](https://docs.docker.com/engine/install/ubuntu/) <br/>- curl                                                                                       |
| 原生安装    | - CPU: 1 cores <br/> - RAM: >= 1GB <br/>- Storage: >= 40 GB SSD | - Apache Guacamole-Server 1.5.5+  <br/>- Sqlite or Mysql(include:MariaDB,Percona) or PostgreSQL<br/>- wget,tar |
| 安全网关安装    | - CPU: 1 cores  <br/>- RAM: >= 256MB                                                                   | - curl                                                                                                |

## 网络需求
- next-terminal的安装需求连接互联网网络，访问安装好的next-terminal也需要保证端口可访问.
- 启用web资产功能，如需打开自动申请https证书，需next-terminal的反向代理监听端口必须为443对公网可访问。
- 如果使用安全网关功能，需要保证安全网关注册服务的端口(8099)可访问到next-terminal。
- 如使用ssh网关功能，需保证next-terminal ssh登录到网关的网络通畅，必要时可手动验证。
### 端口详细说明：
- "8088": next-terminal的Web管理端口
- "8099": 安全网关与服务端通信的端口（不需要可以删除）
- "2022": SSH Server 的端口 （不需要可以删除）
- "80"  : Web 资产反向代理使用的端口，HTTP 协议 （不需要可以删除）
- "443" : Web 资产反向代理使用的端口，HTTPS 协议 （不需要可以删除，如果需要自动申请 HTTPS 证书，必须映射为 443 端口）

## 推荐操作系统
- next-terminal: 类Linux
- 安全网关: 推荐类Linux系统， Windows及Macos能使用， 但存在一定兼容性问题

## 浏览器兼容
- Microsoft Edge: The latest version + previous major versions
- Firefox: All versions
- Chrome: All versions
- Safari: Latest Safari version (only support on macOS)
