/*
 * Copyright (c) 2019, goosy.jo@gmail.com
 * modi from https://github.com/mathiask88/node-snap7/
 * MIT License
 */

import events from 'events';
import util from "util";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const snap7 = require('./node_snap7.node');
export { snap7 };

// promisify
snap7.S7Client.prototype.ReadArea = util.promisify(snap7.S7Client.prototype.ReadArea);
snap7.S7Client.prototype.ConnectTo = util.promisify(snap7.S7Client.prototype.ConnectTo);

snap7.S7Client.prototype.DBRead = async function (dbNumber, start, size) {
    return await this.ReadArea(this.S7AreaDB, dbNumber, start, size, this.S7WLByte);
}

snap7.S7Client.prototype.DBWrite = async function (dbNumber, start, size, buf) {
    return await this.WriteArea(this.S7AreaDB, dbNumber, start, size, this.S7WLByte, buf);
}

snap7.S7Client.prototype.MBRead = async function (start, size) {
    return await this.ReadArea(this.S7AreaMK, 0, start, size, this.S7WLByte);
}

snap7.S7Client.prototype.MBWrite = async function (start, size, buf) {
    return await this.WriteArea(this.S7AreaMK, 0, start, size, this.S7WLByte, buf);
}

snap7.S7Client.prototype.EBRead = async function (start, size) {
    return await this.ReadArea(this.S7AreaPE, 0, start, size, this.S7WLByte);
}

snap7.S7Client.prototype.EBWrite = async function (start, size, buf) {
    return await this.WriteArea(this.S7AreaPE, 0, start, size, this.S7WLByte, buf);
}

snap7.S7Client.prototype.ABRead = async function (start, size) {
    return await this.ReadArea(this.S7AreaPA, 0, start, size, this.S7WLByte);
}

snap7.S7Client.prototype.ABWrite = async function (start, size, buf) {
    return await this.WriteArea(this.S7AreaPA, 0, start, size, this.S7WLByte, buf);
}

snap7.S7Client.prototype.TMRead = async function (start, size) {
    return await this.ReadArea(this.S7AreaTM, 0, start, size, this.S7WLTimer);
}

snap7.S7Client.prototype.TMWrite = async function (start, size, buf) {
    return await this.WriteArea(this.S7AreaTM, 0, start, size, this.S7WLTimer, buf);
}

snap7.S7Client.prototype.CTRead = async function (start, size) {
    return await this.ReadArea(this.S7AreaCT, 0, start, size, this.S7WLCounter);
}

snap7.S7Client.prototype.CTWrite = async function (start, size, buf) {
    return await this.WriteArea(this.S7AreaCT, 0, start, size, this.S7WLCounter, buf);
}

snap7.S7Server.super_ = events.EventEmitter;
Object.setPrototypeOf(snap7.S7Server.prototype, events.EventEmitter.prototype);
