# 反向代理

推荐使用 nginx 等web服务器反向代理 **next-terminal** 使用，一是可有效避免伪造 IP 绕过系统限制，二是开启 https 后可无缝同步系统粘贴板。

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