import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import VueBasicAlert from "vue-basic-alert";
import './index.css'

const app = createApp(App)

app.use(router)
app.use(VueBasicAlert)

app.mount('#app')
