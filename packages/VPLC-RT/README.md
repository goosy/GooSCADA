# VPLC

虚拟西门子PLC

VPLC可以指定通过TCP发送接收的数据。


可在配置目录下设置好虚拟PLC参数，并通过命令行来启用VPLC。

## 安装

1. nodejs 要求 V14.7.0 以上版本。
1. 安装 PM2: `pnpm add pm2 -g`
1. 安装 VPLC: `pnpm add vplc-rt -g`
1. 建立一个配置目录，比如 D:\VPLC\，在目录下运行: `vplc init`，并按照需要修改配置。

## 日常命令

在配置目录下运行以下命令启停 vplc 实例

* 运行: `vplc`
* 停止: `vplc stop`

## 依赖

* goovplc
* goohmi
