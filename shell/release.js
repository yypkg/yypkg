const path = require('path')
const fs = require('fs-extra')
const del = require('del')
const shell = require('shelljs')

const rootPath = path.resolve(__dirname, '../')
const releasePath = path.resolve(rootPath, './release')
del.sync(releasePath)
fs.mkdirSync(releasePath)

const rollupCommand = 'rollup -c' // rollup 打包 ts 模块
const rollupEntryCommand = 'rollup --config rollup.entry.config.js' // rollup 打包 umd 主入口文件
const declarationCommand = 'tsc -p tsconfig.json -d --emitDeclarationOnly --declarationDir ./release' // tsc 生成声明文件
const releaseCommand = `${rollupCommand} && ${rollupEntryCommand} && ${declarationCommand}`
if (shell.exec(releaseCommand).code === 0) {
  console.log('\x1b[32m%s\x1b[0m', '>>> 打包完成 🎉🎉🎉 <<<')
}
