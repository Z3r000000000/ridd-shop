import './assets/index.css'
import './assets/jquery.fancybox.min.css'
import './assets/reset.css'
import './assets/slick.css'



import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
