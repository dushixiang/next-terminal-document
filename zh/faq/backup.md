# 系统备份指南

## 备份内容

当前支持的备份项：

- 录屏文件（`data/recordings`）
- Windows 挂载盘文件（`data/drive`）
- PostgreSQL 逻辑备份（容器内执行 `pg_dump`，归档内文件为 `data/postgresql_dump.sql`）
- CA 证书与私钥（`data/root_ca_*.pem`）

## 前置条件

1. 在部署目录执行（即 `docker-compose.yaml` 同级目录）。
2. 安装 Python 3.6+（无外部依赖）。
3. 安装 Docker Compose（`docker compose` 或 `docker-compose`）。
4. 备份/恢复 PostgreSQL 时，数据库服务容器需要可执行 `pg_dump` / `psql`。

## 下载脚本

```shell
# 下载到当前目录（覆盖旧版本）
wget -O backup_restore.py https://raw.githubusercontent.com/dushixiang/next-terminal/master/scripts/backup_restore.py
```

```shell
# 可选：赋予执行权限
chmod +x backup_restore.py
```

## 备份操作

```shell
# 交互式选择备份项（推荐）
python3 backup_restore.py backup --interactive --workdir .
```

```shell
# 指定备份项（示例）
python3 backup_restore.py backup \
  --workdir . \
  --items drive,recordings,postgresql,ca \
  --pg-service postgresql
```

说明：

- PostgreSQL 备份通过 `docker compose exec -T <service> sh -lc "<pg_dump命令>"` 执行。
- 默认服务名是 `postgresql`，如果你的服务名不同请用 `--pg-service` 指定。
- 如需强制 Compose 命令，可用 `--compose-cmd 'docker compose'` 或 `--compose-cmd docker-compose`。

## 数据恢复

```shell
# 交互式恢复（会自动选择最新 next-terminal-backup-*.tar.gz）
python3 backup_restore.py restore --interactive --workdir .
```

```shell
# 指定归档并恢复指定内容（示例）
python3 backup_restore.py restore \
  --workdir . \
  --archive next-terminal-backup-20260324.tar.gz \
  --items postgresql,ca \
  --pg-service postgresql
```

说明：

- PostgreSQL 恢复通过 `docker compose exec -T <service> sh -lc "<psql命令>"` 执行。
- 恢复完成后可按需检查服务：

```shell
docker compose ps
docker compose logs -f
```
