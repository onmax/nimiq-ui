import { createApp } from 'vue'
import App from './App.vue'
import { VueEmailPlugin } from 'vue-email'

const app = createApp(App)

app.use(VueEmailPlugin)
app.mount('#app')
