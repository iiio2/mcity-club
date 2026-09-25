// eslint.config.mjs
import antfu from '@antfu/eslint-config'
import reactHooks from 'eslint-plugin-react-hooks'

export default antfu(
  {
    react: true,
    ignores: ['README.md', 'pnpm-lock.yaml'],
  },
  reactHooks.configs.flat.recommended,
)
