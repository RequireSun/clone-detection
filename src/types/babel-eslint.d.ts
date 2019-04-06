/**
 * 为了能在业务代码里使用 babel-eslint
 */
declare module 'babel-eslint' {
    import { File } from '@babel/types';
    import { ParserOptions } from '@babel/parser';

    function parseNoPatch(input: string, options?: ParserOptions): File;
}
