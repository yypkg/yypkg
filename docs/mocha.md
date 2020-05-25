# Mocha

Mocha 是一个出名的 **测试框架**，对于一些前端 Web 项目，我们可以通过 Mocha 进行基本的 BDD 测试

## 简单使用

```js
import mocha from 'yypkg/mocha'

function add (x, y) {
  return x + y
}

mocha(async function () {
  const { expect } = chai

  describe('加法函数的测试', () => {
    it('1 加 1 应该等于 2', () => {
      expect(add(1, 1)).to.be.equal(2)
    })
  })
})
```

## 教程

[更多关于 Mocha 的使用](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)
