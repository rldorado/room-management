import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Tailwindcss styles
import './index.css'

// Icons
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
