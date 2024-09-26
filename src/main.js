/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Composables
import { createApp } from 'vue'

// Components

import App from './App.vue'
import vuetify from './plugins/vuetify'; 
import router from './router';




const app = createApp(App)
app.use(router);
app.use(vuetify); 
app.mount('#app')
