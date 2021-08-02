import { Server } from "net";
import { fs } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * 通过继承net.Server类来创建一个TCP服务器
 */
class TcpServer extends Server {

    conns = [];
    message = null;
    buffer = null;

    constructor(vplc, conns_JSON) {
        this.#vplc = vplc;
        this.conns = conns_JSON;
        super();
    }

    sendInterval() {
        let server = this;
        setInterval(() => {
            server.sendAll();
            server.updateMessage();
        }, 1000);
    }

    async sendAll() {
        this.conns.forEach(socket => {
            // 发送数据 
            socket.write(this.buffer, () => {
                // var writeSize = socket.bytesWritten;
                // console.log("the size of message is"+writeSize);
                console.log(`send to ${socket.remoteAddress}:${socket.remotePort} \n${this.message}`);
            });
        });
    }

    add(socket) {
        this.conns.push(socket);
    }

    remove(socket) {
        this.conns.splice(server.conns.findIndex(item => socket == item), 1)
    }

    showConnCount() {
        this.getConnections(function (err, count) {
            console.log("the count of client is " + count);
        });
    }

    async updateMessage() {
        this.message = await fs.readFile(__dirname + "/send_data", { "encoding": "utf8" });
        // console.log(message);
        let bytes = [];
        let char = "";
        function push() {
            bytes.push(parseInt(char, 16));
            char = "";
        }
        // 
        for (let item of this.message) {
            if (
                item < '0' ||
                item > '9' && item < 'A' ||
                item > 'F' && item < 'a' ||
                item > 'f'
            ) {
                if (char.length > 0) push();
            } else {
                char += item;
                if (char.length == 2) push();
            }
        }
        this.buffer = Buffer.from(bytes);
    }
}

/** @todo 以下将移至一个单独配置式过程 */

// 实例化一个服务器对象 
let server = new TcpServer();

// 设置最大连接数量 
server.maxConnections = 5;

// 监听 connection 事件 
server.on("connection", function (socket) {
    console.log(`${socket.remoteAddress}:${socket.remotePort} connected`);
    server.add(socket);

    // 监听data事件 
    socket.on('data', function (data) {
        var readSize = socket.bytesRead;
        console.log(`recvied ${readSize} bytes data:`);
        console.log(data.toString());
    });

    // 关闭处理
    socket.on('close', function (err) {
        server.remove(socket);
        console.log(`the connection ${socket.remoteAddress}:${socket.remotePort} is closed.`);
        server.showConnCount();
    });

    socket.on('error', function (err) {
        server.remove(socket);
        console.log(`the connection ${socket.remoteAddress}:${socket.remotePort} is error.`);
        server.showConnCount();
    });

    server.showConnCount();
});

// 设置监听端口 
server.listen(2000);

// 设置监听时的回调函数 
server.on("listening", function () {
    // TCP服务器监听的地址 
    console.log('server is listening on ', server.address());
})

// 设置关闭时的回调函数 
server.on("close", function () {
    console.log("server closed!");
})

// 设置错误时的回调函数 
server.on("error", function (err) {
    console.log("server error!");
})

server.sendInterval();