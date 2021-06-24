/*
 * Copyright (c) 2019, goosy.jo@gmail.com
 * MIT License
 */
import events from 'events';
import snap7 from "./node-snap7.js";

export class S7PLC {
    #s7server = new snap7.S7Server()

    #area_set = new Set();
    #area_map = new Map();
    get_area(name) {
        return this.#area_map.get(name);
    }

    /**
     * 描述
     * @constructor
     * @param {string?} path
     */
    constructor(path = null) {
        if (path) this.setConfigFile(path);
    }

    #config_file;
    /**
     * 设置 vplc 配置文件
     * @param {string} path
     */
    set configFile(path) {
        this.#config_file = path;
    }

    mount(area) {
        this.#area_set.add(area);
        this.#area_map.set(area.name, area)
        // Create a new Buffer and register it to the server as DB 
        let buff = Buffer.alloc(area.bytes);
        area.mount(buff);
        let server = this.s7server;
        switch (area.type) { // DB, MB, EB, AB, TM, CT,
            case "DB":
                server.RegisterArea(server.srvAreaDB, area.DBNO, buff);
                break;
            default:
                break;
        }
    }

    async startServe() {
        let { vplc } = await import(this.#config_file);

        const server = this.#s7server;
        server.on("event", (event) => {
            console.log(server.EventText(event));
        });

        const areas = vplc.areas;
        areas.forEach(area => {
            if (area.type == "DB") {
                this.createDB(area);
                return;
            }
        });

        server.StartTo(vplc.host);
    }
}

S7PLC.super_ = events.EventEmitter;
Object.setPrototypeOf(S7PLC.prototype, events.EventEmitter.prototype);