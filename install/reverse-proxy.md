# 反向代理

## nginx 反向代理示例

```shell
location / {
    proxy_pass http://127.0.0.1:8088/;
    proxy_set_header Host      $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $http_connection;
}
```

## caddy 反向代理示例

```shell
next.typesafe.cn {
    reverse_proxy 127.0.0.1:8088
}
```