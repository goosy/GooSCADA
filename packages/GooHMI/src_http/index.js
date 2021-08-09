import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { getMIME } from './file-types.js';
import { routerOptions, setRouterOptions } from './routerOptions';

const webpath = dirname(fileURLToPath(import.meta.url));
setRouterOptions({ // in dist folder, there must have ./public/ and ./conf/ folder
    static: join(webpath, './public'),
    conf: join(webpath, './conf')
});

function defaultListener(request, response) {
    let body = "";
    request.on('data', function (chunk) {
        body += chunk;
    });

    request.on('end', async function () {
        /** @type {string} */
        const pathname = request.url;

        if (routerOptions.hasOwnProperty(pathname)) {
            await routerOptions[pathname](request, response);
            return;
        }

        let filename;
        if (pathname.startsWith('/conf/')) filename = routerOptions.conf + pathname.substring(5);
        else filename = routerOptions.static + pathname;
        // console.log(filename);
        const type = getMIME(filename.substring(filename.lastIndexOf('.') + 1));
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
            response.write(content);
            response.end();
        } catch (err) {
            // When a request is aborted - err is an AbortError
            console.log(err);
            response.writeHead(404, {
                'Content-Type': getMIME('text')
            });
            response.write(err.message);
            response.end();
        }

    });
}

function createHttpServer() {
    return createServer(defaultListener);
}

export { createHttpServer, setRouterOptions }
