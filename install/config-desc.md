# 配置文件

配置文件解释

::: code-group 

```yaml [config.yaml]
database:
  enabled: true
  type: sqlite # 可选 mysql,sqlite,postgres 选择对应的数据库类型之后，请填写对应的数据库配置
  sqlite:
    path: ./data/nt.db
#  postgres:
#    hostname: localhost
#    port: 5432
#    username: next-terminal
#    password: next-terminal
#    database: next-terminal
#  mysql:
#    hostname: localhost
#    port: 3306
#    username: next-terminal
#    password: next-terminal
#    database: next-terminal
  ShowSql: false
log:
  level: debug # 日志等级  debug,info,waring,error
  filename: ./logs/nt.log

server:
  addr: "0.0.0.0:8888"
  tls:
    enabled: false
    auto: false # 自动申请https证书，开启时服务器端口必须为 443
    cert: "./data/cert/localhost.pem"
    key: "./data/cert/localhost-key.pem"

app:
  website:
    accessLog: "./logs/access.log" # web 资产的访问日志路径
  recording:
    type: "local" # 录屏文件存储位置，可选 local, s3
    path: "/usr/local/next-terminal/data/recordings"
#    s3:
#      endpoint: "127.0.0.1:9000"
#      accessKeyId: minioadmin
#      secretAccessKey: miniopassword
#      bucket: recording
#      useSSL: false
  guacd:
    drive: "/usr/local/next-terminal/data/drive"
    hosts:
      - hostname: guacd
        port: 4822
        weight: 1
```

:::