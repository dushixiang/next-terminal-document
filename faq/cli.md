# 命令行工具

### 查看帮助

```shell
docker compose exec next-terminal nt -h
```

输出

```shell
Usage:
  next-terminal [flags]
  next-terminal [command]

Available Commands:
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command
  mkcert      生成证书
  sec         安全相关
  user        用户管理
  version     查看版本

Flags:
  -c, --config string   -c /path/config.yaml (default "/etc/next-terminal/config.yaml")
  -h, --help            help for next-terminal

Use "next-terminal [command] --help" for more information about a command.
```

### 用户管理

```shell
docker compose exec next-terminal nt user -h
```
输出
```shell
Usage:
  next-terminal user [command]

Available Commands:
  list        查看用户列表
  otpclr      清除用户OTP
  passwd      修改用户密码

Flags:
  -h, --help   help for user

Global Flags:
  -c, --config string   -c /path/config.yaml (default "/etc/next-terminal/config.yaml")

Use "next-terminal user [command] --help" for more information about a command.
```

**查看用户列表**

```shell
docker compose exec next-terminal nt user list
```

输出
```shell
+--------------------------------------+----------+----------------+------+-------------+----------+
|                  ID                  | USERNAME |    NICKNAME    | MAIL |    TYPE     |   OPT    |
+--------------------------------------+----------+----------------+------+-------------+----------+
| 35093131-204a-4db7-b61c-c6f7a7aa5ae4 | manager  | manager        |      | admin       | disabled |
+--------------------------------------+----------+----------------+------+-------------+----------+
```

**清除用户OTP**

```shell
docker compose exec next-terminal nt user otpclr 35093131-204a-4db7-b61c-c6f7a7aa5ae4
```

**修改用户密码**

```shell
docker compose exec next-terminal nt user passwd 35093131-204a-4db7-b61c-c6f7a7aa5ae4 newpassword
```

### 安全相关

```shell
docker compose exec next-terminal nt sec -h
```
输出
```shell
management login locked

Usage:
  next-terminal sec [command]

Available Commands:
  delete      删除登陆锁定
  list        登陆锁定列表

Flags:
  -h, --help   help for sec

Global Flags:
  -c, --config string   -c /path/config.yaml (default "/etc/next-terminal/config.yaml")

Use "next-terminal sec [command] --help" for more information about a command.
```

**登陆锁定列表**

```shell
docker compose exec next-terminal nt sec list
```

输出
```shell
+--------------------------------------+-----------------+----------------------------+---------------------+---------------------+
|                  ID                  |       IP        |          USERNAME          |      LOCKEDAT       |    EXPIRATIONAT     |
+--------------------------------------+-----------------+----------------------------+---------------------+---------------------+
| 026559fc-5c90-4aa2-b77d-43495df769ca | 195.178.110.3   | wanghe                     | 2025-03-27 01:07:34 | 2025-03-27 01:17:34 |
+--------------------------------------+-----------------+----------------------------+---------------------+---------------------+
```

**删除登陆锁定**

```shell
docker compose exec next-terminal nt sec delete 026559fc-5c90-4aa2-b77d-43495df769ca
```

### 自签名证书 （Version >= v2.4.9）

**签名证书**

```shell
docker compose exec next-terminal nt mkcert www.typesafe.cn
```