import WebSocket from "faye-websocket";
import { createInterface } from "readline";

/**
 * alive check
 */
let pingTimeout;
function heartbeat() {
    console.log("heartbeat")
    websocket.alive = true;
    clearTimeout(pingTimeout);
    pingTimeout = setTimeout(() => {
        websocket.alive = false;
        websocket.close();
    }, 30000 + 3000);
}

let websocket;
/**
 * 建立WS连接
 * @date 2021-08-11
 * @param {string} host
 */
function createConn(host) {
    websocket?.close();
    websocket = new WebSocket.Client(host);
    // websocket.on('ping', heartbeat); // faye-websocket have not event:"ping"
    websocket.on('close', function (event) {
        clearTimeout(pingTimeout);
        console.log('close', event.code, event.reason);
        websocket = null;
    });
    websocket.on('message', function (event) {
        console.log('message', event.data);
        rl.prompt();
        // websocket.close();
    });
    websocket.on('open', function (event) {
        console.log('websocket connection created.')
        websocket.alive = true;// heartbeat(); // faye-websocket have not event:"ping"
    });
}

/**
 * 发送JSON请求
 * @date 2021-08-11
 * @param {string} action
 * @param {string} name
 * @param {(number|string|boolean)} value
 */
function send(action, name, value) {
    if (!websocket?.alive) {
        console.log('websocket have not connected. please connect first.');
        return;
    }
    const n = Number(value);
    value = isNaN(n) ? value : n;
    websocket.send(JSON.stringify({
        action,
        name,
        value
    }));
}

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'WS> '
});
rl.prompt();
rl.on('line', (line) => {
    let [, cmd = '', key = '', value = ''] = line.trim().match(/^([^ ]+)?(?: ([^ ]+))?(?: +(.+))?$/);
    switch (cmd) {
        case '':
            break;
        case 'help':
            console.log('help are not prepared.');
            break;
        case 'connect':
            createConn(key);
            break;
        case 'close':
            websocket?.close();
            break;
        case 'ws':
            if (websocket?.alive) console.log(websocket?.url, websocket?.statusCode);
            else console.log("ws isnt alive.");
            break;
        case 'exit':
            websocket?.close();
            rl.close();
            break;
        case 'read':
        case 'subscribe':
        case 'write':
            send(cmd, key, value);
            break;
        default:
            break;
    }
    rl.prompt();
})
rl.on('close', () => {
    console.log('goodbye!');
    process.exit(0);
});
