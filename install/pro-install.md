# 企业版/专业版 安装

::: tip 提示
专业版/企业版安装后试用时长为1天。
:::

### 使用 PostgreSQL 数据库（推荐）

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

::: tip 安装成功后
访问 http://{ip}:8088/setup 进行用户初始化设置

访问 http://{ip}:8088/login 进行登陆
:::

### 升级版本

```shell
docker compose pull
docker compose up -d
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
  tls:
    enabled: false 
    auto: false # 自动申请https证书，开启时服务器端口必须为 443
    cert: ""
    key: ""

app:
  rpc:
    addr: 0.0.0.0:8099 # 安全网关注册到服务端使用的地址
    tls:
      enabled: false 
      cert: ""
      key: ""
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