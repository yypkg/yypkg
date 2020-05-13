/**
 * @doc: https://github.com/rollup/plugins
 * @doc: https://github.com/alfredosalzillo/rollup-plugin-multi-input
 */

import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import multiInput from 'rollup-plugin-multi-input'
import { terser } from 'rollup-plugin-terser'

export default {
  input: ['core/**/*.ts', '!core/**/*.d.ts'],
  plugins: [
    typescript({
      target: 'es5',
      lib: [
        'es6',
        'dom'
      ],
      exclude: 'node_modules/**'
    }),
    multiInput(
      { relative: 'core/' }
    ),
    resolve(),
    commonjs(),
    babel({
      extensions: ['ts'],
      babelHelpers: 'runtime'
    }),
    terser()
  ],
  output: {
    format: 'cjs',
    dir: 'release'
  },
  external: [
    'axios',
    'path-to-regexp'
  ]
}
