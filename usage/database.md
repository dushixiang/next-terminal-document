# 数据库审计

在 v3.0.0 版本，我们增加了 Mysql 数据库协议级审计。

支持拦截 DML/DDL ，也就以为着只放行查询语句，其他的增、删、改均被阻止执行，需要通过工单->审批的方式执行。

## 配置

在系统设置中打开数据库代理。

![config.png](images/database/config.png)

在资产管理添加数据库配置，支持配置网关。

![asset.png](images/database/asset.png)

## 使用

连接成功后可以正常查询，但执行 DDL/DML 语句将被阻止。

![connect.png](images/database/connect.png)

## 发起工单

在普通用户视图发起工单

![work-order.png](images/database/work-order.png)

工单通过审核后，会自动执行 SQL 。

![worker-order-approved.png](images/database/work-order-approved.png)

## 查看 SQL 执行日志

![sql-log.png](images/database/sql-log.png)