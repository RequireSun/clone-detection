import { parseNoPatch } from 'babel-eslint';

export default {
    locationProps: new Set(['loc', 'start', 'end', 'range']),

    parse(code: string) {
        const opts = {
            sourceType: 'module',
        };

        const ast = parseNoPatch(code, opts);
        delete ast.tokens;
        return ast;
    },

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
