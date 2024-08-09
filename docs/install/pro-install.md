# 企业版/专业版 安装

::: tip 提示
企业版安装后试用时长为1个月。
:::

## 使用阿里云镜像自动安装

### 使用 PostgreSQL 数据库

```shell
curl -sSL https://f.typesafe.cn/next-terminal-premium/docker-compose-postgres.yml > docker-compose.yml
curl -sSL https://f.typesafe.cn/next-terminal-premium/config-postgres.yaml > config.yaml
docker compose up -d
```

### 使用 Mysql 数据库

```shell
curl -sSL https://f.typesafe.cn/next-terminal-premium/docker-compose-mysql.yml > docker-compose.yml
curl -sSL https://f.typesafe.cn/next-terminal-premium/config-mysql.yaml > config.yaml
docker compose up -d
```

### 使用 Sqlite 数据库

```shell
curl -sSL https://f.typesafe.cn/next-terminal-premium/docker-compose-sqlite.yml > docker-compose.yml
curl -sSL https://f.typesafe.cn/next-terminal-premium/config-sqlite.yaml > config.yaml
docker compose up -d
```

该版本初始用户信息为随机创建，您可以通过过滤日志来查看默认账户密码。

```
docker compose logs | grep "default account"
```

## 配置文件详解

config.yaml

``` yaml
database:
  enabled: true
  type: mysql # 可选 mysql,sqlite,postgres 选择对应的数据库类型之后，请填写对应的数据库配置
  mysql:
    hostname: "localhost"
    port: 3306
    username: next-terminal
    password: next-terminal
    database: next-terminal
  sqlite:
    path: ./data/nt.db
  postgres:
    hostname: "localhost"
    port: 5432
    username: next-terminal
    password: next-terminal
    database: next-terminal
log:
  level: debug # 日志等级  debug,info,waring,error
  filename: ./logs/nt.log

server:
  addr: "0.0.0.0:8088"
  # 获取IP地址的方式
  #    x-forwarded-for: 读取header `X-Forwarded-For`
  #    x-real-ip: 读取 header `x-real-ip`
  #    direct: 读取对方的网络请求地址，适用于前面没有类似 nginx 之类的反向代理服务器
  IPExtractor: "x-forwarded-for" 
  # 信任的IP地址
  #  客户端（1.1.1.1） -> 反向代理服务器（公网地址：2.2.2.2）-> NT 服务器（3.3.3.3）
  #  在这种场景下，NT服务器获取到的客户端IP地址永远都是反向代理服务器的公网地址，是为了避免其他人恶意解析域名到您的服务器上。
  #  如果该反向代理服务器是您自己部署的，则可以在下面这个字段中增加反向代理服务器的IP地址，默认是一个CIDR地址，单独的IP需要在后面加上 /32 。
  IPTrustList:
    - "127.0.0.1/32"
  tls:
    enabled: false 
    auto: false # 自动申请https证书，开启时服务器端口必须为 443
    cert: ""
    key: ""

app:
  rpc:
    addr: 0.0.0.0:8099 # 安全网关注册到服务端使用的地址
  recording:
    type: "local"
    path: "/usr/local/next-terminal/data/recordings"
  guacd:
    drive: "/usr/local/next-terminal/data/drive"
    hosts:
      - hostname: guacd
        port: 4822
        weight: 1
```