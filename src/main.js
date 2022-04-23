import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './private/credentials.js'

initializeApp(firebaseConfig)

createApp(App).use(store).use(router).mount('#app')
