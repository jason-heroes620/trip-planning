import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        // laravel(['resources/css/app.css', 'resources/js/app.js']),
        react(),
    ],
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
});
