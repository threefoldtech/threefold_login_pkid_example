import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

import mkcert from 'vite-plugin-mkcert';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), mkcert()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src'),
            process: 'process/browser',
            stream: 'stream-browserify',
        },
    },
    server: {
        https: true,
    },
});
