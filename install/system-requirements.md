# System Resource Sizing Guide

## Performance Reference

| Concurrent Connections | CPU Cores | Memory (GB) |
|------------------------|-----------|-------------|
| 0-25                   | 2         | 2           |
| 26-50                  | 3         | 6           |
| 51-100                 | 4         | 8           |
| 101-200                | 8         | 16          |
| 201-400                | 16        | 32          |

## Baseline Requirements

### Minimum
- **CPU**: 1 core
- **Memory**: 0.5 GB
- **Storage**: 40 GB

### Network Ports
- **Required**: 8088 (Web admin)
- **Optional**:
  - 443 (HTTPS reverse proxy for Web Assets)
  - 80 (HTTP reverse proxy for Web Assets)
  - 2022 (SSH server)
