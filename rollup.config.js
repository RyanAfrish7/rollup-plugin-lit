import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';

import pkg from './package.json';

export default {
  input: [
    'src/index.ts',
  ],
  plugins: [
    nodeResolve(),
    typescript({ tsconfig: './tsconfig.json' })
  ],
  external: ['path', 'util'],
  output: [
    { format: 'cjs', file: pkg.main, exports: 'auto', sourcemap: true },
    { format: 'esm', file: pkg.module, sourcemap: true }
  ],
};
