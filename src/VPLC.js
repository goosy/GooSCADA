/*
 * Copyright (c) 2019, goosy.jo@gmail.com
 * MIT License
 */

import {GooS7Server} from "./GooS7Server.js";
import {goonode} from "./getData.js";

//console.log(goonode);

let server = new GooS7Server("./settings/vplc.config.json");
server.startServe();
goonode.on("change", tag=>{
    let t=server.getTag(tag.name);
    t.value=tag.value;
    server.setTag(t);
});
