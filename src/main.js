import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// 清除默认样式
import '@/assets/css/default.css';
import  util from "@/js/util/util.js"
import  Db from "@/js/util/db"

import vConsole from "vconsole";
if (location.origin.indexOf('192.168') > -1) {
  // 加載 vConsole
  new vConsole();
}

// 開啟數據庫
let cdb = new Db('activities');

import { Button } from 'vant';
import 'vant/lib/index.css';
let app = createApp(App)
app.use(store).use(router);
app.use(Button);
// 全局註冊 util
app.config.globalProperties.$cUtil = util;

// 全局註冊 數據庫
app.config.globalProperties.$cDB = cdb;

app.config.errorHandler = (err) => {
  /* 处理错误 */
  console.log('报错了', err);
};
app.mount('#app')