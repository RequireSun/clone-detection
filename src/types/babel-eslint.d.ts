/**
 * 为了能在业务代码里使用 babel-eslint
 */
declare module 'babel-eslint' {
    import { File } from '@babel/types';
    import { ParserOptions } from '../../libs/babel-parser';

    function parseNoPatch(input: string, options?: ParserOptions): File;
}

declare module '@babel/types/wrapped' {
    import { BaseNode as BaseBaseNode, BlockStatement as BaseBlockStatement } from '@babel/types';

    export interface BaseNode extends BaseBaseNode {
        /**
         * @EDITED by kelvinsun
         * @EDITED date 2019-04-09
         * 我这边提取出去, 用作查重的关键内容
         */
        detectionValue?: string;
        /**
         * @EDITED by kelvinsun
         * @EDITED date 2019-04-09
         * 用来给 block 型的大型列表做数据用
         * 一维数组, 就是自己内部的东西
         */
        blockListValue?: string[];
    }

    export interface BlockStatement extends BaseBlockStatement {
        /**
         * @EDITED by kelvinsun
         * @EDITED date 2019-04-09
         * 二维数组, 第一位是每一行, 第二维是每一行具体的内容
         */
        blockListValue?: string[][];
    }

    export { SourceLocation } from '@babel/types';
}
