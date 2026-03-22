# 获取真实客户端 IP

在网络请求经过多层代理后，获取用户的真实 IP 地址变得至关重要。`IpExtractor` 提供了三种策略来应对不同的部署场景。

## 策略一：直接连接 (`direct`)

-   **适用场景**：客户端直接连接到 Next Terminal，中间没有反向代理（如 Nginx、HAProxy）。
-   **工作方式**：直接使用网络连接中的远端 IP 地址作为客户端 IP。
-   **风险**：如果 Next Terminal 前面实际上存在代理，此策略将获取到代理服务器的 IP，而非真实用户的 IP。

## 策略二：使用 X-Forwarded-For (`x-forwarded-for`)

-   **适用场景**：Next Terminal 前端至少有一个反向代理，并且该代理正确设置了 `X-Forwarded-For` 请求头。
-   **工作方式**：`X-Forwarded-for` (XFF) 头记录了请求经过的每一个代理服务器的 IP。此策略会从该头中提取 IP。
-   **安全警告**：`X-Forwarded-For` 头容易被客户端伪造。因此，**必须**配置 `IpTrustList`，仅信任您的边缘代理服务器。系统会从右至左遍历 XFF 头中的 IP，并返回第一个**不被信任**的 IP 作为真实客户端地址。
-   **示例**：
    ```yaml
    IpExtractor: "x-forwarded-for"
    IpTrustList:
      - "192.168.1.0/24"  # 信任您的代理服务器 IP 段
      - "10.0.0.1/32"       # 信任单个代理 IP
    ```

## 策略三：使用 X-Real-IP (`x-real-ip`)

-   **适用场景**：您的代理服务器（如 Nginx）配置为将客户端 IP 放入 `X-Real-IP` 头中。
-   **工作方式**：直接读取 `X-Real-IP` 请求头的值作为客户端 IP。
-   **安全警告**：与 XFF 类似，`X-Real-IP` 也可能被伪造。您**必须**配置 `IpTrustList` 来指定哪些代理是可信的，同时确保您的边缘代理会覆盖（而不是追加）客户端传来的同名请求头。
-   **示例**：
    ```yaml
    IpExtractor: "x-real-ip"
    IpTrustList:
      - "192.168.1.1/32" # 信任您的代理服务器 IP
    ```

## 安全配置核心要点

1.  **绝不盲目信任 HTTP 头**：除非请求来自您信任的代理，否则 `X-Forwarded-For` 和 `X-Real-IP` 都不可信。
2.  **配置边缘代理**：您的最外层代理（如 Nginx）应正确处理客户端 IP，并剥离或覆盖掉由客户端伪造的 IP 相关头部。
3.  **精确配置 `IpTrustList`**：`IpTrustList` 是确保 IP 提取安全的关键。请仅将您的反向代理服务器的 IP 地址或地址段加入此列表。

## 默认信任的私有地址

为方便常见内网部署，Next Terminal 默认信任以下私有 IP 地址范围。如果您的代理位于这些网段，您可能无需额外配置 `IpTrustList`。

-   **IPv4**: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`
-   **IPv6**: `fc00::/7`

----

此配置同样适用于 NextTerminal 自身的网络配置。