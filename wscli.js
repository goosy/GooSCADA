import WebSocket from 'ws';
/**
 * alive check
 */

function heartbeat() {
    clearTimeout(this.pingTimeout);
    this.pingTimeout = setTimeout(() => {
        this.terminate();
    }, 30000 + 1000);
}

const ws = new WebSocket('ws://127.0.0.1:8080', {
    perMessageDeflate: false
});

ws.on('open', heartbeat);
ws.on('ping', heartbeat);
ws.on('close', function clear() {
    clearTimeout(this.pingTimeout);
});


ws.on('message', (data) => {
    console.log(data);
    ws.terminate();
});

let [, , action, value, ...name] = process.argv;
if (action === 'read') {
    name = [value, ...name];
    value = 0;
}
value = Number(value);
name = name.join('/');

ws.on('open', () => {
    ws.send(JSON.stringify({
        action,
        value,
        name
    }));
});
