import path from 'path'
import glob from 'glob'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

const ENV = process.env.NODE_ENV

let files = glob.sync('core/*.js')

ENV === 'test' && (files = [...glob.sync('test/case/*.js'), ...files])

const defaultConfig = {
  plugins: [
    babel({
      exclude: './node_modules/**',
      runtimeHelpers: true
    }),
    uglify(),
    resolve(),
    commonjs()
  ]
}

export default files.map(input => {
  const basename = path.basename(input)
  const dist = ENV === 'test' ? (/test/.test(input) ? 'test' : 'test/core') : 'dist'

  return {
    input,
    output: {
      file: `${dist}/${basename}`,
      format: 'cjs'
    },
    ...defaultConfig
  }
})
