# 原生安装

## 安装 Apache Guacamole-Server

执行安装命令

``` bash
yum install -y epel-release
yum install -y libguac-client-kubernetes \
    libguac-client-rdp \
    libguac-client-ssh \
    libguac-client-telnet \
    libguac-client-vnc \
    guacd
```

配置 guacd 服务

``` bash
mkdir /etc/guacamole/ && cat <<EOF >> /etc/guacamole/guacd.conf
[daemon]
pid_file = /var/run/guacd.pid
log_level = info

[server]
# 监听地址
bind_host = 127.0.0.1
bind_port = 4822
EOF
```

为了避免权限问题导致错误修改使用 root 用户启动guacd服务，修改 `/usr/lib/systemd/system/guacd.service` 文件，注释掉 User 和 Group 这两行。

``` bash
[Unit]
Description=Guacamole proxy daemon
Documentation=man:guacd(8)
After=network.target

[Service]
EnvironmentFile=-/etc/sysconfig/guacd
Environment=HOME=/var/lib/guacd
ExecStart=/usr/sbin/guacd -f $OPTS
Restart=on-failure
LimitNOFILE=1048576
# User=guacd
# Group=guacd

[Install]
WantedBy=multi-user.target
```

启动 guacd 服务

``` bash
# 重载服务
systemctl daemon-reload
# 开机自启
systemctl enable guacd
# 启动服务
systemctl start guacd
# 查看状态
systemctl status guacd
```

## 安装字体（SSH使用）

安装字体管理软件

``` bash
yum install -y fontconfig mkfontscale
```

下载字体文件并移动到 /usr/share/fonts/目录下

``` bash
cd  /usr/share/fonts/
# 下载英文字体
wget https://gitee.com/dushixiang/next-terminal/raw/master/guacd/fonts/Menlo-Regular.ttf
# 下载中文字体
wget https://gitee.com/dushixiang/next-terminal/raw/master/guacd/fonts/SourceHanSansCN-Regular.otf
```
更新字体

``` bash
mkfontscale
mkfontdir
fc-cache
```

## 安装 Next Terminal
> 示例步骤安装在 `/usr/local/next-terminal`，你可以自由选择安装目录。

下载

> 国内用户如果访问不到GitHub，可从 Gitee 进行下载，地址为: https://gitee.com/dushixiang/next-terminal

```shell
wget https://github.com/dushixiang/next-terminal/releases/latest/download/next-terminal.tgz
```

解压
```shell
tar -zxvf next-terminal.tgz -C /usr/local/
```

在`/usr/local/next-terminal`或`/etc/next-terminal`下创建或修改配置文件`config.yml`
```shell
db: sqlite
# 当db为sqlite时mysql的配置无效
#mysql:
#  hostname: 172.16.101.32
#  port: 3306
#  username: root
#  password: mysql
#  database: next-terminal

# 当db为mysql时sqlite的配置无效
sqlite:
  file: 'next-terminal.db'
server:
  addr: 0.0.0.0:8088
# 当设置下面两个参数时会自动开启https模式(前提是证书文件存在)
#  cert: /root/next-terminal/cert.pem
#  key: /root/next-terminal/key.pem

# 授权凭证和资产的密码，密钥等敏感信息加密的key，默认`next-terminal`
#encryption-key: next-terminal
guacd:
  hostname: 127.0.0.1
  port: 4822
  # 此路径需要为绝对路径，并且next-terminal和guacd都能访问到
  recording: '/usr/local/next-terminal/data/recording'
  # 此路径需要为绝对路径，并且next-terminal和guacd都能访问到
  drive: '/usr/local/next-terminal/data/drive'

sshd:
  # 是否开启sshd服务
  enable: false
  # sshd 监听地址，未开启sshd服务时此配置不会使用
  addr: 0.0.0.0:8089
  # sshd 使用的私钥地址，未开启sshd服务时此配置不会使用
  key: ~/.ssh/id_rsa
```

启动
```shell
./next-terminal
```

使用系统服务方式启动

执行以下命令创建 next-terminal 系统服务文件
``` bash
cat <<EOF >> /etc/systemd/system/next-terminal.service
[Unit]
Description=next-terminal service
After=network.target

[Service]
User=root
WorkingDirectory=/usr/local/next-terminal
ExecStart=/usr/local/next-terminal/next-terminal
Restart=on-failure
LimitNOFILE=1048576

[Install]
WantedBy=multi-user.target
EOF
```

启动 Next-Terminal 服务

```shell
# 重载服务
systemctl daemon-reload
# 开机启动
systemctl enable next-terminal
# 启动服务
systemctl start next-terminal
# 查看状态
systemctl status next-terminal
```