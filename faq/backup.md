# 系统备份指南

## 备份前准备
1. 确认需要保留的文件类型：
    - 录屏文件（recordings 目录）
    - Windows挂载盘文件（drive 目录）
    - 数据库文件（mysql, postgresql 目录）
    - 机器码文件（protected 目录）
    - CA证书文件（root_ca_*.pem）

2. 停止相关服务：
    ```shell
    docker-compose down
    ```

## 备份文件说明

data目录结构：
```shell
drwxr-xr-x 5 root  root   4096 Mar 26 09:56 drive            # Windows挂载盘文件
drwxr-xr-x 8 root  root   4096 Apr 18 02:16 mysql            # MySQL数据库文件
drwxr-xr-x 8 root  root   4096 Apr 18 02:16 postgresql       # Postgresql数据库文件
drwxr-xr-x 2 root  root   4096 Mar  4 10:25 protected        # 机器码文件
drwxr-xr-x 2 root  root 720896 Apr 28 13:50 recordings       # 录屏文件
-rw-r--r-- 1 root  root    830 Apr 28 09:15 root_ca_cert.pem # CA证书
-r-------- 1 root  root    241 Apr 28 09:15 root_ca_key.pem  # CA私钥
```

不需要的文件可以自行删除。

## 备份操作

在 docker-compose.yaml 同级目录下执行：

```shell
# 打包整个data目录
tar -zcvf next-terminal-backup-$(date +%Y%m%d).tar.gz data
```

## 数据恢复

1. 将备份文件上传到新服务器
2. 解压备份文件：
    ```shell
    tar -zxvf next-terminal-backup-*.tar.gz
    ```
3. 重新部署容器：
    ```shell
    docker-compose up -d
    ```
