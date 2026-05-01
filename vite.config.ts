import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
  ],
  test: {
    include: ['**/src/**/*.(spec|test).(js|jsx|ts|tsx)', '!tests/**/*'],
  },
})
