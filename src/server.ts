import { resolve as pathResolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import * as http from 'http';
import ASTParser from './parser';
import { BaseNode, SourceLocation } from '@babel/types';
// , Identifier, VariableDeclaration, VariableDeclarator, BlockStatement, FunctionDeclaration, FunctionExpression, Statement

const PORT = process.env.PORT || 3000;
// const FILE = 'qqDevtools/10.42d40f17624b7b8e837d';
const FILE = 'helloWorld';

const server = http.createServer(function (request: http.IncomingMessage, response: http.ServerResponse): void {
    console.log("create a server...");
    response.writeHead(200, {'Content-Type': 'application/json'});

    const fileData = readFileSync(pathResolve(__dirname, '../test-case/', `${FILE}.js`), { encoding: 'utf-8' });

    const ast = new ASTParser(fileData);
    ast.execute();

    // writeFileSync(pathResolve(__dirname, '../dist/qqDevtools/10.42d40f17624b7b8e837d.txt'), ast.list.map((astItem: BaseNode) => {
    //     const loc: SourceLocation = astItem.loc || { start: { line: 0, column: 0 }, end: { line: 0, column: 0 }};
    //
    //     // 本段类型
    //     let line = `${astItem.type}\t`;
    //     // 本段起止位置
    //     line += `${astItem.start},${astItem.end}\t`;
    //     // 本段的行列起止位置
    //     line += `${loc.start.line}:${loc.start.column},${loc.end.line}:${loc.end.column}\t`;
    //
    //     if (astItem['body']) {
    //         let loop;
    //
    //         switch (astItem.type) {
    //             case 'BlockStatement': {
    //                 // 函数体
    //                 loop = (astItem as BlockStatement).body;
    //                 line += loop.map((bodyItem: Statement) => {
    //                     return bodyItem.type;
    //                 }).join(',') + '\t';
    //                 break;
    //             }
    //             case 'FunctionDeclaration': {
    //                 // 函数声明
    //                 loop = (astItem as FunctionDeclaration).body.body;
    //                 line += loop.map((bodyItem: Statement) => {
    //                     return bodyItem.type;
    //                 }).join(',') + '\t';
    //                 break;
    //             }
    //             case 'FunctionExpression': {
    //                 // 函数表达式
    //                 loop = (astItem as FunctionExpression).body.body;
    //                 line += loop.map((bodyItem: Statement) => {
    //                     return bodyItem.type;
    //                 }).join(',') + '\t';
    //                 break;
    //             }
    //             case 'VariableDeclaration': {
    //                 // 这是个 let const 声明
    //                 loop = (astItem as VariableDeclaration).declarations;
    //                 line += loop.map((bodyItem: VariableDeclarator) => {
    //                     return (bodyItem.id as Identifier).name;
    //                 }).join(',') + '\t';
    //                 break;
    //             }
    //             case 'VariableDeclarator': {
    //                 // 变量声明时的具体操作
    //                 if (astItem['init']) {
    //                     switch (astItem['init'].type) {
    //                         case 'CallExpression': {
    //                             // line += astItem['init'].callee.;
    //                             break;
    //                         }
    //                         case 'BinaryExpression': {
    //                             break;
    //                         }
    //                     }
    //                 } else {
    //                     line += '\t';
    //                 }
    //                 break;
    //             }
    //             case 'Program':
    //                 // 函数根部就直接忽略
    //                 return '\r\n';
    //         }
    //
    //         // 因为 ts 没有动态类型检查
    //         // 所以这个地方用 as 一个其他类型骗过静态类型检查
    //         // 要不然实在没法半段子类
    //         // TODO 要判断下其他类型, 有的时候一大段函数都是放在某个函数的参数里的
    //         // TODO 需要把每个 type 对应成一个 utf-8 字符, 这样才能用 simhash 进行计算
    //         // TODO 要算下每个函数是干什么的, 只计算内部函数顺序, 错误可能有点大
    //     } else {
    //         line += '\t';
    //     }
    //
    //     return line + '\r\n';
    // }), {
    //     encoding: 'utf-8',
    // });

    writeFileSync(pathResolve(__dirname, '../dist/', `${FILE}.txt`), ast.list.map((astItem: BaseNode) => {
        if (astItem.detectionValue) {
            const loc: SourceLocation = astItem.loc || { start: { line: 0, column: 0 }, end: { line: 0, column: 0 }};
            // 本段类型
            let line = `${astItem.type}\t`;
            // 本段起止位置
            line += `${astItem.start},${astItem.end}\t`;
            // 本段的行列起止位置
            line += `${loc.start.line}:${loc.start.column},${loc.end.line}:${loc.end.column}\t`;
            // 我自制的查重 key
            line += astItem.detectionValue;

            return line + '\r\n';
        } else {
            return JSON.stringify(astItem) + '\r\n';
        }
    }).join(''), {
        encoding: 'utf-8',
    });

    response.write(JSON.stringify({ size: ast.list.length }));
    response.end();
});

server.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`);
});
