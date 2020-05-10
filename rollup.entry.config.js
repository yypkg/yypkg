import typescript from 'rollup-plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import banner from './shell/banner'

export default {
  input: 'core/index.ts',
  plugins: [
    typescript({
      exclude: 'node_modules/**',
      typescript: require('typescript')
    }),
    terser()
  ],
  output: [
    {
      format: 'umd',
      name: 'YYPKG',
      compact: true,
      banner,
      file: 'release/yypkg.min.js'
    }
  ]
}
