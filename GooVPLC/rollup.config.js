import pkg from './package.json' with { type: 'json' };
import { builtinModules } from 'node:module';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const external = [
    ...builtinModules,
    'node-snap7',
];
export default { // main lib
    input: './src/index.js',
    output: [{
        file: pkg.exports['.'],
        format: 'es',
    }, {
        file: pkg.exports['./cjs'],
        format: 'cjs',
    }],
    plugins: [
        resolve({
            preferBuiltins: true,
        }),
        commonjs(),
    ],
    external,
}