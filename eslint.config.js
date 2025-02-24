import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
}, {
  files: ['packages/nimiq-icons/**/*.ts'],
  rules: {
    'antfu/no-top-level-await': 'off',
    'no-console': 'off',
  },
})
