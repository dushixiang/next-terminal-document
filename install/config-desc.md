# 配置文件详解 (`config.yaml`)

本文档详细说明了 Next Terminal 的 `config.yaml` 配置文件中的各项参数，以帮助您更好地完成自定义配置。

::: tip 相关文档
- [Web 资产（反向代理）使用指南](../usage/website.md)
:::

---

## `Database` - 数据库配置

此部分用于配置 Next Terminal 的数据存储。

```yaml
Database:
  Enabled: true
  Type: postgres
  Postgres:
    Hostname: localhost
    Port: 5432
    Username: next-terminal
    Password: next-terminal
    Database: next-terminal
  ShowSql: false
```

-   **`Enabled`**: 是否启用数据库，默认为 `true`。
-   **`Type`**: 数据库类型，目前仅支持 `postgres`。
-   **`Postgres`**: PostgreSQL 数据库的连接参数。
    -   **`Hostname`**: 主机地址。
    -   **`Port`**: 端口。
    -   **`Username`**: 用户名。
    -   **`Password`**: 密码。
    -   **`Database`**: 数据库名称。
-   **`ShowSql`**: 是否在日志中打印执行的 SQL 语句，用于调试，默认为 `false`。

---

## `Log` - 日志配置

管理系统的日志输出。

```yaml
Log:
  Level: debug # 日志等级  debug,info,waring,error
  Filename: ./logs/nt.log
```

-   **`Level`**: 日志记录的级别，可选值：`debug`, `info`, `warning`, `error`。
-   **`Filename`**: 日志文件的存储路径。

---

## `Server` - 服务配置

Next Terminal Web 服务本身的核心配置。

```yaml
Server:
  Addr: "0.0.0.0:8088"
```

-   **`Addr`**: Web 管理界面的监听地址和端口。

---

## `App` - 核心应用配置

包含多项核心功能的详细配置。

### `Website`

-   **`AccessLog`**: Web 资产的访问日志路径。
    ```yaml
    Website:
      AccessLog: "./logs/access.log"
    ```

### `Recording` - 会话录像

配置 SSH、RDP 等会话录像的存储方式。

```yaml
Recording:
  Type: "local" # 录屏文件存储位置，可选 local, s3
  Path: "/usr/local/next-terminal/data/recordings"
#    S3:
#      Endpoint: "127.0.0.1:9000"
#      AccessKeyId: minioadmin
#      SecretAccessKey: miniopassword
#      Bucket: recording
#      UseSSL: false
```

-   **`Type`**: 录像存储类型。
    -   `local`: 存储在本地文件系统。
    -   `s3`: 存储在兼容 S3 协议的对象存储服务中（如 MinIO、阿里云 OSS 等）。
-   **`Path`**: 当 `Type` 为 `local` 时，指定录像文件的存储目录。
-   **`S3`**: 当 `Type` 为 `s3` 时，配置 S3 服务的连接参数。

### `Guacd` - Guacamole 服务

配置 Guacamole Server 的连接信息，它是 RDP、VNC 等图形化协议的核心组件。

```yaml
Guacd:
  Drive: "/usr/local/next-terminal/data/drive"
  Hosts:
    - Hostname: guacd
      Port: 4822
      Weight: 1
```

-   **`Drive`**: Guacd 的虚拟云盘路径，用于 RDP 文件传输等功能。
-   **`Hosts`**: Guacd 服务实例列表，支持配置多个实例以实现负载均衡。
    -   **`Hostname`**: Guacd 服务的主机名或 IP。
    -   **`Port`**: Guacd 服务的端口，默认为 `4822`。
    -   **`Weight`**: 负载均衡权重。

### `ReverseProxy` - 反向代理

用于启用和配置 Web 资产反向代理功能。

```yaml
ReverseProxy:
  Enabled: true
  HttpEnabled: true
  HttpAddr: ":80"
  HttpRedirectToHttps: false
  HttpsEnabled: true
  HttpsAddr: ":443"
  SelfProxyEnabled: true
  SelfDomain: "nt.yourdomain.com"
  Root: ""
  IpExtractor: "direct"
  IpTrustList:
    - "0.0.0.0/0"
```

-   **`Enabled`**: 是否启用反向代理功能。
-   **`HttpEnabled`**: 是否启用 HTTP 监听。
-   **`HttpAddr`**: HTTP 监听地址和端口。
-   **`HttpRedirectToHttps`**: 是否将所有 HTTP 请求强制重定向到 HTTPS。
-   **`HttpsEnabled`**: 是否启用 HTTPS 监听。
-   **`HttpsAddr`**: HTTPS 监听地址和端口。
-   **`SelfProxyEnabled`**, **`SelfDomain`**, **`Root`**: 这三个参数共同决定了用户访问受保护网站时的认证跳转逻辑。详细用法请参考 [Web 资产使用指南](../usage/website.md#关键配置说明)。
-   **`IpExtractor`**: 获取客户端真实 IP 的策略。
-   **`IpTrustList`**: 与 `IpExtractor` 配合使用，定义了可信任的代理服务器 IP 地址列表。

#### 获取真实客户端 IP

在网络请求经过多层代理后，获取用户的真实 IP 地址变得至关重要。`IpExtractor` 提供了三种策略来应对不同的部署场景。

##### 策略一：直接连接 (`direct`)

-   **适用场景**：客户端直接连接到 Next Terminal，中间没有反向代理（如 Nginx、HAProxy）。
-   **工作方式**：直接使用网络连接中的远端 IP 地址作为客户端 IP。
-   **风险**：如果 Next Terminal 前面实际上存在代理，此策略将获取到代理服务器的 IP，而非真实用户的 IP。

##### 策略二：使用 X-Forwarded-For (`x-forwarded-for`)

-   **适用场景**：Next Terminal 前端至少有一个反向代理，并且该代理正确设置了 `X-Forwarded-For` 请求头。
-   **工作方式**：`X-Forwarded-for` (XFF) 头记录了请求经过的每一个代理服务器的 IP。此策略会从该头中提取 IP。
-   **安全警告**：`X-Forwarded-For` 头容易被客户端伪造。因此，**必须**配置 `IpTrustList`，仅信任您的边缘代理服务器。系统会从右至左遍历 XFF 头中的 IP，并返回第一个**不被信任**的 IP 作为真实客户端地址。
-   **示例**：
    ```yaml
    IpExtractor: "x-forwarded-for"
    IpTrustList:
      - "192.168.1.0/24"  # 信任您的代理服务器 IP 段
      - "10.0.0.1/32"       # 信任单个代理 IP
    ```

##### 策略三：使用 X-Real-IP (`x-real-ip`)

-   **适用场景**：您的代理服务器（如 Nginx）配置为将客户端 IP 放入 `X-Real-IP` 头中。
-   **工作方式**：直接读取 `X-Real-IP` 请求头的值作为客户端 IP。
-   **安全警告**：与 XFF 类似，`X-Real-IP` 也可能被伪造。您**必须**配置 `IpTrustList` 来指定哪些代理是可信的，同时确保您的边缘代理会覆盖（而不是追加）客户端传来的同名请求头。
-   **示例**：
    ```yaml
    IpExtractor: "x-real-ip"
    IpTrustList:
      - "192.168.1.1/32" # 信任您的代理服务器 IP
    ```

##### 安全配置核心要点

1.  **绝不盲目信任 HTTP 头**：除非请求来自您信任的代理，否则 `X-Forwarded-For` 和 `X-Real-IP` 都不可信。
2.  **配置边缘代理**：您的最外层代理（如 Nginx）应正确处理客户端 IP，并剥离或覆盖掉由客户端伪造的 IP 相关头部。
3.  **精确配置 `IpTrustList`**：`IpTrustList` 是确保 IP 提取安全的关键。请仅将您的反向代理服务器的 IP 地址或地址段加入此列表。

##### 默认信任的私有地址

为方便常见内网部署，Next Terminal 默认信任以下私有 IP 地址范围。如果您的代理位于这些网段，您可能无需额外配置 `IpTrustList`。

-   **IPv4**: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`
-   **IPv6**: `fc00::/7`