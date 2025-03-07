import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  formatters: true,
  vue: true,
}, {
  files: ['**/**.ts'],
  rules: {
    'ts/explicit-function-return-type': 'off',
  },
})
