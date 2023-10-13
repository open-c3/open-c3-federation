import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    envPrefix: 'REACT_APP_', // 环境变量前缀
    envDir: './env', // 环境变量目录
    resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss', '.css', 'less'],
        alias: {
            '@': path.resolve(__dirname, 'src'), // 源文件根目录
            '@tests': path.resolve(__dirname, 'tests'), // 测试文件根目录
            '@config': path.resolve(__dirname, 'src/config') // 配置文件根目录
        }
    },
    server: {
        port: 9090, // 指定端口号
        open: true, // 启动服务时自动打开浏览器
        proxy: {
            // 测试环境
            // '/api': 'http://10.60.77.101:57289', // api代理路径
            // 正式环境
            '/api':'https://open-c3-federation.cmcloud.org', // api代理路径
            '/mock/api': 'http://127.0.0.1:4523/mock/797249' // mock代理路径
        }
    },

    // 构建
    build: {
        /**
         * @chunkSizeWarningLimit
         * @type number
         * @default 500
         * @description 设置最终构建的打包文件大小上限，超过此大小会在控制台中显示警告信息
         */
        chunkSizeWarningLimit: 1500,
        /**
         * @sourcemap
         * @type boolean
         * @default modules
         * @description 设置最终构建的浏览器兼容目标
         */
        sourcemap: false, // 生产环境是否生成 source map 文件
        /**
         * @target
         * @type string | string[]
         * @default modules
         * @description 设置最终构建的浏览器兼容目标
         */
        target: 'es2015',
        /**
         * @outDir
         * @type string
         * @default dist
         * @description 指定输出路径（相对于 项目根目录）
         */
        outDir: 'dist',
        /**
         * @assetsDir
         * @type string
         * @default assets
         * @description 指定生成静态资源（js、css、img、fonts）的存放路径（相对于 build.outDir）。
         */
        assetsDir: 'assets',
        /**
         * @cssCodeSplit
         * @type boolean
         * @default true
         * @description 启用/禁用 CSS 代码拆分。如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
         */
        cssCodeSplit: true,
        /**
         * @rollupOptions
         * @type RollupOptions
         * @description 自定义底层的 Rollup 打包配置。这与从 Rollup 配置文件导出的选项相同，并将与 Vite 的内部 Rollup 选项合并。
         */
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: [],
            // 指定文件输出的配置
            output: {
                chunkFileNames: `assets/js/[name]-[hash].js`,
                entryFileNames: `assets/js/[name]-[hash].js`,
                assetFileNames: `assets/[ext]/[name]-[hash].[ext]`,
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor'; //代码分割为第三方包
                    }
                }
            }
        },
        terserOptions: {
            // 打包后移除console和注释
            compress: {
                keep_infinity: true,
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info']
            }
        },
        /**
         * minify 压缩格式
         * @param minify boolean | 'terser' | 'esbuild'
         */
        minify: 'terser'
    },
    css: {
        preprocessorOptions: {
            less: {
                // 支持内联 JavaScript
                javascriptEnabled: true,
                // 重写 less 变量，定制样式
                modifyVars: {
                    '@primary-color': '#1890ff', // 全局主色
                    '@link-color': '#1890ff', // 链接色
                    '@success-color': '#52c41a', // 成功色
                    '@warning-color': '#faad14', // 警告色
                    '@error-color': '#f5222d', // 错误色
                    '@font-size-base': '12px', // 主字号
                    '@heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色
                    '@text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
                    '@text-color-secondary': 'rgba(0, 0, 0, 0.45)', // 次文本色
                    '@disabled-color': 'rgba(0, 0, 0, 0.25)', // 失效色
                    '@border-radius-base': '2px', // 组件/浮层圆角
                    '@border-color-base': '#d9d9d9', // 边框色
                    '@box-shadow-base':
                        '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),0 9px 28px 8px rgba(0, 0, 0, 0.05)'
                },
                // 设置本地的css名称 增强可读性
                generateScopedName: process.env.NODE_ENV === 'development' ? `[name]_[local]` : `_[local]-[hash:5]`,
                scopeBehaviour: 'local'
            }
        }
    },
    plugins: [reactRefresh(), svgr()]
});
