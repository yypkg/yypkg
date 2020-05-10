# yypkg

## 项目初始化安装依赖

```sh
$ yarn install
```

## 开发项目

```sh
$ yarn start
```

## 编译打包

使用 rollup 将 TypeScript 模块编译打包到 release 目录，并生成 TypeScript 声明文件和 umd 模块风格的主文件 `yypkg.min.js`

```sh
$ yarn release
```

## 单元测试

使用 jest 编写测试用例

```sh
$ yarn test
```

## 发布

1. 修改 package.json 版本号；
2. 编写更新日志 CHANGELOG.md；
3. 登录 npm 平台 `yarn login`；
4. 发布到 npm 平台 `yarn run publish`（注意：不是 `yarn publish`）；

```sh
$ yarn login // 登录
$ yarn run publish // 拷贝 package.json 和 CHANGELOG.md 到 release 目录，并发布到 npm 平台
```

## 工作流文档

[LegoFlow v3.0](https://legoflow.com/v3/)
