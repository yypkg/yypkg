const path = require('path')
const glob = require('glob')
const fs = require('fs-extra')
const del = require('del')
const shell = require('shelljs')

const rootPath = path.resolve(__dirname, '../')
const corePath = path.resolve(rootPath, './core')
const files = glob.sync(path.resolve(corePath, './**/*.js'))

const dist = path.resolve(rootPath, './release')

del.sync(dist)

fs.mkdirSync(dist)

for (let file of files) {
  const distFile = file.replace(corePath, dist)
  const distFolder = path.dirname(distFile)

  !fs.existsSync(distFolder) && fs.mkdirSync(distFolder)

  fs.copyFileSync(file, distFile)
}

fs.copyFileSync(path.resolve(rootPath, 'package.json'), path.resolve(dist, 'package.json'))

if (shell.exec('webpack --config ./scripts/webpack.config.js').code === 0) {
  shell.cd(dist)

  shell.exec('npm publish')
}
