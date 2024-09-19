// vite.config.ts
import { env } from "node:process";
import { fileURLToPath, URL } from "node:url";
import vue from "file:///home/maxi/nimiq/ui/node_modules/.pnpm/@vitejs+plugin-vue@5.1.3_vite@5.4.5_@types+node@22.5.5__vue@3.5.6_typescript@5.6.2_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import UnoCSS from "file:///home/maxi/nimiq/ui/node_modules/.pnpm/unocss@0.62.4_postcss@8.4.47_rollup@4.21.3_vite@5.4.5_@types+node@22.5.5_/node_modules/unocss/dist/vite.mjs";
import Markdown from "file:///home/maxi/nimiq/ui/node_modules/.pnpm/unplugin-vue-markdown@0.26.2_rollup@4.21.3_vite@5.4.5_@types+node@22.5.5__webpack-sources@3.2.3/node_modules/unplugin-vue-markdown/dist/vite.js";
import { defineConfig } from "file:///home/maxi/nimiq/ui/node_modules/.pnpm/vite@5.4.5_@types+node@22.5.5/node_modules/vite/dist/node/index.js";
var __vite_injected_original_import_meta_url = "file:///home/maxi/nimiq/ui/apps/preview/vite.config.ts";
var vite_config_default = defineConfig({
  base: env.BASE_URL,
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    UnoCSS(),
    Markdown({
      /* options */
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9tYXhpL25pbWlxL3VpL2FwcHMvcHJldmlld1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvbWF4aS9uaW1pcS91aS9hcHBzL3ByZXZpZXcvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvbWF4aS9uaW1pcS91aS9hcHBzL3ByZXZpZXcvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBlbnYgfSBmcm9tICdub2RlOnByb2Nlc3MnXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSdcblxuaW1wb3J0IE1hcmtkb3duIGZyb20gJ3VucGx1Z2luLXZ1ZS1tYXJrZG93bi92aXRlJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJhc2U6IGVudi5CQVNFX1VSTCxcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSh7XG4gICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwubWQkL10sXG4gICAgfSksXG4gICAgVW5vQ1NTKCksXG4gICAgTWFya2Rvd24oeyAvKiBvcHRpb25zICovIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgIH0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrUixTQUFTLFdBQVc7QUFDdFMsU0FBUyxlQUFlLFdBQVc7QUFDbkMsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUVuQixPQUFPLGNBQWM7QUFDckIsU0FBUyxvQkFBb0I7QUFOMkksSUFBTSwyQ0FBMkM7QUFTek4sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTSxJQUFJO0FBQUEsRUFDVixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsTUFDRixTQUFTLENBQUMsVUFBVSxPQUFPO0FBQUEsSUFDN0IsQ0FBQztBQUFBLElBQ0QsT0FBTztBQUFBLElBQ1AsU0FBUztBQUFBO0FBQUEsSUFBZ0IsQ0FBQztBQUFBLEVBQzVCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
