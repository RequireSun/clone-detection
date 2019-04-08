/// <reference types="../types/babel-eslint" />
// import { parseNoPatch } from 'babel-eslint';
// import { ParserOptions } from '@babel/parser';
import { parseNoPatch, ParserOptions } from '../../libs/babel-eslint/lib/index';
import { BaseNode } from '@babel/types';

export const locationProps = new Set([
    'loc',
    'start',
    'end',
    'range',
]);

export const _ignoredProperties = new Set([
    '_paths',
    '_babelType',
    '__clone',
]);

/**
 * 用来划定代码在程序中的位置?
 * 看起来就是为了在代码框里给代码着色的, 可能能用得到, 后面查出相似代码来之后用来标记
 * @param {BaseNode} node
 * @returns {number[]}
 */
export function nodeToRange(node: BaseNode) {
    if (typeof node.start !== 'undefined') {
        return [node.start, node.end];
    }
}

/**
 * 现在速度挺快了, 就是数据量太大, 浏览器显示不出来...
 */
export default class ASTParser {
    list: BaseNode[] = [];
    tree: BaseNode;
    code: string;

    constructor(code: string) {
        this.code = code;
    }

    execute() {
        this.tree = this.parse();
    }

    private parse(): BaseNode {
        const opts: ParserOptions = {
            sourceType: 'module',
            list: this.list,
        };

        const ast = parseNoPatch(this.code, opts);
        // 这个 tokens 好像没什么卵用
        delete ast.tokens;
        return ast;
    }
}
