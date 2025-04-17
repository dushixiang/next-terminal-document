# 安装

### 使用 PostgreSQL 数据库（推荐）

::: code-group

```shell [中国大陆]
curl -sSL https://f.typesafe.cn/next-terminal/docker-compose-postgres-aliyun.yml > docker-compose.yml
curl -sSL https://f.typesafe.cn/next-terminal/config-postgres.yaml > config.yaml
docker compose up -d
```

```shell [其他]
curl -sSL https://f.typesafe.cn/next-terminal/docker-compose-postgres.yml > docker-compose.yml
curl -sSL https://f.typesafe.cn/next-terminal/config-postgres.yaml > config.yaml
docker compose up -d
```

:::

### 使用 Mysql 数据库

::: code-group

```shell [中国大陆]
curl -sSL https://f.typesafe.cn/next-terminal/docker-compose-mysql-aliyun.yml > docker-compose.yml
curl -sSL https://f.typesafe.cn/next-terminal/config-mysql.yaml > config.yaml
docker compose up -d
```

```shell [其他]
curl -sSL https://f.typesafe.cn/next-terminal/docker-compose-mysql.yml > docker-compose.yml
curl -sSL https://f.typesafe.cn/next-terminal/config-mysql.yaml > config.yaml
docker compose up -d
```

:::

::: tip 安装成功后
访问 http://{ip}:8088/setup 进行用户初始化设置

访问 http://{ip}:8088/login 进行登陆
:::

### 版本升级命令

```shell
docker compose pull
docker compose up -d
```