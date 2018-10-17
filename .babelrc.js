const options = {
  presets: [
    ['@babel/preset-env', { modules: 'commonjs', targets: { browsers: [ 'android >= 4' ] } }]
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ]
}

process.env.test && options.plugins.push(['@babel/plugin-transform-runtime', { corejs: 2, helpers: false }])

module.exports = options
