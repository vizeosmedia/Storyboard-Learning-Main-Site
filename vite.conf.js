const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        about: './about-us.html',
        contact: './contact.html',
        // ...
        // List all files you want in your build
      }
    }
  }
})