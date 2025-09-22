# 配置文件

配置文件解释

::: code-group 

```yaml [config.yaml]
database:
  enabled: true
  type: sqlite # 可选 mysql,sqlite,postgres 选择对应的数据库类型之后，请填写对应的数据库配置
  sqlite:
    path: ./data/nt.db
  #  postgres:
  #    hostname: localhost
  #    port: 5432
  #    username: next-terminal
  #    password: next-terminal
  #    database: next-terminal
  #  mysql:
  #    hostname: localhost
  #    port: 3306
  #    username: next-terminal
  #    password: next-terminal
  #    database: next-terminal
  ShowSql: false
log:
  level: debug # 日志等级  debug,info,waring,error
  filename: ./logs/nt.log

server:
  addr: "0.0.0.0:8888"
  tls:
    enabled: false
    auto: false # 自动申请https证书，开启时服务器端口必须为 443
    cert: "./data/cert/localhost.pem"
    key: "./data/cert/localhost-key.pem"

app:
  website:
    accessLog: "./logs/access.log" # web 资产的访问日志路径
  recording:
    type: "local" # 录屏文件存储位置，可选 local, s3
    path: "/usr/local/next-terminal/data/recordings"
  #    s3:
  #      endpoint: "127.0.0.1:9000"
  #      accessKeyId: minioadmin
  #      secretAccessKey: miniopassword
  #      bucket: recording
  #      useSSL: false
  guacd:
    drive: "/usr/local/next-terminal/data/drive"
    hosts:
      - hostname: guacd
        port: 4822
        weight: 1

  # 下面的配置在 v2.6.0 及之后的版本生效
  reverseProxy:
    enabled: true # 是否启用反向代理
    httpEnabled: true # 是否启用 http 反向代理
    httpAddr: ":80" # http 监听地址
    httpRedirectToHttps: false  # 是否强制 http 访问转为 https
    httpsEnabled: true # 是否启用 https 反向代理
    httpsAddr: ":443" # https 监听地址
    selfProxyEnabled: true # 是否启用自代理
    selfDomain: "nt.yourdomain.com" # 自代理域名
    ipExtractor: "direct" # ip 提取方式，可选 direct, x-forwarded-for, x-real-ip
    ipTrustList: # 信任的IP地址列表
      - "0.0.0.0/0"
```


---

# 获取真实客户端 IP 简明指南

## 1. 没有代理（直连）

* **风险**：HTTP 头可伪造，不可信。
* **做法**：直接用网络层 IP。

```yaml
ipExtractor: "direct"
```

---

## 2. 有代理，使用 `X-Forwarded-For (XFF)`

* **机制**：每层代理在头部末尾追加自己的 IP。
* **风险**：客户端可伪造左边的值。
* **正确做法**：从右往左找第一个不可信 IP（即非代理的 IP）。

```yaml
ipExtractor: "x-forwarded-for"
```

默认信任全部IP，使用 `X-Forwarded-For` 左侧的第一个IP。

当然你也可以自定义信任的IP范围
```yaml
ipTrustList: # 信任的IP地址列表
  - "0.0.0.0/0"
```

---

## 3. 有代理，使用 `X-Real-IP`

* **机制**：只传递一个 IP。
* **风险**：若代理未清理外部请求头，可能被伪造。
* **做法**：信任代理设置的头，并配置信任策略。

```yaml
ipExtractor: "x-real-ip"
```

---

## 4. 必须配置边缘代理

* **要求**：禁止透传外部请求中的 `X-Forwarded-For` / `X-Real-IP`。
* **原因**：否则客户端可伪造，存在安全风险。

---

## 5. 默认行为

默认读取网络层 IP

---

## 6. 私有地址范围（默认会信任）

* IPv4:

    * 10.0.0.0/8
    * 172.16.0.0/12
    * 192.168.0.0/16
* IPv6:

    * fc00::/7

---

👉 总结：

* **直连**：用 `direct`。
* **有代理**：优先用 `x-forwarded-for` 或 `x-real-ip`，并配置 `TrustOption`。
* **边缘代理必须清洗头部**，否则不安全。

---


:::