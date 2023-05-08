import {defineConfig} from "vite";
import {resolve} from "node:path"

export default defineConfig(() => {
  return {
    build: {
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'log',
        // the proper extensions will be added
        fileName: 'log',
      },
      rollupOptions: {
        output: {
          globals: {
            log: 'log',
          },
        },
      },
    },
  }
})
