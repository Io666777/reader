import { createApp } from 'vue'
import { clerkPlugin } from '@clerk/vue'
import App from './app/App.vue'
import {router} from './app/providers/router/index'
import './app/styles/main.sass'

const app = createApp(App)

app.use(router) 

app.use(clerkPlugin, {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
})

app.mount('#app') 