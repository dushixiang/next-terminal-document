**推广**

<a href="https://www.lcayun.com/actcloud.html?from=next-terminal" target="_blank">![img.png](images/lcayun.png)</a>

----

# 安装

安装之前请先检查硬件及依赖符合[系统需求](/install/system-requirements.html)

## 使用 Docker 安装

::: code-group

```shell [中国大陆]
curl -sSL https://f.typesafe.cn/next-terminal/docker-compose-aliyun.yaml > docker-compose.yaml
curl -sSL https://f.typesafe.cn/next-terminal/config.yaml > config.yaml
docker compose up -d
```

```shell [其他]
curl -sSL https://f.typesafe.cn/next-terminal/docker-compose.yaml > docker-compose.yaml
curl -sSL https://f.typesafe.cn/next-terminal/config.yaml > config.yaml
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

## 开启 IPv6 (非必需)

请参考 docker 官方文档 https://docs.docker.com/engine/daemon/ipv6/