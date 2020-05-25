const path = require('path')
const fs = require('fs-extra')
const del = require('del')
const shell = require('shelljs')

const rootPath = path.resolve(__dirname, '../')
const releasePath = path.resolve(rootPath, './release')
del.sync(releasePath)
fs.mkdirSync(releasePath)

// move files
const movefile = ['package.json', 'README.md', 'CHANGELOG.md']
for (let file of movefile) {
  fs.copyFileSync(path.resolve(rootPath, file), path.resolve(releasePath, file))
}
// reset package.json
const packageJson = path.resolve(releasePath, 'package.json')
const packageJsonData = fs.readJSONSync(packageJson)

delete packageJsonData.private
delete packageJsonData.devDependencies
delete packageJsonData.scripts
fs.writeFileSync(path.resolve(releasePath, 'package.json'), JSON.stringify(packageJsonData, null, 2), 'utf8')

const rollupCommand = 'rollup -c' // rollup 打包 ts 模块
const declarationCommand = 'tsc -p tsconfig.json -d --emitDeclarationOnly --declarationDir ./release' // tsc 打包
const releaseCommand = `${rollupCommand} && ${declarationCommand}`
if (shell.exec(releaseCommand).code === 0) {
  shell.cd(releasePath)
  // install dependencies
  if (shell.exec('yarn install --production --pure-lockfile').code === 0) {
    console.log('\x1b[32m%s\x1b[0m', '>>> 打包完成 🎉🎉🎉 <<<')
  }
}
