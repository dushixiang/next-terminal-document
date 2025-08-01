# Web资产

此功能旨在保护内部网站，相较于直接将网站暴露在公网环境，具备两大显著优势：

1. **强化认证机制**：用户必须先登录 NextTerminal 系统，方可访问目标网站，为网站安全增添一层坚实保障。
2. **精准用户授权**：可将网站的访问权限精确授予指定用户，仅获得授权的用户能够访问目标网站，有效控制访问范围。

## 适用场景及解决方案

### 场景一：公网 IP 网站访问限制
- **问题描述**：网站拥有公网 IP，但不希望任何人都能随意访问，且用户宽带为动态 IP 地址，无法通过限制 IP 进行访问控制。
- **解决方案**：将目标网站的访问权限限制为仅允许 NextTerminal 系统的 IP 地址访问，利用 NextTerminal 系统对该网站进行代理，并将访问权限授予指定用户，且身份信息可通过LADP进行统一管理。

### 场景二：多云内部系统统一访问
- **问题描述**：内网网站担心暴露在公网环境中遭受攻击，且内网网站分布于多个云或数据中心。
- **解决方案**：在内网部署安全网关并将其注册到 NextTerminal 系统，通过 NextTerminal 系统代理该网站并选择对应内网的安全网关，最后将访问权限授予指定用户，用户由统一入口进行访问。

### 场景三：政务云等互联网权限访问受限场景访问
- **问题描述**：内网服务器无互联网访问权限，需要通过跳板机进行服务器管理和运维，非常不方便且无法审计操作。
- **解决方案**：在跳板机部署安全网关，通过NextTerminal系统统一访问内网的SSH，WEB等协议。


## 使用文档

### 配置反向代理服务器

开启反向代理服务器后，它会在本地监听对应的端口。请确保 Docker 容器正确映射了端口。

若使用自动申请 HTTPS 证书功能，服务器需要监听 443 端口，并且系统需具备公网 IP。

“代理自身系统”指的是利用反向代理服务器处理自身系统的请求。填写域名后，系统会自动识别系统根路径。

系统根路径的作用在于，当访问反向代理的网站时，系统需要验证当前登录用户是否具有访问权限，只有知晓正确的根路径，才能将用户重定向到系统的授权页面。

![img.png](images/reverse-proxy.png)

## 添加网站
### 1.增加域名解析
- 首先应该将准备好的域名解析至NT的IP
- **技巧**：如果业务较多的情况下，可配置泛解析，减少后续域名解析变更的操作

### 2.添加网站
- **名称**：可自行设定，无特殊要求。
- **域名**：指通过反向代理服务器访问网站时使用的域名。若在内网环境使用，可采用自定义的 DNS 服务。
- **入口路径**：即网站打开后自动跳转的路径，一般填写 `/` 即可，也可留空。
- **资产协议**：填写 `HTTP` 或者 `HTTPS`。
- **资产 IP**：填写目标网站的内网IP地址或域名(请先确定从nt或安全网关访问业务的畅通性)。
- **资产端口**：填写 `80` 或者 `443`。
- **安全网关**：根据实际需求进行选择。


![img.png](images/reverse-proxy-post.png)
