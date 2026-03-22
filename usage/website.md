# Web Assets

The Web Asset feature helps you protect internal websites in a safer way. Compared with exposing websites directly to the public internet, it provides two major benefits:

1. **Stronger authentication**: users must sign in to Next Terminal before they can access the target website.
2. **Fine-grained authorization**: website access can be granted to specific users only.

## Common Scenarios

### Scenario 1: Restrict access to public-IP websites

- **Problem**: Your website has a public IP, but you do not want unrestricted access. Traditional IP allowlists are hard to use when users have dynamic IP addresses.
- **Solution**: Restrict target website access to only the Next Terminal server IP. Then publish the site through Next Terminal and grant permissions to specific users. You can combine this with LDAP/OIDC for unified identity management.

### Scenario 2: Unified access to internal systems across multiple clouds

- **Problem**: Internal websites are distributed across multiple clouds or data centers, and exposing them publicly increases risk.
- **Solution**: Deploy Security Gateway agents in private networks and register them to Next Terminal. Proxy websites through Next Terminal and assign the appropriate gateway per website.

### Scenario 3: Access isolated internal services

- **Problem**: In restricted environments (for example certain government cloud networks), internal servers may not have internet access. Traditional bastion workflows are inconvenient and hard to audit.
- **Solution**: Deploy a Security Gateway on a jump host that can reach the internal network, then use Next Terminal as the unified entry point for SSH/Web access with full auditing.

## Prerequisites

- Next Terminal is deployed successfully.
- You own a domain and can configure DNS records.
- The internal websites you want to proxy are already running.

## Configuration Guide

### Video Tutorial

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto; margin-bottom: 1.5rem;">
    <iframe src="//player.bilibili.com/player.html?isOutside=true&aid=115360288214738&bvid=BV1vb4uzBEea&cid=33014547884&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>

The process has two major steps:

1. **Enable and configure Next Terminal reverse proxy service**.
2. **Add website assets you want to protect**.

---

### Step 1: Enable Reverse Proxy

This step is completed on the Next Terminal server.

#### 1. Update `config.yaml`

Open `config.yaml` and add `ReverseProxy` under `App`.

```yaml
App:
  # ... (other settings omitted)
  ReverseProxy: # [!code ++]
    Enabled: true # enable reverse proxy [!code ++]
    HttpEnabled: true # listen on HTTP (port 80) [!code ++]
    HttpAddr: ":80" # [!code ++]
    HttpRedirectToHttps: false  # [!code ++]
    HttpsEnabled: true # listen on HTTPS (port 443) [!code ++]
    HttpsAddr: ":443" # [!code ++]
    SelfProxyEnabled: true # [!code ++]
    SelfDomain: "nt.yourdomain.com" # [!code ++]
    Root: "" # [!code ++]
    IpExtractor: "direct" # [!code ++]
    IpTrustList: # [!code ++]
      - "0.0.0.0/0" # [!code ++]
```

### Key Configuration Notes

`SelfProxyEnabled`, `SelfDomain`, and `Root` are core settings. They determine how the browser is redirected to the Next Terminal login page when a user requests a protected website.

- **Recommended (`SelfProxyEnabled: true`)**
  - **Setting**: set `SelfProxyEnabled` to `true`, and set `SelfDomain` to your Next Terminal domain (for example `nt.yourdomain.com`).
  - **Effect**: users access the Next Terminal UI through this domain.
  - **Advantage**: simpler setup and cleaner auth flow. If a user is not logged in, they are redirected to `https://nt.yourdomain.com` automatically.

- **Alternative (`SelfProxyEnabled: false`)**
  - **Setting**: set `SelfProxyEnabled` to `false`, and set `Root` to your Next Terminal address (for example `https://1.2.3.4:8088`).
  - **Effect**: users continue to access Next Terminal via IP:port.
  - **Use case**: use this when you do not want to assign a domain to Next Terminal itself. `Root` ensures correct login redirect URLs.

### Authorization Flow

No matter which mode you choose, the goal is the same: when a user accesses a protected website, the reverse proxy checks login and authorization status first. If validation fails, the user is redirected to the correct login page (step 4).

![Reverse proxy authorization flow](images/rp.png)

#### 2. Expose ports in Docker Compose

If you deploy with Docker Compose, edit `docker-compose.yml` and map ports `80` and `443`.

```yaml
# ... (in docker-compose.yml)
services:
  # ...
  next-terminal:
    # ... (other settings)
    ports:
      - "8088:8088" # Web admin UI
      - "2022:2022" # SSH Server (optional)
      - "80:80"     # [!code ++]
      - "443:443"   # [!code ++]
    # ... (other settings)
```

#### 3. Restart service

After saving, restart Next Terminal.

For Docker Compose:

```shell
docker compose down
docker compose up -d
```

---

### Step 2: Add and Access Web Assets

After reverse proxy is enabled, add websites to protect.

#### 1. Configure DNS

Point your website domain to the public IP of your Next Terminal server.

For example, if internal GitLab runs on `192.168.1.10`, point `gitlab.yourdomain.com` to the Next Terminal server.

::: tip Tip
If you have many websites, configure a wildcard DNS record (for example `*.yourdomain.com`) to avoid updating DNS for each new site.
:::

#### 2. Add asset in Next Terminal

In Next Terminal, create a new Web Asset.

![add.png](images/website/add.png)

**Field descriptions:**

- **Name**: display name of the asset (for example `Internal GitLab`).
- **Domain**: the domain users type in browser (for example `gitlab.yourdomain.com`).
  ::: warning Important
  This domain must be unique. It cannot conflict with Next Terminal `SelfDomain` or other Web Assets. Domain is used by reverse proxy for routing.
  :::
- **Entry Path**: default website path, usually `/` or empty.
- **Protocol**: internal website protocol, `HTTP` or `HTTPS`.
- **Asset IP**: internal IP or internal domain (for example `192.168.1.10`).
- **Asset Port**: internal website port (for example `80`).
- **Security Gateway**: select a gateway when the target website is not directly reachable from the Next Terminal server.

#### 3. Authorize and access

1. Grant access permission for this Web Asset to users or groups.
2. Authorized users can directly open the configured domain (for example `gitlab.yourdomain.com`). Next Terminal will handle login and permission checks automatically.

## Advanced Features

Some websites return fixed URLs. You can use **Modify Response** to rewrite response content.

![modify.png](images/website/modify.png)

For websites that still need partial public access, you can narrow exposure with IP, geo-location, or passphrase controls.

![public.png](images/website/public.png)

For clients without fixed public IPs, temporary allowlist is supported. Users can add current IP with one click. The entry expires automatically and active usage can extend validity.

![temp-white.png](images/website/temp-white.png)

![temp-white2.png](images/website/temp-white2.png)
