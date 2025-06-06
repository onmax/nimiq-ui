import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  formatters: true,
  vue: true,
  pnpmCatalogs: true,
  ignores: ['packages/nimiq-icons/src/**/*', 'packages/nimiq-css/src/css/colors.css'],
}, {
  files: ['**/**.ts'],
  rules: {
    'ts/explicit-function-return-type': 'off',
  },
}, {
  files: ['packages/nimiq-vitepress-theme/src/components/NqCard.vue'],
  rules: {
    // https://github.com/vuejs/eslint-plugin-vue/issues/1577
    'import/first': 'off',
  },
}, {
  // rules: {
  //   curly: ["error", "multi-or-nest"]
  // }
})
