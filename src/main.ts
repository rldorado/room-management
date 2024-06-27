import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Vuetify
import Vuetify from './plugins/vuetify'

// Tailwindcss
import './index.css'

const app = createApp(App)

app.use(createPinia())
app.use(Vuetify)

app.mount('#app')
