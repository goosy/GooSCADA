import { Socket } from "net";
/**
 * 通过继承net.Socket类来创建一个TCP客户端
 */
export class S7TcpClient extends Socket {
    /** @type {Buffer} */
    sendbuffer;
    send() {
        this.write(this.sendbuffer);
        // console.log("send:", this.sendbuffer)
    }
    /** @type {Buffer} */
    receive_buffer;
    /**
     * 接收数据
     * @param {Buffer} buffer
    */
    receive(buffer) {
        buffer.copy(this.receive_buffer);
        // console.log("recv:", this.receive_buffer)
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
     * @param {Buffer} send_buffer
     * @param {Buffer} receive_buffer
     * @param {SocketConnectOpts} options
     */
    constructor(send_buffer, receive_buffer, options) {
        super(options);
        this.sendbuffer = send_buffer;
        this.receive_buffer = receive_buffer;
        this.setMaxListeners(30);
    }
}

/**
 * create a S7TcpClient and connect to TCPServer supplied
 * @param {Buffer} send_buffer
 * @param {Buffer} receive_buffer
 * @param {SocketConnectOpts&TcpSocketConnectOpts} options
 * @param {function} connectListener
 * @returns {S7TcpClient}
 */
export function createS7Connection(send_buffer, receive_buffer, options, connectListener) {
    let createOpts = {};
    createOpts.fd = options?.fd ?? undefined;
    createOpts.allowHalfOpen = options?.allowHalfOpen ?? false;
    createOpts.readable = options?.readable ?? false;
    createOpts.writable = options?.writable ?? false;
    createOpts.signal = options?.signal ?? undefined;
    const tcp = new S7TcpClient(send_buffer, receive_buffer, options)

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