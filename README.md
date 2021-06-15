# GooVPLC

实现一个虚拟S7 PLC

* 模拟一个S7 CPU，可虚拟出 DB M C T 等区域
* 可建立 S7Tag 与地址的双向绑定，通过 S7Tag 读写对应的区域地址
* 可通过设置文件完成区域和 S7Tag 的配置
* S7设备可通过S7协议读写虚拟PLC值
* 软件客户端可通过http(JSON API)读写tag
* 提供 TCP Server 和 Client，传送指定区域（原始二进制形式）

