/// <reference types="../types/babel-eslint" />
// import { parseNoPatch } from 'babel-eslint';
import { parseNoPatch } from '../../libs/babel-eslint/lib/index';
import { ParserOptions } from '@babel/parser';
import { BaseNode, FunctionExpression } from '@babel/types'

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

export function parse(code: string): BaseNode {
    const opts: ParserOptions = {
        sourceType: 'module',
    };

    const ast = parseNoPatch(code, opts);
    // 这个 tokens 好像没什么卵用
    delete ast.tokens;
    return ast;
}

/**
 * 递归的摊平整个函数, 后面看看有没有性能问题, 有的话再去递归
 * @param {BaseNode} node
 * @returns {BaseNode[]}
 */
export function flatten(node: BaseNode): BaseNode[] {
    const list: BaseNode[] = [];

    const newNode = {
        ...node,
    };

    if (Object.hasOwnProperty.call(node, 'body')) {
        // 实际上有 body 的有好多种, 这里随便拿一种来通过 ts 的类型检查
        // 你要是 ts 能在运行时判断类型, 我也不用这么瞎搞啊
        delete (newNode as FunctionExpression).body;
    }

    list.push(newNode);

    // 用土法子整
    if (Object.hasOwnProperty.call(node, 'body')) {
        const body: any = (node as FunctionExpression).body;

        // 比如 ts 的 interface, 它的内部也是算 body 的, 要过滤掉
        if (Array.isArray(body)) {
            // 将 body 内部的语句解析了插入到我的 list 里
            for (let i = 0, l = body.length; i < l; ++i) {
                // 把参数摊平插进来
                list.push(...flatten(body[i]));
            }
        }
    }

    return list;
}

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
