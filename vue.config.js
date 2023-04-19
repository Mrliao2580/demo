/*
 * @Author: lzh
 * @Date: 2023-04-19 14:31:26
 * @LastEditors: lzh
 * @LastEditTime: 2023-04-19 17:13:43
 * @Description: file content
 */
const { defineConfig } = require('@vue/cli-service');
// 解决vue项目运行中出现以下报错，分析原因可能是node内存太小
require('events').EventEmitter.defaultMaxListeners = 0; 
let target_ = {
  target: process.env.VUE_APP_BASE_URL,
  changeOrigin: true,
};
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 9601,
    open: false,
    // 配置代理
    proxy: {
      '/ricepon-restaurant': target_,
      '/ricepon-cloud-gsa': target_,
      '/ricepon-member': target_,
      '/ricepon-system': target_,
      '/logan-web': target_,
      '/ricepon-activities': target_,
      '/ricepon-report': target_,
      '/member-web': target_,
    },
  },
  outputDir: process.env.VUE_APP_OUTPUT_DIR || 'dist', // 打包輸出地址
  assetsDir: 'static', // 資源文件夾
  publicPath: process.env.VUE_APP_PUBLIC_PATH, // 項目地址
  productionSourceMap: true,
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'demo',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
  },
});