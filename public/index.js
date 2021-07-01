import Vue from './vue.esm.browser.js';
import { plc_config_JSON } from '../conf/config.js'
import { connections } from "../conf/connections.js";

let ws;
function createWS(url) {
    ws = new WebSocket(url);

    ws.onopen = evt => {
        console.log("Connection open ...");
        // 暂不刷新DB及描述
        // ws_get(ws, "getSendDBName");
        // ws_get(ws, "getReceiveDBName");
        // ws_get(ws, "getDesc"); 
        vm.sendDB.tags.forEach(tag => ws_sub_var(ws, vm.sendDB.name, tag));
        vm.recvDB.tags.forEach(tag => ws_sub_var(ws, vm.recvDB.name, tag));
        vm.ws_state_id = ws.readyState;
    };

    ws.onmessage = evt => {
        console.log("Received Message: " + evt.data);
        let ret = JSON.parse(evt.data);
        if (ret?.error) return;
        switch (ret.action) {
            case "getSendDBNameResponse":
                vm.sendDBName = ret.value;
                break;
            case "getReceiveDBNameResponse":
                vm.recvDBName = ret.value;
                break;
            case "getDescResponse":
                vm.hostdesc = ret.value;
                break;
            case "readResponse":
            case "writeResponse":
            case "subscribeResponse":
                const [dbname, tagname] = ret.name.split('/');
                let db;
                if (dbname == vm.sendDB.name) db = vm.sendDB;
                else if (dbname == vm.recvDB.name) db = vm.recvDB;
                else break;
                const tag = db.tags.find(tag => tag.name == tagname)
                tag.value = tag.newValue = ret.value;
                break;
            default:
                "cant recognize";
        }

    };

    ws.onclose = evt => {
        console.log("Connection closed.");
        vm.ws_state_id = ws.readyState;
    };
}

function ws_get(ws, cmd) {
    if (["getSendDBName", "getReceiveDBName", "getDesc"].indexOf(cmd) == -1) return;
    ws.send(JSON.stringify({
        action: cmd,
    }));
}

function ws_sub_var(ws, db, tag) {
    name = `${db}/${tag.name}`;
    ws.send(JSON.stringify({
        action: "subscribe",
        name,
    }));
}

// function get_ws_var(ws, item) {
//     name = `${vm.DBName}/${item.name}`;
//     ws.send(JSON.stringify({
//         action: "read",
//         name,
//     }));
// }

function ws_set_var(ws, db, tag) {
    const name = `${db}/${tag.name}`;
    const value = Number(tag.newValue);
    ws.send(JSON.stringify({
        action: "write",
        name,
        value
    }));
}

function convert(tags) {
    return tags.map(tag => ({ is_changing: false, newValue: tag.value, ...tag }));
}
const host = connections[0].localAddress + ':' + plc_config_JSON.port;
const hostdesc = plc_config_JSON.description;
const vm = new Vue({
    el: '#app',
    data: {
        hostdesc,
        host,
        sendDB: {
            name: plc_config_JSON.areas[0].name,
            tags: convert(plc_config_JSON.areas[0].tags),
        },
        recvDB: {
            name: plc_config_JSON.areas[1].name,
            tags: convert(plc_config_JSON.areas[1].tags),
        },
        ws_state_id: -1,
    },
    created() {
        createWS(`ws://${this.host}`);
    },
    methods: {
        prechange: (tag) => {
            tag.is_changing = true;
        },
        change: (db, tag) => {
            ws_set_var(ws, db, tag);
            tag.is_changing = false;
        },
    },
    computed: {
        wsstate() {
            switch (this.ws_state_id) {
                case -1:
                    return "未初始化";
                case ws.CONNECTING:
                    return "正在连接";
                case ws.CLOSING:
                    return "正在关闭";
                case ws.CLOSED:
                    return "已关闭";
                case ws.OPEN:
                    return "已打开";
                default:
                    return "未初始化";
            }
        },
    }
})