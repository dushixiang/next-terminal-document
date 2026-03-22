# Upgrade Guide: 1.x to 2.x

## ⚠️ Important
Version 2.x is **not compatible** with 1.x.

## Upgrade Steps

1. In 1.x, use **backup** feature to export data
2. Install 2.x, then import the backup data

## Common Issue

### Permission error during export

If export from 1.x returns:

`{"code":403,"message":"permission denied"}`

Use standalone [backup export tool](https://github.com/dushixiang/next-terminal-export).
