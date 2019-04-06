clone-detection
======

A clone detection tool for javascript.

## 原理

`babel-eslint` 依赖 `@babel/parser` 实现 AST 树解析功能, `@babel/parser` 中的 Parser 是通过对 node 节点类进行包装而成的, 所以可以从参数内透传 list 进去, 在每次节点生成时直接将新生成的节点插入到这个 list 当中, 进而生成整段代码的节点列表.

后面再根据这个列表生成它和他们子的摘要即可.

将这个代码的摘要列表生成成一个文件, 再对不同代码的文件进行对比, 算出相似度, 应该就 ok 了.

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

Q: nodemon 重新加载的时候 chrome 的 inspect ws 长连接没有断开, 导致重启 node 进程时 9229 调试端口被占用, 如何解决?

A: 加入 `kill-port` 包, 在运行 node 前先 kill 一下对应的端口

   [https://github.com/remy/nodemon/issues/1050#issuecomment-323680697](https://github.com/remy/nodemon/issues/1050#issuecomment-323680697)

Q: 怎么解决抹平过程中存在的问题?

A: 自己计算哪些属性需要抹平又费时又费力, 所以我直接把 babel-parser 和 babel-eslint 两个包拷了进来 (其中 eslint 是源码, parser 是编译后的 lib 包, 因为它使用了 flow, 再接入 flow 对我的系统来说压力太大)

   在计算时直接将我的 collection 传入, 每次 finishNode 的时候自动 attach 进去, 可以大大减少处理的工作量
