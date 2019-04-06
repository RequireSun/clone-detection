import * as http from 'http';
import { parse } from './parser';

const PORT = process.env.PORT || 3000;

const server = http.createServer(function (request: http.IncomingMessage, response: http.ServerResponse): void {
    console.log("create a server...");
    response.writeHead(200, {'Content-Type': 'application/json'});

    const ast = parse('alert(123)');

    response.write(JSON.stringify(ast));
    response.end();
});

server.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`);
    console.log("test...");
});
