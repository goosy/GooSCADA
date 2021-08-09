import { createHttpServer, setRouterOptions } from '../dist/HttpServer.js';

const app = createHttpServer();
app.listen(1080);
console.log('Starting HTTP server on http://127.0.0.1:1080');