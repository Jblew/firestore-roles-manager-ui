import commonjs from 'rollup-plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from 'rollup-plugin-buble'; // Transpile/polyfill with reasonable browser support
import typescript from 'rollup-plugin-typescript2'
import css from 'rollup-plugin-css-only';
import sass from 'rollup-plugin-sass';

export default {
    input: 'src/lib-entrypoint.ts', // Path relative to package.json
    output: {
        name: 'firestore-roles-manager-ui',
        exports: 'named',
    },
    external: ['vue', 'vuetify'],
    plugins: [
        vue({
            css: false,
            compileTemplate: true, // Explicitly convert template to render function
        }),
        sass({
            output: true,
        }),
        css(),
        typescript({
            objectHashIgnoreUnknownHack: true,
            tsconfigOverride: {
                experimentalDecorators: true,
                module: 'es2015'
            },
        }),
        // commonjs(),
        
    ],
};