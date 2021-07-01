import Vue from './vue.esm.browser.js';

function sub_ws_var(ws, item) {
    name = `${vm.DBName}/${item.name}`;
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

function set_ws_var(ws, item) {
    const name = `${vm.DBName}/${item.name}`;
    const value = Number(item.newValue);
    ws.send(JSON.stringify({
        action: "write",
        name,
        value
    }));
}

const goonode = Object.entries({
    nodeID: 0,
    workOK: false,
    commOK: false,
    pump_run_1: false,
    pump_run_2: false,
    pump_run_3: false,
    pump_run_4: false,
    pump_run_5: false,
    temperature: 0.0,
    pressure: 0.0,
    flow: 0.0,
}).map(([name, value]) => ({
    name,
    value,
    is_changing: false,
    newValue: value,
}));
let ws;
let ip = '';

const vm = new Vue({
    el: '#app',
    data: {
        host_list: [{
            name: "本机",
            id: "127.0.0.1:8080",
            dbname: "nodeGD8"
        }, {
            name: "孤岛孤永出口",
            id: "192.168.37.18:8078",
            dbname: "nodeGD8"
        }, {
            name: "永安孤永入口",
            id: "192.168.38.17:8087",
            dbname: "nodeYA7"
        }, {
            name: "永安孤永出口",
            id: "192.168.38.11:8081",
            dbname: "nodeYA1"
        }, {
            name: "东营孤永入口",
            id: "192.168.31.18:8018",
            dbname: "nodeDY8"
        }, {
            name: "孤岛孤罗出口",
            id: "192.168.37.19:8079",
            dbname: "nodeGD9"
        }, {
            name: "集贤孤罗入口",
            id: "192.168.39.17:8097",
            dbname: "nodeJX7"
        }, {
            name: "集贤孤罗出口",
            id: "192.168.39.11:8091",
            dbname: "nodeJX1"
        }, {
            name: "东营孤罗入口",
            id: "192.168.31.19:8019",
            dbname: "nodeDY9"
        },
        ],
        ip,
        DBName: "nodeGD8",
        ws_state_id: -1,
        goonode,
    },
    created() {
        this.ip = this.host_list[0].id;
        this.changeWS();
    },
    methods: {
        prechange: (item) => {
            item.is_changing = true;
        },
        change: (item) => {
            set_ws_var(ws, item);
            item.is_changing = false;
        },
        changeWS() {
            ws?.close();
            ws = new WebSocket(`ws://${this.ip}`);
            this.DBName = this.host_list.find(item => item.id == this.ip).dbname;

            ws.onopen = evt => {
                console.log("Connection open ...");
                for (const item of this.goonode) {
                    sub_ws_var(ws, item);
                };
                this.ws_state_id = ws.readyState;
            };

            ws.onmessage = evt => {
                console.log("Received Message: " + evt.data);
                let ret = JSON.parse(evt.data);
                if (ret?.error) return;
                for (const item of this.goonode) {
                    if (item.name == ret.name.replace(`${this.DBName}/`, "")) {
                        item.value = item.newValue = ret.value;
                        return;
                    }
                }
            };

            ws.onclose = evt => {
                console.log("Connection closed.");
                this.ws_state_id = ws.readyState;
            };
        }
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