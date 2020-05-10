/**
 * @doc: https://github.com/rollup/rollup-plugin-typescript
 * @doc: https://github.com/alfredosalzillo/rollup-plugin-multi-input
 */

import typescript from 'rollup-plugin-typescript'
import multiInput from 'rollup-plugin-multi-input'
import { terser } from 'rollup-plugin-terser'

export default {
  input: ['core/**/*.ts', '!core/**/*.d.ts'],
  plugins: [
    typescript({
      baseUrl: '.',
      paths: {
        '*': ['./core/*']
      },
      target: 'es5',
      lib: [
        'dom',
        'dom.iterable',
        'esnext'
      ],
      exclude: 'node_modules/**',
      typescript: require('typescript')
    }),
    multiInput(
      { relative: 'core/' }
    ),
    terser()
  ],
  output: {
    format: 'cjs',
    dir: 'release'
  },
}
