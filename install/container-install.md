**推广**

<a href="https://www.lcayun.com/actcloud.html?from=next-terminal" target="_blank">![img.png](images/lcayun.png)</a>

----

# 安装

安装之前请先检查硬件及依赖符合[系统需求](/install/system-requirements.html)

## 使用 Docker 安装

::: code-group

```shell [中国大陆]
curl -sSL https://f.typesafe.cn/next-terminal/docker-compose-aliyun.yml > docker-compose.yml
curl -sSL https://f.typesafe.cn/next-terminal/config.yaml > config.yaml
docker compose up -d
```

```shell [其他]
curl -sSL https://f.typesafe.cn/next-terminal/docker-compose.yml > docker-compose.yml
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

## 使用 Podman 安装

::: tip 确保 Podman 版本 >= 4.4
运行 `podman --version` 检查版本信息，并安装 `podman-compose` 工具。
:::

Podman 安装方式与 Docker 类似，使用相同的 docker-compose.yml 和 config.yaml 文件。

::: code-group

```shell [中国大陆]
curl -sSL https://f.typesafe.cn/next-terminal/docker-compose-aliyun.yml > docker-compose.yml
curl -sSL https://f.typesafe.cn/next-terminal/config.yaml > config.yaml
podman-compose up -d
```

```shell [其他]
curl -sSL https://f.typesafe.cn/next-terminal/docker-compose.yml > docker-compose.yml
curl -sSL https://f.typesafe.cn/next-terminal/config.yaml > config.yaml
podman-compose up -d
```

:::

::: tip 安装成功后
访问 http://{ip}:8088/setup 进行用户初始化设置

访问 http://{ip}:8088/login 进行登陆
:::

### 版本升级命令

```shell
podman-compose pull
podman-compose up -d
```

### 配置开机自启动

::: code-group

```shell [使用 systemd 管理]
# 创建 systemd 服务文件
cat <<EOF > /etc/systemd/system/next-terminal.service
[Unit]
Description=Next Terminal
After=network-online.target
Requires=network-online.target

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$(pwd)
ExecStart=/usr/bin/podman-compose up -d
ExecStop=/usr/bin/podman-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

# 重新加载 systemd
systemctl daemon-reload

# 启动服务
systemctl start next-terminal

# 设置开机自启动
systemctl enable next-terminal
```

```shell [使用 openrc 管理]
# 创建 openrc 服务文件
cat <<EOF > /etc/init.d/next-terminal
#!/sbin/openrc-run

SERVICE_NAME="next-terminal"

PROJECT_DIR="$(pwd)"

description="Service of \${SERVICE_NAME}"

depend() {
  need net
}

start() {
  ebegin "Starting \${SERVICE_NAME}"
  cd "\${PROJECT_DIR}" || return 1
  /usr/bin/podman-compose up -d && eend 0 || eend 1
}

stop() {
  ebegin "Stopping \${SERVICE_NAME}"
  cd "\${PROJECT_DIR}" || return 1
  /usr/bin/podman-compose down && eend 0 || eend 1
}

restart() {
  ebegin "Restarting \${SERVICE_NAME}"
  cd "\${PROJECT_DIR}" || return 1
  /usr/bin/podman-compose down && /usr/bin/podman-compose up -d && eend 0 || eend 1
}

status() {
  cd "\${PROJECT_DIR}" || return 1
  RUNNING=\$(/usr/bin/podman-compose ps --quiet)
  if [ -n "\$RUNNING" ]; then
    echo "\${SERVICE_NAME} is running"
    return 0
  else
    echo "\${SERVICE_NAME} is not running"
    return 1
  fi
}
EOF

# 赋予执行权限
chmod +x /etc/init.d/next-terminal

# 添加到默认运行级别
rc-update add next-terminal default

# 启动服务
rc-service next-terminal start
```