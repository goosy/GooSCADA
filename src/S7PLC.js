/*
 * Copyright (c) 2019, goosy.jo@gmail.com
 * MIT License
 */

import events from 'events';
import snap7 from "./node-snap7.js";

export class S7PLC {
    constructor(path = null) {
        this.tags = {};
        if (path) this.setConfigFile(path);
    }

    setConfigFile(path) {
        this.configFile = path;
    }

    setTag(tag) {
        this.tags[tag.name] = tag;
        console.log(tag);
        let buffer = tag.buffer;
        if (tag.type == 'bool') {
            let setBit = 1 << tag.bit_offset;
            let byte_value = buffer.readUInt8(tag.offset);
            if (tag.value) byte_value = byte_value | setBit;
            else byte_value = byte_value & (~setBit);
            buffer.writeUInt8(byte_value, tag.offset); // 设置 offset.bit_offset 的布尔值
            return;
        }
        if (tag.type == 'int16') {
            buffer.writeInt16BE(tag.value, tag.offset); // 设置 offset 的int16值
            return;
        }
        if (tag.type == 'real') {
            buffer.writeFloatBE(tag.value, tag.offset); // 设置 offset 的int16值
            return;
        }
    }

    getTag(tagname) {
        return this.tags[tagname];
    }

    createDB(area) {
        // Create a new Buffer and register it to the server as DB 
        let buf = Buffer.alloc(area.length);
        let server = this.s7server;
        area.tags.forEach(tag => {
            tag.buffer = buf;
            this.setTag(tag);
        })
        server.RegisterArea(server.srvAreaDB, area.DBNO, buf);
    }
    createMB(area) {
        // to do
    }
    createEB(area) {
        // to do
    }
    createAB(area) {
        // to do
    }
    createTM(area) {
        // to do
    }
    createCT(area) {
        // to do
    }

    async startServe() {
        let { vplc } = await import(this.configFile);
        let server = this.s7server = new snap7.S7Server();
        server.on("event", (event) => {
            console.log(server.EventText(event));
        });

        let areas = this.areas = vplc.areas;
        areas.forEach(area => {
            // console.log(area);
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