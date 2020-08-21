// note  to self: wanted to switch rollup-plugin-typescript2 with @rollup/plugin-typescript
// but: https://stackoverflow.com/questions/63441311/rollup-esm-and-umd-builds-with-typescript-plugin-and-declarations-not-possible
import typescript from 'rollup-plugin-typescript2'
import pkg from '../package.json'
export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: pkg.name,
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true
    },
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      useTsconfigDeclarationDir: true
    }),
  ],
} 