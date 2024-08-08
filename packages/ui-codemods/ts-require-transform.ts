import { EsbuildPhoenix } from '@xn-sakina/phoenix'

// https://npm.io/package/@xn-sakina/phoenix
// Implemented esbuild hook require() to support import `.ts` files
new EsbuildPhoenix({
  target: 'es2019'
})