# `config.yaml` Reference

This document explains each configuration item in Next Terminal's `config.yaml` so you can customize deployment behavior safely.

::: tip Related docs
- [Web Asset (Reverse Proxy) Guide](../usage/website)
:::

---

## `Database`

This section controls data persistence.

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

- **`Enabled`**: Enable database support. Default is `true`.
- **`Type`**: Database type. Currently only `postgres` is supported.
- **`Postgres`**: PostgreSQL connection settings.
  - **`Hostname`**: Host address.
  - **`Port`**: Port number.
  - **`Username`**: Username.
  - **`Password`**: Password.
  - **`Database`**: Database name.
- **`ShowSql`**: Whether to print executed SQL statements in logs for debugging. Default is `false`.

---

## `Log`

Manages system log output.

```yaml
Log:
  Level: debug # log level: debug,info,warning,error
  Filename: ./logs/nt.log
```

- **`Level`**: Log level. Supported values: `debug`, `info`, `warning`, `error`.
- **`Filename`**: Path of the log file.

---

## `Server`

Core web service settings.

```yaml
Server:
  Addr: "0.0.0.0:8088"
```

- **`Addr`**: Listening address and port for the web admin UI.

---

## `App`

Contains multiple core functional settings.

### `Website`

- **`AccessLog`**: Access log path for Web Assets.

```yaml
Website:
  AccessLog: "./logs/access.log"
```

### `Recording`

Controls storage for SSH/RDP session recordings.

```yaml
Recording:
  Type: "local" # recording storage type: local, s3
  Path: "/usr/local/next-terminal/data/recordings"
#    S3:
#      Endpoint: "127.0.0.1:9000"
#      AccessKeyId: minioadmin
#      SecretAccessKey: miniopassword
#      Bucket: recording
#      UseSSL: false
```

- **`Type`**: Recording storage backend.
  - `local`: Save on local filesystem.
  - `s3`: Save to an S3-compatible object storage (MinIO, Alibaba OSS, etc.).
- **`Path`**: Local recording directory when `Type` is `local`.
- **`S3`**: S3 connection settings when `Type` is `s3`.

### `Guacd`

Connection settings for Guacamole Server, the core component for graphical protocols such as RDP/VNC.

```yaml
Guacd:
  Drive: "/usr/local/next-terminal/data/drive"
  Hosts:
    - Hostname: guacd
      Port: 4822
      Weight: 1
```

- **`Drive`**: Virtual drive path for Guacd, used for features like RDP file transfer.
- **`Hosts`**: Guacd instance list. Multiple instances are supported for load balancing.
  - **`Hostname`**: Hostname or IP of Guacd service.
  - **`Port`**: Guacd port. Default is `4822`.
  - **`Weight`**: Load balancing weight.

### `ReverseProxy`

Enables and configures Web Asset reverse proxying.

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

- **`Enabled`**: Enable reverse proxy feature.
- **`HttpEnabled`**: Enable HTTP listener.
- **`HttpAddr`**: HTTP listening address and port.
- **`HttpRedirectToHttps`**: Force redirect all HTTP requests to HTTPS.
- **`HttpsEnabled`**: Enable HTTPS listener.
- **`HttpsAddr`**: HTTPS listening address and port.
- **`SelfProxyEnabled`**, **`SelfDomain`**, **`Root`**: These three settings control login redirection behavior when users access protected websites. See the [Web Asset guide](../usage/website#key-configuration-notes) for details.
- **`IpExtractor`**: Strategy for extracting the real client IP.
- **`IpTrustList`**: Works with `IpExtractor` to define trusted proxy IP addresses.
