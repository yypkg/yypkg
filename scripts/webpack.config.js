const path = require('path')
const webpack = require('webpack')
const moment = require('moment')

const { version } = require('../package.json')

const banner =
`yypkg.min.js

Version: ${version}
Time: ${moment().format('YYYY-MM-DD HH:mm')}
Document: https://github.com/yypkg/yypkg
(c) 2019 YY.PKG
Released under the MIT License.`

const rootPath = path.resolve(__dirname, '../')

module.exports = (env = {}) => {
  env.test && (process.env.test = true)

  let options = {
    entry: path.resolve(rootPath, './core/index.js'),
    output: {
      path: path.resolve(rootPath, env.test ? 'tests' : 'release'),
      filename: `yypkg${env.test ? '' : '.min'}.js`,
      libraryTarget: 'umd',
      library: 'YYPKG',
      libraryExport: 'default'
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            'babel-loader'
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.ts']
    },
    plugins: [
      new webpack.BannerPlugin(banner)
    ]
  }

  if (env.test) {
    options = Object.assign(options, {
      mode: 'development',
      watch: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/
      }
    })
  }

  return options
}
