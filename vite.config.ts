import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/site/get": {
                target: 'http://localhost:2333/',
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\//, '')
            }
        }
    }
})
