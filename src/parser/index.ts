import { parseNoPatch } from 'babel-eslint';


export default {
    locationProps: new Set(['loc', 'start', 'end', 'range']),

    parse(parser, code) {
        const opts = {
            sourceType: 'module',
        };

        const ast = parseNoPatch(code, opts);
        delete ast.tokens;
        return ast;
    },

    nodeToRange(node) {
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
