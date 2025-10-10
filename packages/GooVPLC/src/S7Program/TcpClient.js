import { Socket } from "node:net";

/** 
 * @typedef {import('../S7Memory/S7Memory.js').S7Memory} S7Memory
 * 
 * @typedef {object} CommData
 * @property {S7Memory} send
 * @property {S7Memory} receive
 */

/**
 * 通过继承net.Socket类来创建一个TCP客户端
 */
export class S7TcpClient extends Socket {
  /** @type {CommData} */
  #data;
  get comm_data() {
    return this.#data;
  }
  send() {
    this.write(this.#data.send.buffer);
    // console.log("send:", this.sendbuffer)
  }
  /**
   * 接收数据
   * @param {Buffer} buffer
  */
  receive(buffer) {
    this.#data.receive.update_buffer(buffer);
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
   * @param {CommData} comm_data
   * @param {SocketConnectOpts} options
   */
  constructor(comm_data, options) {
    super(options);
    this.#data = comm_data;
    this.on("data", this.receive);
    this.setMaxListeners(30);
  }
}

/**
 * create a S7TcpClient and connect to TCPServer supplied
 * @param {CommData} comm_data
 * @param {SocketConnectOpts&TcpSocketConnectOpts} options
 * @param {function} connectListener
 * @returns {S7TcpClient}
 */
export function createS7Connection(comm_data, options = {}, connectListener) {
  const { fd, allowHalfOpen = false, readable = false, writable = false, signal } = options;
  const tcp = new S7TcpClient(comm_data, { fd, allowHalfOpen, readable, writable, signal });

  const { host, port = 2000, localAddress, localPort, family = 4 } = options;
  /**
   * connect to TCPServer supplied
   * @date 2021-06-30
   * @param {TcpSocketConnectOpts} connectOpts
   * @param {function} connectListener
   * @returns {S7TcpClient}
   */
  tcp.connect({ host, port, localAddress, localPort, family }, connectListener);

  return tcp;
}
