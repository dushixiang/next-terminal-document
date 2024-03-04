# docker 安装

::: tip 提示：国内用户可以使用阿里云镜像仓库
- **guacd** `registry.cn-beijing.aliyuncs.com/dushixiang/guacd`
- **next-terminal** `registry.cn-beijing.aliyuncs.com/dushixiang/next-terminal`
:::

## 使用 sqlite 存储数据

在任意位置创建文件夹 next-terminal ，然后在此文件夹下创建 docker-compose.yml 并写入如下内容：

```yaml
version: '3.3'
services:
  guacd:
    image: dushixiang/guacd:latest
    volumes:
      - ./data:/usr/local/next-terminal/data
    restart:
          always
  next-terminal:
    image: dushixiang/next-terminal:latest
    environment:
      DB: sqlite
      GUACD_HOSTNAME: guacd
      GUACD_PORT: 4822
    ports:
      - "8088:8088"
    volumes:
      - /etc/localtime:/etc/localtime
      - ./data:/usr/local/next-terminal/data
    restart:
      always
```

前台启动命令

``` bash
docker-compose up
```

后台启动命令

``` bash
docker-compose up -d
```

## 使用 mysql 存储数据

在任意位置创建文件夹 next-terminal ，然后在此文件夹下创建 docker-compose.yml 并写入如下内容：

```yaml
version: '3.3'
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: next-terminal
      MYSQL_USER: next-terminal
      MYSQL_PASSWORD: next-terminal
      MYSQL_ROOT_PASSWORD: next-terminal
    volumes:
      - ./data/mysql:/var/lib/mysql
    restart:
          always
  guacd:
    image: dushixiang/guacd:latest
    volumes:
      - ./data:/usr/local/next-terminal/data
    restart:
          always
  next-terminal:
    image: dushixiang/next-terminal:latest
    environment:
      DB: mysql
      MYSQL_HOSTNAME: mysql
      MYSQL_PORT: 3306
      MYSQL_USERNAME: next-terminal
      MYSQL_PASSWORD: next-terminal
      MYSQL_DATABASE: next-terminal
      GUACD_HOSTNAME: guacd
      GUACD_PORT: 4822
    ports:
      - "8088:8088"
    volumes:
      - /etc/localtime:/etc/localtime
      - ./data:/usr/local/next-terminal/data
    depends_on:
      - mysql
    restart:
      always
```

前台启动命令

``` bash
docker-compose up
```

后台启动命令

``` bash
docker-compose up -d
```

## 使用外部的 mysql 存储数据

在任意位置创建文件夹 next-terminal ，然后在此文件夹下创建 docker-compose.yml 并写入如下内容：

```yaml
version: '3.3'
services:
  guacd:
    image: dushixiang/guacd:latest
    volumes:
      - ./data:/usr/local/next-terminal/data
    restart:
          always
  next-terminal:
    image: dushixiang/next-terminal:latest
    environment:
      DB: mysql
      # 请修改下面的 MySql 配置，需自行创建数据库和用户
      MYSQL_HOSTNAME: mysql
      MYSQL_PORT: 3306
      MYSQL_USERNAME: next-terminal
      MYSQL_PASSWORD: next-terminal
      MYSQL_DATABASE: next-terminal
      # 请修改上面的 MySql 配置，需自行创建数据库和用户
      GUACD_HOSTNAME: guacd
      GUACD_PORT: 4822
    ports:
      - "8088:8088"
    volumes:
      - /etc/localtime:/etc/localtime
      - ./data:/usr/local/next-terminal/data
    restart:
      always
```

前台启动命令

``` bash
docker-compose up
```

后台启动命令

``` bash
docker-compose up -d
```

## 开启sshd服务

以sqlite模式为例，修改 docker-compose.yml，增加 **高亮** 区域的配置

``` yaml {15,18,22}
version: '3.3'
services:
  guacd:
    image: dushixiang/guacd:latest
    volumes:
      - ./data:/usr/local/next-terminal/data
    restart:
          always
  next-terminal:
    image: dushixiang/next-terminal:latest
    environment:
      DB: sqlite
      GUACD_HOSTNAME: guacd
      GUACD_PORT: 4822
      SSHD_ENABLE: "true"
    ports:
      - "8088:8088"
      - "8089:8089"
    volumes:
      - /etc/localtime:/etc/localtime
      - ./data:/usr/local/next-terminal/data
      - ~/.ssh/id_rsa:/root/.ssh/id_rsa
    restart:
          always
```

接下来使用 next-terminal 中的用户即可使用。
示例：

``` bash
ssh admin@127.0.0.1 -p 8089
```

## docker-compose 更新方式

``` bash
docker-compose pull && docker-compose restart
```

## 使用docker命令安装

``` bash
# 安装 guacd
docker run --restart=always --name guacd -d \
  -v /root/next-terminal/data:/usr/local/next-terminal/data \
  dushixiang/guacd:latest
# 安装 next-terminal
docker run --restart=always --name next-terminal -d \
  --link guacd \
  -p 8088:8088 \
  -v /root/next-terminal/data:/usr/local/next-terminal/data \
  -v /etc/localtime:/etc/localtime \
  -e DB=sqlite \
  -e GUACD_HOSTNAME=guacd \
  -e GUACD_PORT=4822 \
  dushixiang/next-terminal:latest \
```

## 环境变量

| 参数  | 含义  | 默认值 |
|---|---|---|
|  DB | 数据库类型，可选 ['sqlite','mysql'] | sqlite |
| SQLITE_FILE  | sqlite 数据库文件存放地址 | /usr/local/next-terminal/data/sqlite/next-terminal.db |
| MYSQL_HOSTNAME  | mysql 数据库地址 | 127.0.0.1 |
| MYSQL_PORT  | mysql 数据库端口 | 3306 |
| MYSQL_USERNAME  | mysql 数据库用户 | next-terminal |
| MYSQL_PASSWORD  | mysql 数据库密码 | next-terminal |
| MYSQL_DATABASE  | mysql 数据库名称 | next-terminal |
| SERVER_ADDR  |  服务器监听地址 | 0.0.0.0:8088 |
| ENCRYPTION_KEY  |  授权凭证和资产的密码，密钥等敏感信息加密的key | next-terminal |
| GUACD_HOSTNAME  |  Guacd 服务地址 | 127.0.0.1 |
| GUACD_PORT  |  Guacd 服务监听端口 | 4822 |
| GUACD_RECORDING  |  录屏文件保存目录 | /usr/local/next-terminal/data/recording |
| GUACD_DRIVE  |  远程桌面挂载盘根目录 | /usr/local/next-terminal/data/drive |
| SSHD_ENABLE  |  是否开启sshd服务 | false |
| SSHD_ADDR  |  sshd服务监听的地址 | 0.0.0.0:8089 |
| SSHD_KEY  |  sshd服务使用私钥路径 | ~/.ssh/id_rsa |
