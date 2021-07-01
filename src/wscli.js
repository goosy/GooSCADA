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

function send(action, name, value) {
    if (!websocket?.alive) {
        console.log('websocket have not connected. please connect first.');
        return;
    }
    value = Number(value);
    websocket.send(JSON.stringify({
        action,
        value,
        name
    }));
}

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'WS> '
});
rl.prompt();
rl.on('line', (line) => {
    line = line.trim().split(/ +/);
    let cmd = '', value, namepath;
    switch (line[0]) {
        case 'help':
            console.log('help are not prepared.');
            break;
        case 'connect':
            createConn(line[1]);
            break;
        case 'close':
            websocket?.close();
            break;
        case 'ws':
            if (websocket?.alive) console.log(websocket?.url, websocket?.statusCode);
            else console.log("ws isnt alive.");
            break;
        case 'read':
        case 'subscribe':
            [cmd, ...namepath] = line;
            break;
        case 'write':
            [cmd, value, ...namepath] = line;
            break;
        case 'exit':
            websocket?.close();
            rl.close();
            break;
        default:
            break;
    }
    if (cmd !== '') send(cmd, namepath.join('/'), value);
    rl.prompt();
})
rl.on('close', () => {
    console.log('goodbye!');
    process.exit(0);
});
