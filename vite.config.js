export default {
    base: '/MYW_Game/', // Ensures relative paths work (good for GitHub Pages/Netlify)
    build: {
        assetsInlineLimit: 0, // Ensures all assets are kept as files
        rollupOptions: {
            output: {
                // manualChunks removed to avoid build error with non-npm phaser
            }
        }
    }
};