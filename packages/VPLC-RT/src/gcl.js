import { readFile } from 'fs/promises';
import { Document, parseDocument } from 'yaml';

export class GCL {
    #file;
    get file() {
        return this.#file;
    }
    /** @type {Document[]} */
    #document;
    get document() {
        return this.#document;
    }
    #source;
    get source() {
        return this.#source;
    }
    #lines;
    get lines() {
        return this.#lines;
    }
    get_lines() {
        this.#lines = [];
        let index, position = 0;
        do {
            index = this.#source.indexOf('\n', position);
            if (index > -1) {
                this.#lines.push([position, index]);
                position = index + 1;
            }
        } while (index > -1);
        if (position < this.#source.length) this.#lines.push([position, this.#source.length]);
    }

    constructor() { }

    get_coorinfo(start, end) {
        const ln = 1 + this.#lines.findIndex(([s, e]) => s <= start && start < e);
        const col = start - this.#lines[ln - 1][0];
        const code = this.#source.substring(start, end + 1);
        return { ln, col, code };
    }

    static async load(yaml, options = {}) {
        const gcl = new GCL();
        const {
            encoding = 'utf8',
            isFile = true,
            filename = '',
        } = options;
        if (isFile) {
            gcl.#file = yaml;
            yaml = gcl.#source = (await readFile(gcl.#file, { encoding }));
        } else {
            gcl.#file = filename;
            yaml = gcl.#source = yaml;
        }
        gcl.get_lines();
        gcl.#document = parseDocument(yaml, { version: '1.1' }); // only YAML 1.1 support merge key
        gcl.#document.gcl = gcl;
        return gcl;
    }

    static async load_file(filename, options = {}) {
        const gcl = await GCL.load(filename, { ...options, isFile: true });
        return gcl ;
    }
}
