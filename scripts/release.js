const path = require('path')
const glob = require('glob')
const fs = require('fs-extra')
const del = require('del')
const shell = require('shelljs')
const babel = require('@babel/core')

const rootPath = path.resolve(__dirname, '../')
const corePath = path.resolve(rootPath, './core')
const files = glob.sync(path.resolve(corePath, './**/*.js'))

const dist = path.resolve(rootPath, './release')

del.sync(dist)

fs.mkdirSync(dist)

for (let file of files) {
  const fileContent = fs.readFileSync(file, 'utf8')
  const distFile = file.replace(corePath, dist)

  const distFolder = path.dirname(distFile)

  !fs.existsSync(distFolder) && fs.mkdirSync(distFolder)

  const { code } = babel.transformSync(fileContent, {
    configFile: path.resolve(rootPath, '.babelrc.js'),
    root: rootPath
  })

  fs.writeFileSync(distFile, code, 'utf8')
}

fs.copyFileSync(path.resolve(rootPath, 'package.json'), path.resolve(dist, 'package.json'))

shell.cd(dist)

shell.exec('npm publish') === 0 && console.log('>>> Finish <<<')
