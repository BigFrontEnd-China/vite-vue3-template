import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let config = {}
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '')
  // 情景模式配置
  if (command === 'serve') {
    // dev 独有配置
    config = {
      base: '/'
    }
  } else {
    // build 独有配置
    config = {
      base: env.VITE_APP_BASE, // 生产环境基础路径必须前后都带斜杠否则打包会出现警告提示
      build: {
        assetsInlineLimit: 1024,
        cssCodeSplit: true,
        chunkSizeWarningLimit: 1000,
        minify: 'terser', // 不设置此项drop_console不生效
        terserOptions: {
          // 打包编译清除控制台输出及debugger
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        },
        outDir: env.VITE_APP_DIR,
        assetsDir: env.VITE_APP_ASSETS,
        rollupOptions: {
          // treeshake: true, // "smallest" | "safest" | "recommended" | Default: true
          input: './index.html',
          output: {
            // compact: true, // 这个选项在绑定预先最小化的代码时很有用
            // manualChunks(id) {
            //   if (id.includes('node_modules')) {
            //     return 'vendor';
            //   }
            // },
            entryFileNames: `${env.VITE_APP_ASSETS}/js/entry[hash].js`, // [name]-[hash] 入口文件
            chunkFileNames: `${env.VITE_APP_ASSETS}/js/chunk[hash].js`, // [name]-[hash] 共享文件
            assetFileNames: (assetInfo) => {
              if (assetInfo.name.endsWith('.css')) {
                return `${env.VITE_APP_ASSETS}/assets/css/[name]-[hash].[ext]`
              } else if (
                assetInfo.name.endsWith('.eot') ||
                assetInfo.name.endsWith('.ttf') ||
                assetInfo.name.endsWith('.woff')
              ) {
                return `${env.VITE_APP_ASSETS}/assets/iconfont/[name]-[hash].[ext]`
              } else if (
                assetInfo.name.endsWith('.jpg') ||
                assetInfo.name.endsWith('.png') ||
                assetInfo.name.endsWith('.jpeg') ||
                assetInfo.name.endsWith('.gif') ||
                assetInfo.name.endsWith('.bmp') ||
                assetInfo.name.endsWith('.svg')
              ) {
                return `${env.VITE_APP_ASSETS}/assets/images/[name]-[hash].[ext]`
              } else {
                return `${env.VITE_APP_ASSETS}/assets/[name]-[hash].[ext]`
              }
            } // [name]-[hash] 静态资源
          }
        },
        brotliSize: false // 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      }
    }
  }
  return {
    ...config, // 合并开发生产环境配置
    css: {
      charset: false,
      postcss: {},
      preprocessorOptions: {
        less: {
          math: 'parens-division'
        }
      }
    },
    resolve: {
      extensions: ['.js', '.jsx', '.vue', '.json', '.less'], // 处理文件扩展名
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        // eslint-disable-next-line no-undef
        iconDirs: [path.resolve(process.cwd(), 'src/components/svgIcons/src')],
        // 指定symbolId格式
        symbolId: 'icon-[name]'
      })
    ],
    optimizeDeps: {
      // 强制预构建链接的包, 使用的第三方包添加到此避免Internal server error
      include: []
    },
    // 代理配置
    server: {
      port: 8888,
      strictPort: true,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8888',
          changeOrigin: true,
          secure: false,
          ws: true
        }
      }
    },
    preview: {
      port: 9999
    }
  }
})
