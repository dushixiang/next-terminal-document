---
title: Container Installation
description: Install Next Terminal quickly with Docker Compose, including setup, upgrade commands, and optional IPv6 configuration.
head:
  - - meta
    - name: keywords
      content: Next Terminal, Docker, Docker Compose, installation, quick setup
  - - meta
    - property: og:title
      content: Next Terminal Container Installation
  - - meta
    - property: og:description
      content: Install Next Terminal quickly with Docker Compose, then initialize admin and start secure remote access management.
---

# Installation

Before installation, make sure your host meets the [system requirements](/install/system-requirements).

## Install with Docker


```shell
curl -sSL https://f.typesafe.cn/next-terminal/docker-compose.yaml > docker-compose.yaml
curl -sSL https://f.typesafe.cn/next-terminal/config.yaml > config.yaml
docker compose up -d
```

::: tip After successful installation
Visit `http://{ip}:8088/setup` to initialize the admin user.

Visit `http://{ip}:8088/login` to sign in.
:::

### Upgrade Commands

```shell
docker compose pull
docker compose up -d
```

## Enable IPv6 (Optional)

See the official Docker documentation: https://docs.docker.com/engine/daemon/ipv6/
