clone-detection
======

A clone detection tool for javascript.

## 参考

[GitHub: AST explorer](https://github.com/fkling/astexplorer)

[一种改进的基于抽象语法树的软件源代码比对算法](http://netinfo-security.org/CN/article/downloadArticleFile.do?attachType=PDF&id=3520)

离线版: [一种改进的基于抽象语法树的软件源代码比对算法](reference/一种改进的基于抽象语法树的软件源代码比对算法.pdf)

## 问题修复

Q: TypeScript 自定义类型在 ts-node 下失效

A: 请在 tsconfig.json 里增加 typeRoots 属性外再在每个 ts 文件顶部声明 reference

   [https://github.com/TypeStrong/ts-node#help-my-types-are-missing](https://github.com/TypeStrong/ts-node#help-my-types-are-missing)
    
Q: 如何实现 livereload

A: 使用 nodemon 结合 ts-node 实现, 不要用辣鸡 supervisor

   [https://medium.com/aherforth/how-to-get-auto-restart-and-breakpoint-support-with-typescript-and-node-5af589dd8687](https://medium.com/aherforth/how-to-get-auto-restart-and-breakpoint-support-with-typescript-and-node-5af589dd8687)

Q: 如何使用 chrome 调试工具打断点

A: 用 `node --require ts-node/register` 运行 node, 然后在 node 上加 `inspect` 参数就行了, 我抄了下下面这个博文

   __记得一定要关掉 TSW__
   
   [https://hackernoon.com/debugging-javascript-typescript-node-apps-with-chrome-devtools-vs-code-and-webstorm-97b882aee0ad](https://hackernoon.com/debugging-javascript-typescript-node-apps-with-chrome-devtools-vs-code-and-webstorm-97b882aee0ad)
