# 加入开发

## 项目初始化安装依赖


```sh
$ yarn install
```


## Step 1：开发项目

```sh
$ yarn start
```

1. 开发须在 `dev` 分支下进行，开发测试通过、发布到 npm 并更新文档后，合并到 `master` 分支；
2. yypkg 源码在 `core` 目录下，新增模块请注意要在入口文件 `index.ts` export 对应的方法；


## Step 2：更新文档

在 `docs` 目录下使用 `md` 编写文档，使用 `vuepress` 编译成 `html`。请注意以下事项：

1. 每次代码变动必须编写更新日志 `CHANGELOG.md`；
2. `README.md` 与 `CHANGELOG.md` 内的链接请使用绝对路径；

```sh
$ yarn docs:dev
```


## Step 3：编译打包

1. 如代码有变动，先修改 package.json 版本号；
2. 执行以下命令编译打包；

将使用 rollup 将 TypeScript 模块编译打包到 `release` 目录，并生成 TypeScript 声明文件；
自动拷贝 `docs/README.md`、`docs/CHANGELOG.md` 和 `package.json` 到 `release` 目录;
自动拷贝 `docs/README.md`、`docs/CHANGELOG.md` 到根目录;

```sh
$ yarn release
```


## Step 4：发布到 npm

登录 npm 平台，并发布；

```sh
$ npm login
$ cd ./release
$ npm publish
```


## Step 5：发布文档

发布文档到 https://yypkg.github.io/，发布前需要[配置Github SSH](https://www.google.com/search?q=%E9%85%8D%E7%BD%AEgithub+ssh)；
并自动拷贝 `docs/README.md`、`docs/CHANGELOG.md` 到根目录;

```sh
$ yarn docs:publish
```

## Step 6：提交合并git变动

1. 提交 git 变动到 Github；
2. 合并 `dev` 分支到 `master` 分支；


## 工作流文档

[LegoFlow v3.0](https://legoflow.com/v3/)


## 约定规则

* 模块文件名统一使用小写（专有名词也不例外），多个单词使用 `-` 连词符号连接；
* 使用 ES6 语法；
* 模块头部统一使用以下注释格式；

**文件注释格式示例**

```js
/**
 * 函数节流
 *
 * @param {Function} fun 回调函数
 * @param {Number} time 每隔多长时间执行一次
 * @return {Function}
 */
````
