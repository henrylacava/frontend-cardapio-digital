import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

createApp(App).use(createPinia()).use(bootstrap).mount('#app')
