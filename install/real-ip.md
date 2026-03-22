# Get the Real Client IP

When requests pass through multiple proxy layers, extracting the real client IP is critical. `IpExtractor` provides three strategies for different deployment scenarios.

## Strategy 1: Direct Connection (`direct`)

- **When to use**: Clients connect directly to Next Terminal, with no reverse proxy in front (such as Nginx or HAProxy).
- **How it works**: Uses the remote IP of the TCP connection as the client IP.
- **Risk**: If there is actually a proxy in front, this strategy returns the proxy IP instead of the real user IP.

## Strategy 2: Use X-Forwarded-For (`x-forwarded-for`)

- **When to use**: There is at least one reverse proxy in front of Next Terminal and it correctly sets the `X-Forwarded-For` header.
- **How it works**: The `X-Forwarded-For` (XFF) header records each proxy hop. This strategy extracts the client IP from that chain.
- **Security warning**: `X-Forwarded-For` can be forged by clients. You **must** configure `IpTrustList` to trust only your edge proxies. The system traverses XFF from right to left and returns the first **untrusted** IP as the real client IP.
- **Example**:

```yaml
IpExtractor: "x-forwarded-for"
IpTrustList:
  - "192.168.1.0/24"  # Trust your proxy subnet
  - "10.0.0.1/32"     # Trust a single proxy IP
```

## Strategy 3: Use X-Real-IP (`x-real-ip`)

- **When to use**: Your proxy (for example Nginx) is configured to put client IP in the `X-Real-IP` header.
- **How it works**: Reads `X-Real-IP` directly as the client IP.
- **Security warning**: Like XFF, `X-Real-IP` can be spoofed. You **must** configure `IpTrustList` to define trusted proxies, and ensure your edge proxy overwrites (not appends) any client-supplied header with the same name.
- **Example**:

```yaml
IpExtractor: "x-real-ip"
IpTrustList:
  - "192.168.1.1/32" # Trust your proxy IP
```

## Security Essentials

1. **Never blindly trust HTTP headers**: `X-Forwarded-For` and `X-Real-IP` are untrusted unless the request comes from a trusted proxy.
2. **Configure edge proxies correctly**: Your outermost proxy should sanitize and overwrite spoofed client-IP headers.
3. **Set `IpTrustList` precisely**: This is the key to secure IP extraction. Only include your reverse proxy IPs/subnets.

## Default Trusted Private Ranges

For common internal-network deployments, Next Terminal trusts these private ranges by default. If your proxies are within these ranges, additional `IpTrustList` settings may not be needed.

- **IPv4**: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`
- **IPv6**: `fc00::/7`

----

These settings also apply to Next Terminal's own network configuration.
