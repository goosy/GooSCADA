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

    constructor(send_buffer, receive_buffer, options) {
        super(options);
        this.sendbuffer = send_buffer;
        this.receive_buffer = receive_buffer;
    }
}

