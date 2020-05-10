const path = require('path')
const fs = require('fs-extra')
const shell = require('shelljs')

const rootPath = path.resolve(__dirname, '../')
const releasePath = path.resolve(rootPath, './release')

// move README
const movefile = ['README.md', 'CHANGELOG.md']
for (let file of movefile) {
  fs.copyFileSync(path.resolve(rootPath, file), path.resolve(releasePath, file))
}

shell.cd(releasePath)
console.log('\x1b[32m%s\x1b[0m', '>>> 发布完成 🎉🎉🎉 <<<')
// if (shell.exec('npm publish').code === 0) {
//   console.log('\x1b[32m%s\x1b[0m', '>>> 发布完成 🎉🎉🎉 <<<')
// }
