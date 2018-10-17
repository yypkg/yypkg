const path = require('path')
const browserSync = require('browser-sync')

const BrowserSyncOptions = {
  server: {
    baseDir: path.resolve(__dirname, '../tests'),
    directory: true
  },
  https: false,
  ui: false,
  notify: false,
  ghostMode: false,
  port: 8080,
  open: false,
  timestamps: true,
  watch: true
}

browserSync(BrowserSyncOptions)
