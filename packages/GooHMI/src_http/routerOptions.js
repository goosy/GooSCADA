import { readFile } from 'fs/promises';
import { getMIME } from './file-types.js';

let routerOptions = {
    static: "./public",
    conf: './conf',
    '/': async (request, response) => {
        try {
            const content = await readFile(routerOptions.static + '/index.html');
            response.writeHead(200, { 'Content-Type': getMIME('html') });
            response.write(content);
            response.end();
        } catch (err) {
            // When a request is aborted - err is an AbortError
            response.writeHead(404, { 'Content-Type': getMIME('txt') });
            response.write(err.message);
            response.end();
        }
    },
    '/json': (request, response) => { // JSON处理
        response.writeHead(200, { 'Content-type': getMIME('json') });
        response.write(JSON.stringify({
            something: 'OK'
        }));
        response.end();
    },
    '/reqself': (request, response) => { // 返回请求的文本
        response.writeHead(200, { 'Content-type': getMIME('txt') });
        response.write(request.mothod + ' ' + request.url + ' HTTP/' + request.httpVersion + '\r\n');
        for (var h in request.headers) {
            response.write(h + ':' + request.headers[h] + '\r\n');
        }
        response.write('\r\n');
        request.on('data', function (chunk) {
            response.write(chunk);
        });
        request.on('end', function (chunk) {
            response.end();
        })
    }
};

function setRouterOptions(opts = {}) {
    routerOptions = { ...routerOptions, ...opts };
}

export { routerOptions, setRouterOptions };
