import WebSocket from "faye-websocket";
import { createInterface } from "readline";

/**
 * alive check
 */
let pingTimeout;
function heartbeat() {
    console.log("heartbeat")
    ws.alive = true;
    clearTimeout(pingTimeout);
    pingTimeout = setTimeout(() => {
        ws.alive = false;
        ws.close();
    }, 30000 + 3000);
}

let ws = new WebSocket.Client('ws://127.0.0.1:8080');
// ws.on('ping', heartbeat); // faye-websocket have not event:"ping"
ws.on('close', function (event) {
    clearTimeout(pingTimeout);
    console.log('close', event.code, event.reason);
    ws = null;
});
ws.on('message', function (event) {
    console.log('message', event.data);
    rl.prompt();
    // ws.close();
});
ws.on('open', function (event) {
    ws.alive = true;// heartbeat(); // faye-websocket have not event:"ping"
});

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'WS> '
});

rl.prompt();
rl.on('line', (line) => {
    line = line.trim()
    switch (line) {
        case 'help':
            console.log('help are not prepared.');
            break;
        case 'exit':
            ws?.close();
            rl.close();
            break;
        default:
            if (ws?.alive) {
                let [cmd, value, ...name] = line.split(' ');
                if (cmd === 'read' || cmd === 'subscribe') {
                    name = [value, ...name];
                    value = 0;
                } else if (cmd !== 'write') break;
                value = Number(value);
                name = name.join('/');
                ws.send(JSON.stringify({
                    action: cmd,
                    value,
                    name
                }));
            }
            break;
    }
    rl.prompt();
})
rl.on('close', () => {
    console.log('goodbye!');
    process.exit(0);
});
