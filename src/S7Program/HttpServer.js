import { createServer } from 'http';
import { readFile } from 'fs/promises';
import querystring from 'querystring';

// for realtime data
import { plc_config_JSON } from '../../conf/config.js'
import { connections } from "../../conf/connections.js";
function getConf() {
    const sendDB = plc_config_JSON.areas[0];
    const recvDB = plc_config_JSON.areas[1];
    function addProp(tag) {
        if (tag.hasOwnProperty("value")) {
            tag.is_changing = false;
            tag.newValue = tag.value;
        } else if (tag.hasOwnProperty("tags")) {
            tag.tags.forEach(addProp)
        }
    }
    sendDB.tags.forEach(addProp);
    recvDB.tags.forEach(addProp);
    return `// auto gen
const host = '${connections[0].localAddress + ":" + plc_config_JSON.port}';
const hostdesc = '${plc_config_JSON.description}';
const sendDB = ${JSON.stringify(sendDB)};
const recvDB = ${JSON.stringify(recvDB)};

`;
}

function getFileType(endTag) {
    var type = null;
    switch (endTag) {
        case 'html':
        case 'htm':
            type = 'text/html; charset=UTF-8';
            break;
        case 'js':
            type = 'application/javascript; charset="UTF-8"';
            break;
        case 'css':
            type = 'text/css; charset="UTF-8"';
            break;
        case 'txt':
            type = 'text/plain; charset="UTF-8"';
            break;
        case 'manifest':
            type = 'text/cache-manifest; charset="UTF-8"';
            break;
        default:
            type = 'application/octet-stream';
            break;
    }
    return type;
}
const staticpath = "./public";

async function requestListener(request, response) {

    let body = "";
    request.on('data', function (chunk) {
        body += chunk;
    });

    request.on('end', async function () {
        body = querystring.parse(body);
        /** @type {string} */
        const pathname = request.url;
        console.log(request.mothod, pathname);
        switch (pathname) {
            case '' || '/':
                try {
                    const content = await readFile(staticpath + '/index.html');
                    response.writeHead(200, {
                        'Content-Type': 'text/html; charset=UTF-8'
                    });
                    response.write(content);
                    response.end();
                } catch (err) {
                    // When a request is aborted - err is an AbortError
                    response.writeHead(404, {
                        'Content-Type': 'text/plain; charset="UTF-8"'
                    });
                    response.write(err.message);
                    response.end();
                }
                break;
            case '/json': // JSON处理
                response.writeHead(200, {
                    'Content-type': 'application/json; charset=UTF-8'
                });
                response.write(JSON.stringify({
                    something: 'OK'
                }));
                response.end();
                break;
            case '/reqself': // 返回请求的文本
                response.writeHead(200, {
                    'Content-type': 'text/plain; charset=UTF-8'
                });
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
                });
                break;
            default: // 处理静态文件
                let filename;
                if (pathname.startsWith('/conf/')) filename = '.' + pathname;
                else filename = staticpath + pathname;
                // console.log(filename);
                const type = getFileType(filename.substring(filename.lastIndexOf('.') + 1));
                try {
                    // const controller = new AbortController();
                    // const { signal } = controller;
                    const promise = readFile(filename/* , { signal } */);
                    // Abort the request before the promise settles.
                    // controller.abort();
                    const content = await promise;

                    response.writeHead(200, {
                        'Content-Type': type
                    });
                    if (filename === './public/bundler.js') response.write(getConf());
                    response.write(content);
                    response.end();
                } catch (err) {
                    // When a request is aborted - err is an AbortError
                    console.log(err)
                    response.writeHead(404, {
                        'Content-Type': 'text/plain; charset="UTF-8"'
                    });
                    response.write(err.message);
                    response.end();
                }
                break;
        }

    });
}

export function createHttpServer() {
    const server = createServer(requestListener);
    return server;
}