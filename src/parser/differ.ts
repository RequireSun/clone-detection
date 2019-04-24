// 删了一部分没有子节点的, 后面需要再补充吧
import {
    BaseNode,
    ArrayExpression,
    ArrayPattern,
    ArrowFunctionExpression,
    AssignmentPattern,
    AwaitExpression,
    BlockStatement,
    BreakStatement,
    CallExpression,
    CatchClause,
    ClassBody,
    ClassDeclaration,
    ClassExpression,
    ClassImplements,
    ClassMethod,
    ClassPrivateMethod,
    ClassPrivateProperty,
    ClassProperty,
    ConditionalExpression,
    ContinueStatement,
    // declare 系列好像是 ts 类型定义套装, 先忽略了
    // DeclareClass,
    // DeclareExportAllDeclaration,
    // DeclareExportDeclaration,
    // DeclareFunction,
    // DeclareInterface,
    // DeclareModule,
    // DeclareModuleExports,
    // DeclareOpaqueType,
    // DeclareTypeAlias,
    // DeclareVariable,
    // DeclaredPredicate,
    Decorator,
    Directive,
    DoExpression,
    DoWhileStatement,
    ExportAllDeclaration,
    ExportDefaultDeclaration,
    ExportDefaultSpecifier,
    ExportNamedDeclaration,
    ExportNamespaceSpecifier,
    ExportSpecifier,
    ExpressionStatement,
    File,
    ForInStatement,
    ForOfStatement,
    ForStatement,
    FunctionDeclaration,
    FunctionExpression,
    GenericTypeAnnotation,
    Identifier,
    IfStatement,
    ImportDeclaration,
    ImportDefaultSpecifier,
    ImportNamespaceSpecifier,
    ImportSpecifier,
    // 真的压缩过的代码应该就不会有 jsx 了, 不管了
    // JSXAttribute,
    // JSXClosingElement,
    // JSXClosingFragment,
    // JSXElement,
    // JSXEmptyExpression,
    // JSXExpressionContainer,
    // JSXFragment,
    // JSXIdentifier,
    // JSXMemberExpression,
    // JSXNamespacedName,
    // JSXOpeningElement,
    // JSXOpeningFragment,
    // JSXSpreadAttribute,
    // JSXSpreadChild,
    // JSXText,
    LabeledStatement,
    LogicalExpression,
    MemberExpression,
    MetaProperty,
    NewExpression,
    ObjectExpression,
    ObjectMethod,
    ObjectPattern,
    ObjectProperty,
    // 又是类型判断
    // ObjectTypeAnnotation,
    // ObjectTypeCallProperty,
    // ObjectTypeIndexer,
    // ObjectTypeInternalSlot,
    // ObjectTypeProperty,
    // ObjectTypeSpreadProperty,
    // OpaqueType,
    OptionalCallExpression,
    OptionalMemberExpression,
    ParenthesizedExpression,
    PipelineBareFunction,
    PipelineTopicExpression,
    Placeholder,
    PrivateName,
    Program,
    QualifiedTypeIdentifier,
    RestElement,
    // 不知道为啥不让用
    // RestProperty,
    ReturnStatement,
    SequenceExpression,
    SpreadElement,
    // 这个也不让用
    // SpreadProperty,
    SwitchCase,
    SwitchStatement,
    // ts 全员注释
    // TSAnyKeyword,
    // TSArrayType,
    // TSAsExpression,
    // TSBooleanKeyword,
    // TSCallSignatureDeclaration,
    // TSConditionalType,
    // TSConstructSignatureDeclaration,
    // TSConstructorType,
    // TSDeclareFunction,
    // TSDeclareMethod,
    // TSEntityName,
    // TSEnumDeclaration,
    // TSEnumMember,
    // TSExportAssignment,
    // TSExpressionWithTypeArguments,
    // TSExternalModuleReference,
    // TSFunctionType,
    // TSImportEqualsDeclaration,
    // TSImportType,
    // TSIndexSignature,
    // TSIndexedAccessType,
    // TSInferType,
    // TSInterfaceBody,
    // TSInterfaceDeclaration,
    // TSIntersectionType,
    // TSLiteralType,
    // TSMappedType,
    // TSMethodSignature,
    // TSModuleBlock,
    // TSModuleDeclaration,
    // TSNamespaceExportDeclaration,
    // TSNeverKeyword,
    // TSNonNullExpression,
    // TSNullKeyword,
    // TSNumberKeyword,
    // TSObjectKeyword,
    // TSOptionalType,
    // TSParameterProperty,
    // TSParenthesizedType,
    // TSPropertySignature,
    // TSQualifiedName,
    // TSRestType,
    // TSStringKeyword,
    // TSSymbolKeyword,
    // TSThisType,
    // TSTupleType,
    // TSType,
    // TSTypeAliasDeclaration,
    // TSTypeAnnotation,
    // TSTypeAssertion,
    // TSTypeElement,
    // TSTypeLiteral,
    // TSTypeOperator,
    // TSTypeParameter,
    // TSTypeParameterDeclaration,
    // TSTypeParameterInstantiation,
    // TSTypePredicate,
    // TSTypeQuery,
    // TSTypeReference,
    // TSUndefinedKeyword,
    // TSUnionType,
    // TSUnknownKeyword,
    // TSVoidKeyword,
    TaggedTemplateExpression,
    TemplateLiteral,
    ThrowStatement,
    TryStatement,
    // type 隐藏
    // TupleTypeAnnotation,
    // TypeAlias,
    // TypeAnnotation,
    // TypeCastExpression,
    // TypeParameter,
    // TypeParameterDeclaration,
    // TypeParameterInstantiation,
    // TypeofTypeAnnotation,
    UnaryExpression,
    UpdateExpression,
    VariableDeclaration,
    VariableDeclarator,
    WhileStatement,
    WithStatement,
    YieldExpression,
} from '@babel/types';

export default class Differ {
    /**
     * ast 树源数据
     * @type {{}}
     */
    public astOrigin: { [key: string]: BaseNode } = {};
    /**
     * 拉平之后的 ast 树
     * @type {{}}
     */
    public astFlatten: { [key: string]: BaseNode[] } = {};

    execute(code: BaseNode, append?: false) {

    }

    flatten(code: BaseNode, append?: string) {
        const list: BaseNode[] = [];
        this._recursionFlatten(code, list);

        if (append) {
            this.astOrigin[append] = code;
            this.astFlatten[append] = list;
        }

        return list;
    }

    private _recursionFlatten(node: BaseNode, list: BaseNode[]) {
        list.push(node);

        switch (node.type) {
            case 'ArrayExpression':
            case 'ArrayPattern': {
                let elements;

                switch (node.type) {
                    case 'ArrayExpression':
                        elements = (node as ArrayExpression).elements;
                        break;
                    case 'ArrayPattern':
                        elements = (node as ArrayPattern).elements;
                        break;
                }

                for (let i = 0, l = elements.length; i < l; ++i) {
                    if (elements[i]) {
                        this._recursionFlatten(elements[i]!, list);
                    }
                }
                break;
            }
            case 'ArrowFunctionExpression': {
                let params;
                let body;

                params = (node as ArrowFunctionExpression).params;
                body = (node as ArrowFunctionExpression).body;

                for (let i = 0, l = params.length; i < l; ++i) {
                    this._recursionFlatten(params[i], list);
                }

                this._recursionFlatten(body, list);
                break;
            }
            case 'AssignmentPattern':
            case 'Identifier': {
                let decorators;

                switch (node.type) {
                    case 'AssignmentPattern':
                        decorators = (node as AssignmentPattern).decorators;
                        break;
                    case 'Identifier':
                        decorators = (node as Identifier).decorators;
                        break;
                }

                for (let i = 0, l = decorators.length; i < l; ++i) {
                    this._recursionFlatten(decorators[i], list);
                }
                break;
            }
            case 'AwaitExpression':
            case 'ReturnStatement':
            case 'SpreadElement':
            case 'ThrowStatement':
            case 'UnaryExpression':
            case 'UpdateExpression':
            case 'YieldExpression': {
                let argument;

                switch (node.type) {
                    case 'AwaitExpression':
                        argument = (node as AwaitExpression).argument;
                        break;
                    case 'ReturnStatement':
                        argument = (node as ReturnStatement).argument;
                        break;
                    case 'SpreadElement':
                        argument = (node as SpreadElement).argument;
                        break;
                    case 'ThrowStatement':
                        argument = (node as ThrowStatement).argument;
                        break;
                    case 'UnaryExpression':
                        argument = (node as UnaryExpression).argument;
                        break;
                    case 'UpdateExpression':
                        argument = (node as UpdateExpression).argument;
                        break;
                    case 'YieldExpression':
                        argument = (node as YieldExpression).argument;
                        break;
                }

                this._recursionFlatten(argument, list);
                break;
            }
            case 'BlockStatement': {
                let body;
                let directives;

                body = (node as BlockStatement).body;
                directives = (node as BlockStatement).directives;

                for (let i = 0, l = body.length; i < l; ++i) {
                    this._recursionFlatten(body[i], list);
                }

                for (let i = 0, l = directives.length; i < l; ++i) {
                    this._recursionFlatten(directives[i], list);
                }

                break;
            }
            case 'BreakStatement':
            case 'ContinueStatement': {
                let label;

                switch (node.type) {
                    case 'BreakStatement':
                        label = (node as BreakStatement).label;
                        break;
                    case 'ContinueStatement':
                        label = (node as ContinueStatement).label;
                        break;
                }

                this._recursionFlatten(label, list);
                break;
            }
            case 'CallExpression':
            case 'NewExpression':
            case 'OptionalCallExpression': {
                let callee;
                let _arguments;

                switch (node.type) {
                    case 'CallExpression':
                        callee = (node as CallExpression).callee;
                        _arguments = (node as CallExpression).arguments;
                        break;
                    case 'NewExpression':
                        callee = (node as NewExpression).callee;
                        _arguments = (node as NewExpression).arguments;
                        break;
                    case 'OptionalCallExpression':
                        callee = (node as OptionalCallExpression).callee;
                        _arguments = (node as OptionalCallExpression).arguments;
                        break;
                }

                this._recursionFlatten(callee, list);

                for (let i = 0, l = _arguments.length; i < l; ++i) {
                    this._recursionFlatten(_arguments[i], list);
                }

                break;
            }
            case 'CatchClause': {
                let param;
                let body;

                param = (node as CatchClause).param;
                body = (node as CatchClause).body;

                this._recursionFlatten(param, list);
                this._recursionFlatten(body, list);

                break;
            }
            case 'ClassBody': {
                let body;

                body = (node as ClassBody).body;

                for (let i = 0, l = body.length; i < l; ++i) {
                    this._recursionFlatten(body[i], list);
                }

                break;
            }
            case 'ClassDeclaration':
            case 'ClassExpression': {
                let id;
                let superClass;
                let body;
                let decorators;

                switch (node.type) {
                    case 'ClassDeclaration':
                        id = (node as ClassDeclaration).id;
                        superClass = (node as ClassDeclaration).superClass;
                        body = (node as ClassDeclaration).body;
                        decorators = (node as ClassDeclaration).decorators;
                        break;
                    case 'ClassExpression':
                        id = (node as ClassExpression).id;
                        superClass = (node as ClassExpression).superClass;
                        body = (node as ClassExpression).body;
                        decorators = (node as ClassExpression).decorators;
                        break;
                }

                this._recursionFlatten(id, list);
                this._recursionFlatten(superClass, list);
                this._recursionFlatten(body, list);

                for (let i = 0, l = decorators.length; i < l; ++i) {
                    this._recursionFlatten(decorators[i], list);
                }
                break;
            }
            case 'ClassImplements':
            case 'GenericTypeAnnotation':
            case 'PrivateName': {
                let id;

                switch (node.type) {
                    case 'ClassImplements':
                        id = (node as ClassImplements).id;
                        break;
                    case 'GenericTypeAnnotation':
                        id = (node as GenericTypeAnnotation).id;
                        break;
                    case 'PrivateName':
                        id = (node as PrivateName).id;
                        break;
                }

                this._recursionFlatten(id, list);

                break;
            }
            case 'ClassMethod':
            case 'ClassPrivateMethod': {
                let key;
                let params;
                let body;
                let decorators;

                switch (node.type) {
                    case 'ClassMethod':
                        key = (node as ClassMethod).key;
                        params = (node as ClassMethod).params;
                        body = (node as ClassMethod).body;
                        decorators = (node as ClassMethod).decorators;
                        break;
                    case 'ClassPrivateMethod':
                        key = (node as ClassPrivateMethod).key;
                        params = (node as ClassPrivateMethod).params;
                        body = (node as ClassPrivateMethod).body;
                        decorators = (node as ClassPrivateMethod).decorators;
                        break;
                }

                this._recursionFlatten(key, list);

                for (let i = 0, l = params.length; i < l; ++i) {
                    this._recursionFlatten(params[i], list);
                }

                this._recursionFlatten(body, list);

                for (let i = 0, l = decorators.length; i < l; ++i) {
                    this._recursionFlatten(decorators[i], list);
                }

                break;
            }
            case 'ClassPrivateProperty': {
                let key;
                let value;

                key = (node as ClassPrivateProperty).key;
                value = (node as ClassPrivateProperty).value;

                this._recursionFlatten(key, list);
                this._recursionFlatten(value, list);

                break;
            }
            case 'ClassProperty': {
                let key;
                let value;
                let decorators;

                key = (node as ClassProperty).key;
                value = (node as ClassProperty).value;
                decorators = (node as ClassProperty).decorators;

                this._recursionFlatten(key, list);
                this._recursionFlatten(value, list);

                for (let i = 0, l = decorators.length; i < l; ++i) {
                    this._recursionFlatten(decorators[i], list);
                }

                break;
            }
            case 'ConditionalExpression':
            case 'IfStatement': {
                let test;
                let consequent;
                let alternate;

                switch (node.type) {
                    case 'ConditionalExpression':
                        test = (node as ConditionalExpression).test;
                        consequent = (node as ConditionalExpression).consequent;
                        alternate = (node as ConditionalExpression).alternate;
                        break;
                    case 'IfStatement':
                        test = (node as IfStatement).test;
                        consequent = (node as IfStatement).consequent;
                        alternate = (node as IfStatement).alternate;
                        break;
                }

                this._recursionFlatten(test, list);
                this._recursionFlatten(consequent, list);
                this._recursionFlatten(alternate, list);

                break;
            }
            case 'Decorator':
            case 'ExpressionStatement':
            case 'ParenthesizedExpression':
            case 'PipelineTopicExpression': {
                let expression;

                switch (node.type) {
                    case 'Decorator':
                        expression = (node as Decorator).expression;
                        break;
                    case 'ExpressionStatement':
                        expression = (node as ExpressionStatement).expression;
                        break;
                    case 'ParenthesizedExpression':
                        expression = (node as ParenthesizedExpression).expression;
                        break;
                    case 'PipelineTopicExpression':
                        expression = (node as PipelineTopicExpression).expression;
                        break;
                }

                this._recursionFlatten(expression, list);

                break;
            }
            case 'Directive': {
                let value;

                value = (node as Directive).value;

                this._recursionFlatten(value, list);

                break;
            }
            case 'DoExpression': {
                let body;

                body = (node as DoExpression).body;

                this._recursionFlatten(body, list);

                break;
            }
            case 'DoWhileStatement':
            case 'WhileStatement': {
                let test;
                let body;

                switch (node.type) {
                    case 'DoWhileStatement':
                        test = (node as DoWhileStatement).test;
                        body = (node as DoWhileStatement).body;
                        break;
                    case 'WhileStatement':
                        test = (node as WhileStatement).test;
                        body = (node as WhileStatement).body;
                        break;
                }

                this._recursionFlatten(test, list);
                this._recursionFlatten(body, list);

                break;
            }
            case 'ExportAllDeclaration': {
                let source;

                source = (node as ExportAllDeclaration).source;

                this._recursionFlatten(source, list);

                break;
            }
            case 'ExportDefaultDeclaration': {
                let declaration;

                declaration = (node as ExportDefaultDeclaration).declaration;

                this._recursionFlatten(declaration, list);

                break;
            }
            case 'ExportDefaultSpecifier':
            case 'ExportNamespaceSpecifier': {
                let exported;

                switch (node.type) {
                    case 'ExportDefaultSpecifier':
                        exported = (node as ExportDefaultSpecifier).exported;
                        break;
                    case 'ExportNamespaceSpecifier':
                        exported = (node as ExportNamespaceSpecifier).exported;
                        break;
                }

                this._recursionFlatten(exported, list);

                break;
            }
            case 'ExportNamedDeclaration': {
                let declaration;
                let specifiers;
                let source;

                declaration = (node as ExportNamedDeclaration).declaration;
                specifiers = (node as ExportNamedDeclaration).specifiers;
                source = (node as ExportNamedDeclaration).source;

                this._recursionFlatten(declaration, list);

                for (let i = 0, l = specifiers.length; i < l; ++i) {
                    this._recursionFlatten(specifiers[i], list);
                }

                this._recursionFlatten(source, list);

                break;
            }
            case 'ExportSpecifier': {
                let local;
                let exported;

                local = (node as ExportSpecifier).local;
                exported = (node as ExportSpecifier).exported;

                this._recursionFlatten(local, list);
                this._recursionFlatten(exported, list);

                break;
            }
            case 'File': {
                let program;

                program = (node as File).program;

                this._recursionFlatten(program, list);

                break;
            }
            case 'ForInStatement':
            case 'ForOfStatement': {
                let left;
                let right;
                let body;

                switch (node.type) {
                    case 'ForInStatement':
                        left = (node as ForInStatement).left;
                        right = (node as ForInStatement).right;
                        body = (node as ForInStatement).body;
                        break;
                    case 'ForOfStatement':
                        left = (node as ForOfStatement).left;
                        right = (node as ForOfStatement).right;
                        body = (node as ForOfStatement).body;
                        break;
                }

                this._recursionFlatten(left, list);
                this._recursionFlatten(right, list);
                this._recursionFlatten(body, list);

                break;
            }
            case 'ForStatement': {
                let init;
                let test;
                let update;
                let body;

                init = (node as ForStatement).init;
                test = (node as ForStatement).test;
                update = (node as ForStatement).update;
                body = (node as ForStatement).body;

                this._recursionFlatten(init, list);
                this._recursionFlatten(test, list);
                this._recursionFlatten(update, list);
                this._recursionFlatten(body, list);

                break;
            }
            case 'FunctionDeclaration':
            case 'FunctionExpression': {
                let id;
                let params;
                let body;

                switch (node.type) {
                    case 'FunctionDeclaration':
                        id = (node as FunctionDeclaration).id;
                        params = (node as FunctionDeclaration).params;
                        body = (node as FunctionDeclaration).body;
                        break;
                    case 'FunctionExpression':
                        id = (node as FunctionExpression).id;
                        params = (node as FunctionExpression).params;
                        body = (node as FunctionExpression).body;
                        break;
                }

                this._recursionFlatten(id, list);

                for (let i = 0, l = params.length; i < l; ++i) {
                    this._recursionFlatten(params[i], list);
                }

                this._recursionFlatten(body, list);

                break;
            }
            case 'ImportDeclaration': {
                let specifiers;
                let source;

                specifiers = (node as ImportDeclaration).specifiers;
                source = (node as ImportDeclaration).source;

                for (let i = 0, l = specifiers.length; i < l; ++i) {
                    this._recursionFlatten(specifiers[i], list);
                }

                this._recursionFlatten(source, list);

                break;
            }
            case 'ImportDefaultSpecifier':
            case 'ImportNamespaceSpecifier': {
                let local;

                switch (node.type) {
                    case 'ImportDefaultSpecifier':
                        local = (node as ImportDefaultSpecifier).local;
                        break;
                    case 'ImportNamespaceSpecifier':
                        local = (node as ImportNamespaceSpecifier).local;
                        break;
                }

                this._recursionFlatten(local, list);

                break;
            }
            case 'ImportSpecifier': {
                let local;
                let imported;

                local = (node as ImportSpecifier).local;
                imported = (node as ImportSpecifier).imported;

                this._recursionFlatten(local, list);
                this._recursionFlatten(imported, list);

                break;
            }
            case 'LabeledStatement': {
                let label;
                let body;

                label = (node as LabeledStatement).label;
                body = (node as LabeledStatement).body;

                this._recursionFlatten(label, list);
                this._recursionFlatten(body, list);

                break;
            }
            case 'LogicalExpression': {
                let left;
                let right;

                left = (node as LogicalExpression).left;
                right = (node as LogicalExpression).right;

                this._recursionFlatten(left, list);
                this._recursionFlatten(right, list);

                break;
            }
            case 'MemberExpression':
            case 'OptionalMemberExpression': {
                let object;

                switch (node.type) {
                    case 'MemberExpression':
                        object = (node as MemberExpression).object;
                        break;
                    case 'OptionalMemberExpression':
                        object = (node as OptionalMemberExpression).object;
                        break;
                }

                this._recursionFlatten(object, list);

                break;
            }
            case 'MetaProperty': {
                let meta;
                let property;

                meta = (node as MetaProperty).meta;
                property = (node as MetaProperty).property;

                this._recursionFlatten(meta, list);
                this._recursionFlatten(property, list);

                break;
            }
            case 'ObjectExpression': {
                let properties;

                properties = (node as ObjectExpression).properties;

                this._recursionFlatten(properties, list);

                break;
            }
            case 'ObjectMethod': {
                let params;
                let body;
                let decorators;

                params = (node as ObjectMethod).params;
                body = (node as ObjectMethod).body;
                decorators = (node as ObjectMethod).decorators;

                for (let i = 0, l = params.length; i < l; ++i) {
                    this._recursionFlatten(params[i], list);
                }

                this._recursionFlatten(body, list);

                for (let i = 0, l = decorators.length; i < l; ++i) {
                    this._recursionFlatten(decorators[i], list);
                }

                break;
            }
            case 'ObjectPattern': {
                let properties;
                let decorators;

                properties = (node as ObjectPattern).properties;
                decorators = (node as ObjectPattern).decorators;

                for (let i = 0, l = properties.length; i < l; ++i) {
                    this._recursionFlatten(properties[i], list);
                }

                for (let i = 0, l = decorators.length; i < l; ++i) {
                    this._recursionFlatten(decorators[i], list);
                }

                break;
            }
            case 'ObjectProperty': {
                let value;
                let decorators;

                value = (node as ObjectProperty).value;
                decorators = (node as ObjectProperty).decorators;

                this._recursionFlatten(value, list);

                for (let i = 0, l = decorators.length; i < l; ++i) {
                    this._recursionFlatten(decorators[i], list);
                }

                break;
            }
            case 'PipelineBareFunction': {
                let callee;

                callee = (node as PipelineBareFunction).callee;

                this._recursionFlatten(callee, list);

                break;
            }
            case 'Placeholder': {
                let name;

                name = (node as Placeholder).name;

                this._recursionFlatten(name, list);

                break;
            }
            case 'Program': {
                let body;
                let directives;
                let interpreter;

                body = (node as Program).body;
                directives = (node as Program).directives;
                interpreter = (node as Program).interpreter;

                for (let i = 0, l = body.length; i < l; ++i) {
                    this._recursionFlatten(body[i], list);
                }

                for (let i = 0, l = directives.length; i < l; ++i) {
                    this._recursionFlatten(directives[i], list);
                }

                this._recursionFlatten(interpreter, list);

                break;
            }
            case 'QualifiedTypeIdentifier': {
                let id;
                let qualification;

                id = (node as QualifiedTypeIdentifier).id;
                qualification = (node as QualifiedTypeIdentifier).qualification;

                this._recursionFlatten(id, list);
                this._recursionFlatten(qualification, list);

                break;
            }
            case 'RestElement': {
                let argument;
                let decorators;

                switch (node.type) {
                    case 'RestElement':
                        argument = (node as RestElement).argument;
                        decorators = (node as RestElement).decorators;
                        break;
                }

                this._recursionFlatten(argument, list);

                for (let i = 0, l = decorators.length; i < l; ++i) {
                    this._recursionFlatten(decorators[i], list);
                }

                break;
            }
            case 'SequenceExpression': {
                let expressions;

                expressions = (node as SequenceExpression).expressions;

                for (let i = 0, l = expressions.length; i < l; ++i) {
                    this._recursionFlatten(expressions[i], list);
                }

                break;
            }
            case 'SwitchCase': {
                let test;
                let consequent;

                test = (node as SwitchCase).test;
                consequent = (node as SwitchCase).consequent;

                this._recursionFlatten(test, list);

                for (let i = 0, l = consequent.length; i < l; ++i) {
                    this._recursionFlatten(consequent[i], list);
                }

                break;
            }
            case 'SwitchStatement': {
                let discriminant;
                let cases;

                discriminant = (node as SwitchStatement).discriminant;
                cases = (node as SwitchStatement).cases;

                this._recursionFlatten(discriminant, list);

                for (let i = 0, l = cases.length; i < l; ++i) {
                    this._recursionFlatten(cases[i], list);
                }

                break;
            }
            case 'TaggedTemplateExpression': {
                let tag;
                let quasi;

                tag = (node as TaggedTemplateExpression).tag;
                quasi = (node as TaggedTemplateExpression).quasi;

                this._recursionFlatten(tag, list);
                this._recursionFlatten(quasi, list);

                break;
            }
            case 'TemplateLiteral': {
                let quasis;
                let expressions;

                quasis = (node as TemplateLiteral).quasis;
                expressions = (node as TemplateLiteral).expressions;

                for (let i = 0, l = quasis.length; i < l; ++i) {
                    this._recursionFlatten(quasis[i], list);
                }

                for (let i = 0, l = expressions.length; i < l; ++i) {
                    this._recursionFlatten(expressions[i], list);
                }

                break;
            }
            case 'TryStatement': {
                let block;
                let handler;
                let finalizer;

                block = (node as TryStatement).block;
                handler = (node as TryStatement).handler;
                finalizer = (node as TryStatement).finalizer;

                this._recursionFlatten(block, list);
                this._recursionFlatten(handler, list);
                this._recursionFlatten(finalizer, list);

                break;
            }
            case 'VariableDeclaration': {
                let declarations;

                declarations = (node as VariableDeclaration).declarations;

                this._recursionFlatten(declarations, list);

                break;
            }
            case 'VariableDeclarator': {
                let id;
                let init;

                id = (node as VariableDeclarator).id;
                init = (node as VariableDeclarator).init;

                this._recursionFlatten(id, list);
                this._recursionFlatten(init, list);

                break;
            }
            case 'WithStatement': {
                let object;
                let body;

                object = (node as WithStatement).object;
                body = (node as WithStatement).body;

                this._recursionFlatten(object, list);
                this._recursionFlatten(body, list);

                break;
            }
        }

    }
}
