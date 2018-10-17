const path = require('path')

process.env.test = true

const rootPath = path.resolve(__dirname, '../')

module.exports = {
  entry: path.resolve(rootPath, './core/index.js'),
  output: {
    path: path.resolve(rootPath, './tests'),
    filename: 'yypkg.js',
    libraryTarget: 'umd',
    library: 'YYPKG',
    libraryExport: 'default'
  },
  mode: 'development',
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
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  }
}
