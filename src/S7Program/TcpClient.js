import { Socket } from "net";
/**
 * 通过继承net.Socket类来创建一个TCP客户端
 */
export class S7TcpClient extends Socket {
    /** @type {import(../S7Memory/S7Memory.js).S7Memory} */
    #send;
    send() {
        this.write(this.#send.buffer);
        // console.log("send:", this.sendbuffer)
    }
    /** @type {import(../S7Memory/S7Memory.js).S7Memory} */
    #receive;
    /**
     * 接收数据
     * @param {Buffer} buffer
    */
    receive(buffer) {
        this.#receive.update_buffer(buffer);
        this.emit("received");
    }
    #interval;
    cyclic_send(time) {
        this.#interval = setInterval(() => {
            this.send();
        }, time);
    }
    stop_send() {
        clearInterval(this.#interval);
    }

    /**
     * a tcp scoket class with send and receive buffer supplied
     * @constructor
     * @param {import(../S7Memory/S7Memory.js).S7Memory} send_mem
     * @param {import(../S7Memory/S7Memory.js).S7Memory} receive_mem
     * @param {SocketConnectOpts} options
     */
    constructor(send_mem, receive_mem, options) {
        super(options);
        this.#send = send_mem;
        this.#receive = receive_mem;
        this.on("data", this.receive);
        this.setMaxListeners(30);
    }
}

/**
 * create a S7TcpClient and connect to TCPServer supplied
 * @param {import(../S7Memory/S7Memory.js).S7Memory} send_mem
 * @param {import(../S7Memory/S7Memory.js).S7Memory} receive_mem
 * @param {SocketConnectOpts&TcpSocketConnectOpts} options
 * @param {function} connectListener
 * @returns {S7TcpClient}
 */
export function createS7Connection(send_mem, receive_mem, options, connectListener) {
    let createOpts = {};
    createOpts.fd = options?.fd ?? undefined;
    createOpts.allowHalfOpen = options?.allowHalfOpen ?? false;
    createOpts.readable = options?.readable ?? false;
    createOpts.writable = options?.writable ?? false;
    createOpts.signal = options?.signal ?? undefined;
    const tcp = new S7TcpClient(send_mem, receive_mem, options)

    let connectOpts = {};
    connectOpts.port = options?.port ?? 2010;
    connectOpts.host = options?.host ?? undefined;
    connectOpts.localAddress = options?.localAddress ?? undefined;
    connectOpts.localPort = options?.localPort ?? undefined;
    connectOpts.family = options?.family ?? 4;
    /**
     * connect to TCPServer supplied
     * @date 2021-06-30
     * @param {TcpSocketConnectOpts} connectOpts
     * @param {function} connectListener
     * @returns {S7TcpClient}
     */
    tcp.connect(connectOpts, connectListener);

    return tcp;
}