# YY.PKG

常用工具库集合，包括

- [x] 基于 [axios](https://github.com/axios/axios) 的 API 管理模块（[详细](./docs/api.md)）
- [x] 去抖 `debounce`
- [x] 节流 `throttle`
- [x] `sleep`

## 安装

```sh
npm i yypkg

# or

yarn add yypkg
```

## 使用

### 简单使用

```js
import { sleep } from 'yypkg'
```

### Tree-Shaking

```js
import sleep from 'yypkg/sleep'
```

通过该方式引入模块，可大大减少引用体积，但注意，需要把安装后的 node_modules/yypkg 加入 工作流 Babel 编译 include 范围内。

若你正在使用 [LegoFlow](https://legoflow.com/) 工作流，可配置在 `webpack.include.exnext` 选项内

```yml
webpack:
  include:
    esnext:
      - ./node_modules/yypkg
```

## 许可

[MIT](./LICENSE)
