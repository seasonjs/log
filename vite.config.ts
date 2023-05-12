import {defineConfig} from "vite";
import {resolve} from "node:path"
import {builtinModules} from 'node:module'

export default defineConfig(() => {
  const builtins = builtinModules.filter(e => !e.startsWith('_'));
  builtins.push(...builtins.map(m => `node:${m}`))
  return {
    build: {
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: {
          log: resolve(__dirname, 'src/index.ts'),
          'node/log': resolve(__dirname, 'src/log/node/loggerService.ts')
        },
      },
      rollupOptions: {
        output: {
          globals: {
            log: 'log',
          },
        },
        external: builtins
      },
    },
  }
})
