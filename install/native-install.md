# Native Installation

::: warning Important
Native installation is relatively complex and is not recommended for beginners.
:::

## Build Apache Guacamole-Server

> Reference: Apache Guacamole-Server official build documentation  
> https://guacamole.apache.org/doc/gug/installing-guacamole.html#building-guacamole-server

Install dependencies:

::: code-group

```shell [Debian]
apt install -y make gcc g++ \
  libcairo2-dev libjpeg62-turbo-dev libpng-dev libtool-bin uuid-dev libossp-uuid-dev \
  freerdp2-dev libvncserver-dev libpulse-dev libvorbis-dev libwebp-dev
```

```shell [Ubuntu]
apt install -y make gcc g++ \
  libcairo2-dev libjpeg-turbo8-dev libpng-dev libtool-bin uuid-dev libossp-uuid-dev \
  freerdp2-dev libvncserver-dev libpulse-dev libvorbis-dev libwebp-dev
```

```shell [Fedora / CentOS / RHEL]
yum install -y make gcc g++ \
  cairo-devel libjpeg-turbo-devel libjpeg-devel libpng-devel libtool libuuid-devel \
  freerdp-devel libvncserver-devel pulseaudio-libs-devel libvorbis-devel libwebp-devel
```

:::

Download source code:

```shell
wget https://downloads.apache.org/guacamole/1.6.0/source/guacamole-server-1.6.0.tar.gz
```

Extract:

```shell
tar -xvf guacamole-server-1.6.0.tar.gz
```

Build and install:

```shell
cd guacamole-server-1.6.0
./configure --with-init-dir=/etc/init.d
make
make install
ldconfig
```

Create config file:

```bash
mkdir /etc/guacamole/ && cat <<EOF > /etc/guacamole/guacd.conf
[daemon]
pid_file = /var/run/guacd.pid
log_level = info

[server]
bind_host = 127.0.0.1
bind_port = 4822
EOF
```

Install service:

```bash
cat <<EOF > /etc/systemd/system/guacd.service
[Unit]
Description=Guacamole proxy daemon
Documentation=man:guacd(8)
After=network.target

[Service]
User=root
ExecStart=/usr/local/sbin/guacd -f /etc/guacamole/guacd.conf
TimeoutSec=0
RestartSec=10
Restart=always
LimitNOFILE=1048576

[Install]
WantedBy=multi-user.target
EOF
```

Start `guacd` service:

```bash
systemctl daemon-reload
systemctl enable guacd
systemctl start guacd
```

## Install Next Terminal

Download:

```shell
wget https://github.com/dushixiang/next-terminal/releases/latest/download/next-terminal.tar.gz
```

Extract:

```shell
mkdir -p /usr/local/next-terminal/
tar -zxvf next-terminal.tar.gz -C /usr/local/next-terminal
```

::: tip Notes
Please install a `postgres` database yourself. Version 16.x or later is supported.

After installation, update the `database` section in `config.yaml`.
:::

Start with a system service:

```bash
cat <<EOF > /etc/systemd/system/next-terminal.service
[Unit]
Description=next-terminal service
After=network.target

[Service]
User=root
WorkingDirectory=/usr/local/next-terminal
ExecStart=/usr/local/next-terminal/next-terminal -c /usr/local/next-terminal/config.yaml
TimeoutSec=0
RestartSec=10
Restart=always
LimitNOFILE=1048576

[Install]
WantedBy=multi-user.target
EOF
```

Start Next Terminal service:

```shell
systemctl daemon-reload
systemctl enable next-terminal
systemctl start next-terminal
```

::: tip After successful installation
Visit `http://{ip}:8088/setup` to initialize the admin user.

Visit `http://{ip}:8088/login` to sign in.
:::

## Upgrade

Download the latest `next-terminal.tar.gz`, extract it, and overwrite the old files (except config files).

Finally, restart the service:

```shell
systemctl restart next-terminal
```
