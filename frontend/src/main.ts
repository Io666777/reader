import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './app/App.vue'
import router from './app/providers/router/index'

const app = createApp(App)

app.use(router) 
app.use(createPinia());
app.mount('#app') 