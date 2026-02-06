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