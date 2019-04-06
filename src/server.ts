import { resolve as pathResolve } from 'path';
import { readFileSync } from 'fs';
import * as http from 'http';
import { parse, flatten } from './parser';

const PORT = process.env.PORT || 3000;

const server = http.createServer(function (request: http.IncomingMessage, response: http.ServerResponse): void {
    console.log("create a server...");
    response.writeHead(200, {'Content-Type': 'application/json'});

    // const fileData = readFileSync(pathResolve(__dirname, '../test-case/helloWorld.js'), { encoding: 'utf-8' });
    const fileData = readFileSync(pathResolve(__dirname, '../test-case/qqDevtools/10.42d40f17624b7b8e837d.js'), { encoding: 'utf-8' });
    const ast = parse(fileData);

    response.write(JSON.stringify(flatten(ast)));
    response.end();
});

server.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`);
});
