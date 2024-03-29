import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import loadDirectives from './directives';

const app = createApp(App);

loadDirectives(app);

app.mount('#app')
