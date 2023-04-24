import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import postcssNesting from 'postcss-nesting';

export default defineConfig({
    plugins: [dts({ insertTypesEntry: true })],
    css: {
        postcss: {
            plugins: [postcssNesting],
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'lib/index.ts'),
            name: 'CtrlPanel',
            formats: ['es', 'umd'],
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            output: {
                exports: 'named',
                assetFileNames(assetInfo) {
                    if (assetInfo.name === 'style.css') {
                        return 'theme.css';
                    }
                    return assetInfo.name;
                },
            },
        },
    },
});
