import {S7Memory} from "./S7Memory.js";

export class S7Area extends S7Memory {
    tags = [];
    constructor({ name = "", type = "byte"}) {
        super({name, type, size})
        this.buffer = Buffer.alloc(area.length);
        let server = this.s7server;
        area.tags.forEach(tag => {
            tag.buffer = buf;
            this.setTag(tag);
        })
        server.RegisterArea(server.srvAreaDB, area.DBNO, buf);
    }
    push(tag) { }

    /**
     * 加载一个数据区域
     * @override
     * @param {Buffer} buff
     * @param {number=} offset 
     * @return {number[]}
     */
    mount(buff, offset = 0) {
        const end_offset = offset + this.size;
        this.buffer = buff.slice(offset, end_offset);
        this.#mounted = true;
        super.mount();
        return [end_offset, 0];
    }

}
