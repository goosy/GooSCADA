import pkg from './package.json' with { type: 'json' };
import { builtinModules } from 'node:module';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: './index.js',
    output: [{
        banner: '#!/usr/bin/env node',
        file: pkg.exports['.'],
        format: 'es',
    }, {
        banner: '#!/usr/bin/env node',
        file: pkg.exports['./cjs'],
        format: 'cjs',
    }],
    plugins: [
        resolve({
            preferBuiltins: true,
        }), 
        commonjs(), 
    ],
    external: builtinModules,
}
