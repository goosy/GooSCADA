/*
 * Copyright (c) 2019, goosy.jo@gmail.com
 * MIT License
 */

import events from 'events';
import net from "net";
import {JSONFromFile} from "./JSONFromFile.js";

export class Goonode {

    constructor(path=null) {
        this.tags = {};
        this.channels = [];
        if(path)this.setConfigFile(path);
    }

    setConfigFile(path){
        this.configFile = path;
    }

    setTag(tag){
        let tagname = tag.name;
        if(!this.tags[tagname]){
            this.tags[tagname]={
                "name" : tag.name,
                "type" : tag.type,
                "value" : tag.value
            };
            this.emit('change', this.tags[tagname]);
        }
        let tagInCache = this.tags[tag.name];
        if( tagInCache.value != tag.value) {
            tagInCache.value = tag.value;
            this.emit('change', tagInCache);
        }
    }

    parse(channel){
        channel.tags.forEach( tag => {
            let buffer = channel.buffer;
            buffer = buffer ? buffer : Buffer.alloc(0);
            if( tag.offset + tag.length > buffer.length )return;//防止溢出
            if (tag.type == 'bool') {
                tag.value = !!(buffer.readUInt8(tag.offset)&(1<<tag.bit_offset)); //获取 offset.bit_offset 的布尔值
                this.setTag(tag);
                return ;
            }
            if (tag.type == 'int16') {
                tag.value = buffer.readInt16BE(tag.offset);
                this.setTag(tag);
                return;
            }
            if (tag.type == 'real') {
                tag.value = buffer.readFloatBE(tag.offset);
                this.setTag(tag);
                return;
            }
        });
    }

    async getChannels(){
        this.channels = await JSONFromFile(this.configFile, {"encoding":"utf8"});
    }

    async createConns(){
        let self = this; 
        await this.getChannels();
        this.channels.forEach( channel=>{
            /**
             * 构建TCP客户端
             */
            let client = net.Socket();

            // 设置连接的服务器
            client.connect(channel.port, channel.host, function () {
                console.log(` connect the server ${channel.host}:${channel.port}\n`);
                // 向服务器发送数据 
                client.write("message from VPLC");
            });

            // 监听服务器传来的data数据
            client.on("data", data=> {
                channel.buffer = data; 
                self.parse(channel);
                console.log(data);
            });

            // 监听end事件 
            client.on("end", function () {
                console.log("data end");
            });

        });
    }
}

Goonode.super_ = events.EventEmitter;
Object.setPrototypeOf(Goonode.prototype, events.EventEmitter.prototype);