import { createApp, reactive } from 'vue'
import appvue from './app.vue'
const ws = new WebSocket('ws://' + window.location.host);
ws.onopen = (event) => {
    console.log("Connection open ...");
    /** @type {WebSocket} */
    // const ws = event.target;
    // ws.getSendDBName();
    // ws.getReceiveDBName();
    // ws.getDesc();
    tags.forEach((_, name) => {
        sub_tag(name)
    });
};
ws.onmessage = event => {
    console.log("Received Message: " + event.data);
    let ret = JSON.parse(event.data);
    if (ret?.error) return;
    switch (ret.action) {
        case "getSendDBNameResponse":
        case "getReceiveDBNameResponse":
        case "getDescResponse":
            break;
        case "readResponse":
        case "writeResponse":
        case "subscribeResponse":
            tags.set(ret.name, ret.value);
            break;
        default:
            "cant recognize";
    }
};
ws.onclose = event => {
    console.log("Connection closed.");
};
ws.getSendDBName = function () {
    this.send(JSON.stringify({ action: "getSendDBName" }));
}
ws.getReceiveDBName = function () {
    this.send(JSON.stringify({ action: "getReceiveDBName" }));
}
ws.getDesc = function () {
    this.send(JSON.stringify({ action: "getDesc" }));
}

/**
 * 增加一个tag到tags中，并订阅它
 * @param {string} name
 * @param {number|string|boolean} initValue
 * @returns {boolean}
 */
function add_tag(name, initValue) {
    if (tags.has(name)) return true;
    tags.set(name, initValue);
    sub_tag(name);
}
/**
 * 订阅某个tag，该tag值发生变化时会通过ws.onmessage收到新值
 * @param {string} name
 * @returns {boolean}
 */
function sub_tag(name) {
    if (ws.readyState !== ws.OPEN) return false;
    ws.send(JSON.stringify({
        action: "subscribe",
        name,
    }));
    return true;
}
/**
 * 读取某个tag
 * @param {string} name
 * @returns {boolean}
 */
function read_tag(name) {
    if (ws.readyState !== ws.OPEN) return false;
    ws.send(JSON.stringify({
        action: "read",
        name,
    }));
    return true;
}
/**
 * 设置某个tag
 * @param {string} name
 * @param {number|string|boolean} value
 * @returns {boolean}
 */
function write_tag(name, value) {
    ws.send(JSON.stringify({
        action: "write",
        name,
        value
    }));
}

const tags = reactive(new Map());
const app = createApp(appvue);
app
    .provide("TagMap", tags)
    .provide("addTag", add_tag)
    .provide("subTagValue", sub_tag)
    .provide("readTagValue", read_tag)
    .provide("writeTagValue", write_tag)
    .provide("websocket", ws);
/* const vm =  */app.mount('#app');
