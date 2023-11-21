import antfu from '@antfu/eslint-config'

export default antfu({
  files: ['**/*.ts'],
  rules: {
    'no-console': 'off',
  },
})
