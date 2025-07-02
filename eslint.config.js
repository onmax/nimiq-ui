import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  formatters: true,
  vue: true,
  pnpmCatalogs: true,
  ignores: [
    'packages/nimiq-icons/src/**/*',
    'packages/nimiq-css/src/css/colors.css',
    '**/dist/**',
    '**/build/**',
    '**/.vitepress/cache/**',
    '**/.vitepress/dist/**',
    '**/node_modules/**',
    '**/.git/**',
    '**/.figma-cache/**',
    '**/coverage/**',
    '**/.nx/**',
    '**/.netlify/**',
    '**/tmp/**',
    '**/out-tsc/**',
  ],
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
  rules: {
    // Fix for vue/object-property-newline rule configuration
    'vue/object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
  },
})
