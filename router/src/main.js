import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 路由：根据url的不同，展示不同的内容
createApp(App).use(router).mount('#app')
