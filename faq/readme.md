# 常见问题

## 查看密码/密钥需要进行二次认证？

为了安全考虑，查看密码/密钥需要进行二次认证，绑定OTP或Passkey之后即可查看。

## 访问realvnc提示验证失败？

1. 把密码类型修改为VNC
2. 把加密类型修改为 Prefer On

## 连接rdp协议的windows7或者windows server 2008直接断开？

因为freerdp的一个问题导致的，把 设置>RDP 下面的禁用字形缓存打开即可。
详情可参考 https://issues.apache.org/jira/browse/GUACAMOLE-1191

## 使用 SSH RSA 证书无法登录，提示 ssh: no key found

PuTTY 生成的密钥无法直接使用，需要导出后再使用。

## 原生安装如何升级？

下载打包后的压缩文件，替换其中的 next-terminal 文件即可。

## 资产状态检测原理是什么？

tcp连接到目标IP和端口进行测试的，默认超时时间是3秒，在计划任务中每隔一个小时检测一次。如果资产状态检测为不在线，可以自行登录next-terminal所在服务器使用telnet进行测试。

## ssh 协议文件管理内容是空的？

ssh 协议自动会使用 sftp 协议进行文件管理，需要确保 sftp 服务已经开启。

SFTP 通常作为 SSH 的一个子系统自动启用。你可以通过以下命令确认：

```shell
grep Subsystem /etc/ssh/sshd_config
```
输出中应包含类似以下内容：
```shell
Subsystem sftp /usr/lib/openssh/sftp-server
```
或：
```shell
Subsystem sftp internal-sftp
```
如果该行被注释（以 # 开头）或缺失，说明可能未启用 SFTP 功能。