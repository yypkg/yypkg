# 加入开发

## 项目初始化安装依赖

```sh
$ yarn install
```

## 开发项目

```sh
$ yarn start
```

## 编译打包

使用 rollup 将 TypeScript 模块编译打包到 release 目录，并生成 TypeScript 声明文件

```sh
$ yarn pkg:release
```

## 编写文档

在 `docs` 目录下使用 `md` 编写文档，使用 `vuepress` 编译成 `html`

```sh
$ yarn docs:dev
```

## 发布文档

文档编写完成后，发布到 https://yypkg.github.io/（需要配置GitHub SSH）

```sh
$ yarn docs:publish
```

## 单元测试

使用 jest 编写测试用例

```sh
$ yarn test
```

## 发布

1. 修改 package.json 版本号；
2. 编写更新日志 CHANGELOG.md；
3. 登录 npm 平台 `npm login`；
4. 发布到 npm 平台 `yarn pkg:publish`；

```sh
$ npm login
$ yarn pkg:publish
```

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
