/*
 * Copyright (c) 2019, goosy.jo@gmail.com
 * MIT License
 */

import {
    S7PLC,
    Goonode
} from "./lib/index.js";

// 数据获取适配器 —— goonode
// 这是一个调用Goonode类产生tags的例子
// todo: 其它适配器 
var goonode = new Goonode("./conf/channels.js");
goonode.createConns();

// 建立 VPLC
let server = new S7PLC("./conf/config.js");

goonode.on("change", tag => {
    let t = server.getTag(tag.name);
    t.value = tag.value;
    server.setTag(t);
});

server.startServe();