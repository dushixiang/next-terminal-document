# 安全网关


安全网关作为代理服务，采用WebSocket协议与服务端通信。安装完成后会自动向服务端注册，需确保能访问服务端的Web端口，加密通信依赖于服务端的HTTPS配置。

主要优势：
- 提升访问速度较慢资产的连接效率
- 访问内网环境中的资产
- 提供安全的远程访问通道


### 注册流程

**复制注册命令**

![img_1.png](images/agent-gateway.png)

**执行注册操作**

将复制的命令粘贴到终端并执行，安全网关将自动注册到服务端。

**查看帮助信息**

安装完成后，可通过以下命令查看帮助信息：
```shell
nt-tunnel -h
```

## 服务管理
### Linux 服务管理

**查看服务状态**

```shell
systemctl status nt-tunnel
```

**常用操作**

- 启动服务：systemctl start nt-tunnel
- 停止服务：systemctl stop nt-tunnel
- 查看日志：tail -f /var/log/nt-tunnel.log


### macOS 服务管理

**查看服务状态**

```shell
sudo launchctl list nt-tunnel
```

正常运行的服务会显示类似以下信息：

```shell
{
	"StandardOutPath" = "/var/log/nt-tunnel.out.log";
	"LimitLoadToSessionType" = "System";
	"StandardErrorPath" = "/var/log/nt-tunnel.err.log";
	"Label" = "nt-tunnel";
	"OnDemand" = false;
	"LastExitStatus" = 0;
	"PID" = 63720;
	"Program" = "/Users/nobody/app/nt-tunnel";
	"ProgramArguments" = (
		"/Users/nobody/app/nt-tunnel";
		"run";
		"--endpoint";
		"https://next.typesafe.cn";
		"--token";
		"TUN_8qWs6xU6Vnhf8CewzFLtgVR3qSP8YKcoNPhPe5VThqbe";
	);
};
```

**常用操作**

- 启动服务：sudo launchctl start nt-tunnel
- 停止服务：sudo launchctl stop nt-tunnel
- 查看日志：tail -f /var/log/nt-tunnel.{out,err}.log