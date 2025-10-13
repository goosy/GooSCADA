# GooVPLC

实现一个虚拟S7 PLC

* 模拟一个S7 CPU，可虚拟出 DB MK CT TM PE PA 等区域
* 可建立 S7Memory 与地址的双向绑定，通过 S7Memory 读写对应的区域地址
* 可通过设置文件完成区域和 S7Memory 的配置
* S7设备可通过S7协议读写虚拟PLC值
* 软件客户端可通过http(JSON API)读写tag
* 提供 TCP Server 和 Client，传送指定区域（原始二进制形式）

## install

`npm install goovplc`

## S7PLC

example:

```javascript
import { S7PLC, S7TcpClient, S7WSServer } from "./src/index.js";

// create a VPLC server
const plc = new S7PLC({
    "host": "127.0.0.1", //S7server address
    "areas": [ // you can set up multiple data areas
        { // DB8 begin
            "name": "nodeGD8", // also can use "DB8" instead of symbol name
            "type": "DB", // DB type
            "DBNO": 8, // DB number
            "bytes": 50, // DB length
            "tags": [ //define Tags in data area
                { // Tag:nodeID
                    "name": "nodeID",
                    "type": "INT",
                    "value": 8078, //初始值
                },
                { // Tag:workOK
                    "name": "workOK",
                    "type": "BOOL",
                    "value": false, //初始值
                },
            ]
        },
    ]
});
plc.on("event", (event) => {
    console.log(plc.EventText(event));
});
plc.on("read", (tagObj, buffer) => {
    console.log("read ret: ", buffer);
})
plc.on("write", (tagObj, buffer) => {
    console.log("write: ", buffer);
})
plc.start_serve();
```

