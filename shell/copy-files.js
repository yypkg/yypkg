const path = require('path')
const fs = require('fs-extra')

const rootPath = path.resolve(__dirname, '../')
const docsPath = path.resolve(rootPath, './docs')

// 从 docs 目录拷贝 md 文件到根目录
const movefile = ['README.md', 'CHANGELOG.md']
for (let file of movefile) {
  fs.copyFileSync(path.resolve(docsPath, file), path.resolve(rootPath, file))
}

