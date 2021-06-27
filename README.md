# GooVPLC

实现一个虚拟S7 PLC

* 模拟一个S7 CPU，可虚拟出 DB MK CT TM PE PA 等区域
* 可建立 S7Memory 与地址的双向绑定，通过 S7Memory 读写对应的区域地址
* 可通过设置文件完成区域和 S7Memory 的配置
* S7设备可通过S7协议读写虚拟PLC值
* 软件客户端可通过http(JSON API)读写tag
* 提供 TCP Server 和 Client，传送指定区域（原始二进制形式）

数据区类型名称及枚举值：

* "PE": s7server.srvAreaPE = 0 :Process inputs
* "PA": s7server.srvAreaPA = 1 :Process outputs
* "MK": s7server.srvAreaMK = 2 :Merkers
* "CT": s7server.srvAreaCT = 3 :Counters
* "TM": s7server.srvAreaTM = 4 :Timers
* "DB": s7server.srvAreaDB = 5 :DB
