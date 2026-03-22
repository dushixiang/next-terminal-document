# Backup Guide

## Before Backup

1. Confirm which data should be retained:
   - Session recordings (`recordings` directory)
   - Windows mapped drive files (`drive` directory)
   - Database files (`mysql`, `postgresql` directories)
   - Machine-code files (`protected` directory)
   - CA certificates (`root_ca_*.pem`)

2. Stop related services:

```shell
docker-compose down
```

## Backup File Notes

Example structure under `data`:

```shell
drwxr-xr-x 5 root  root   4096 Mar 26 09:56 drive            # Windows mapped drive files
drwxr-xr-x 8 root  root   4096 Apr 18 02:16 mysql            # MySQL data
drwxr-xr-x 8 root  root   4096 Apr 18 02:16 postgresql       # PostgreSQL data
drwxr-xr-x 2 root  root   4096 Mar  4 10:25 protected        # Machine-code files
drwxr-xr-x 2 root  root 720896 Apr 28 13:50 recordings       # Session recordings
-rw-r--r-- 1 root  root    830 Apr 28 09:15 root_ca_cert.pem # CA certificate
-r-------- 1 root  root    241 Apr 28 09:15 root_ca_key.pem  # CA private key
```

You can remove files that are not needed.

## Backup Operation

Run in the same directory as `docker-compose.yaml`:

```shell
# Archive the whole data directory
tar -zcvf next-terminal-backup-$(date +%Y%m%d).tar.gz data
```

## Restore

1. Prepare environment on new server:
   - Download/copy `docker-compose.yaml`
   - Ensure Docker and Docker Compose are installed

2. Upload backup file to deployment directory (same level as `docker-compose.yaml`)

3. Extract backup:

```shell
# Run in the same directory as docker-compose.yaml
tar -zxvf next-terminal-backup-*.tar.gz
```

4. Verify directory structure:

```shell
ls -la data/
```

5. Start containers:

```shell
docker-compose up -d
```

6. Check service status:

```shell
docker-compose ps
docker-compose logs -f
```
