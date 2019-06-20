/*
 * Copyright (c) 2019, goosy.jo@gmail.com
 * MIT License
 */

import {Goonode} from "./goonode.js";

var goonode = new Goonode("./settings/channels.json");
goonode.createConns();

export { Goonode, goonode };

