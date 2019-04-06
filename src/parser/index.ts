/// <reference types="../types/babel-eslint" />
import { parseNoPatch } from 'babel-eslint';
import { ParserOptions } from '@babel/parser';

export const locationProps = new Set(['loc', 'start', 'end', 'range']);

export function parse(code: string) {
    const opts: ParserOptions = {
        sourceType: 'module',
    };

    const ast = parseNoPatch(code, opts);
    delete ast.tokens;
    return ast;
}

export default {
    nodeToRange(node: { [prop: string]: any }) {
        if (typeof node.start !== 'undefined') {
            return [node.start, node.end];
        }
    },

    _ignoredProperties: new Set([
        '_paths',
        '_babelType',
        '__clone',
    ]),
};
