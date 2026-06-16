# Use Termark to Access Next Terminal Assets

**Termark** is a local access client for Next Terminal. It can sync SSH and RDP assets authorized to your Next Terminal account and let you open bastion-hosted assets from your desktop, similar to tools such as XShell, MobaXterm, or Remote Desktop Connection.

::: tip Version Requirements
- WebSocket tunnel mode for SSH assets requires Next Terminal later than `v3.2.2`.
- RDP Proxy access for RDP assets requires Next Terminal `v3.3.6` or later.
:::

## Before You Start

Before configuring Termark, make sure:

- Termark is installed. Download: [https://www.termark.app](https://www.termark.app).
- SSH or RDP assets have been added in Next Terminal, and your account has access permission.
- Termark can reach the Next Terminal web service URL.
- If you need to access SSH assets, enable the Next Terminal SSH Proxy Server first.
- If you need to access RDP assets, enable the Next Terminal RDP Proxy Server first.
- If you use direct proxy service mode, Termark must also be able to reach the SSH Proxy Server listen address.
- If you access RDP assets, the Termark client machine must be able to reach the RDP Proxy Server public address.

## 1. Enable the Required Proxy Server

Termark accesses assets through Next Terminal proxy servers. Enable the required service based on the asset type:

- **SSH assets**: see [SSH Proxy Server](/usage/ssh-server).
- **RDP assets**: see [RDP Proxy Server](/usage/rdp-server).

If you need to access both SSH and RDP assets, enable both the SSH Proxy Server and the RDP Proxy Server.

## 2. Add a Next Terminal Instance in Termark

Open Termark, go to **Settings** > **NextTerminal**, and click **Add Instance**.

Fill in the basic instance information:

- **Environment Name**: a local name used to distinguish environments, for example `Production` or `Staging`.
- **Service URL**: the web URL of Next Terminal, for example `https://nt.example.com`.
- **Access Credential**: the default auto-generated credential is recommended. When connecting for the first time or switching credentials, follow Termark's authorization prompt.

Then choose the connection mode based on the SSH asset access network. RDP assets use the RDP Proxy Server public address and are not affected by this SSH connection mode.

## 3. Choose the SSH Connection Mode

This option controls how Termark connects to the Next Terminal SSH Proxy Server. It affects SSH asset access only.

### Option 1: WebSocket Tunnel

WebSocket tunnel mode is recommended for most deployments. It connects through the Next Terminal web service URL and tunnels traffic to the SSH Proxy Server, so you usually do not need to expose port `2022` separately. It is also suitable when Next Terminal is behind a reverse proxy, HTTPS gateway, or tunneling service.

In **SSH Connection Mode**, select **WebSocket Tunnel**, then click **Connect NextTerminal**.

![Termark WebSocket tunnel settings](images/termark-config-nt.png)

Use WebSocket tunnel mode when:

- Termark can access only the Next Terminal web URL, not the SSH Proxy Server port directly.
- Next Terminal is deployed behind a reverse proxy.
- You want to reduce exposed public ports.

### Option 2: Direct Proxy Service

If the Termark client network can directly reach the Next Terminal SSH Proxy Server, you can choose **Direct Proxy Service**. This mode has one fewer forwarding hop than WebSocket tunnel mode, so latency is lower and terminal interaction may feel smoother.

Before using direct proxy service mode, make sure the SSH Proxy Server listen address is reachable from the Termark client:

- Next Terminal is usually deployed on a server or inside a container, while Termark runs on the user's desktop. You cannot use `127.0.0.1:2022` from Termark to directly reach the SSH proxy running on the server.
- Change the SSH Proxy Server listen address to an address reachable by the client, such as `0.0.0.0:2022` or the server's private IP.
- If Next Terminal is deployed in a container, make sure port `2022` is mapped from the container to the host.
- If the server has a firewall or cloud security group, allow access to the corresponding port.

In Termark, select **Direct Proxy Service** and fill in:

- **SSH Host**: the host where the Next Terminal SSH Proxy Server is reachable. The hostname from the service URL can be used by default if it points to the same server.
- **SSH Port**: the SSH Proxy Server port, for example `2022`.

Click **Connect NextTerminal** after completing the settings.

![Termark direct proxy service settings](images/termark-direct-ssh.png)

::: warning Security Recommendation
If you change the SSH Proxy Server listen address to `0.0.0.0:2022`, the SSH proxy port may become reachable from external networks. Use firewall rules, cloud security groups, or access control policies to allow only trusted sources.
:::

## 4. View and Connect to Assets

After the connection succeeds, return to the Termark home page and switch to the corresponding Next Terminal instance tab. You will see the SSH and RDP assets authorized to the current account.

![Termark asset list](images/termark-nt-dash.png)

Asset access behavior:

- **SSH assets**: Termark uses the configured SSH connection mode to connect to the Next Terminal SSH Proxy Server, then connects to the target SSH asset.
- **RDP assets**: Termark creates a short-lived ticket through the Next Terminal RDP Proxy Server and opens the target RDP asset with the local RDP client.

If no assets are displayed, check:

- Whether the current account has access permission to the assets.
- Whether the assets in Next Terminal are SSH or RDP assets and their connection settings are correct.
- Whether the service URL and access credential in Termark belong to the expected account.
- For SSH assets, whether the SSH Proxy Server is enabled and the settings have been saved.
- For RDP assets, whether the RDP Proxy Server is enabled and the settings have been saved.

## FAQ

### WebSocket Tunnel Connection Fails

Check the following in order:

1. The service URL configured in Termark can be opened in a browser.
2. Next Terminal is later than `v3.2.2`.
3. The reverse proxy supports WebSocket forwarding.
4. The Next Terminal SSH Proxy Server is enabled.

### Direct Proxy Service Connection Fails

Check the following in order:

1. The SSH Proxy Server listen address is reachable from the Termark client.
2. The SSH port matches the port configured in Next Terminal.
3. For container deployments, the SSH Proxy Server port is mapped to the host.
4. The firewall or cloud security group allows access to the port.
5. If the listen address is still `127.0.0.1:2022`, the Termark desktop client cannot directly reach that port from the user's computer. Use WebSocket tunnel mode or change the listen address.

### RDP Asset Connection Fails

Check the following in order:

1. The RDP Proxy Server is enabled, and the RDP proxy port is mapped in `docker-compose.yaml`.
2. The RDP Proxy Server **Public Address** is reachable from the Termark client machine.
3. The firewall or cloud security group allows access to the RDP proxy port, for example the default `3390`.
4. The target asset protocol is `RDP`, and the asset username, password, domain, and port are configured correctly.
5. The current account has access permission to the RDP asset.

For more RDP Proxy Server troubleshooting, see [RDP Proxy Server](/usage/rdp-server).

### Assets Are Not Displayed

Termark displays SSH and RDP assets authorized to the current Next Terminal account. Confirm that the assets exist in Next Terminal, the authorization is valid, and the access credential used in Termark belongs to the correct account.
