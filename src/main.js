import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vConsole from "vconsole";
if (location.origin.indexOf('192.168') > -1) {
  // 加載 vConsole
  new vConsole();
}

import { Button } from 'vant';
import 'vant/lib/index.css';
let app = createApp(App)
app.use(store).use(router);
app.use(Button)
app.mount('#app')