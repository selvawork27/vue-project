import { createApp } from 'vue'
import App from './App.vue'
import Home from './Home.vue'
const app=createApp(App)
app.component("Homes",Home)
app.config.globalProperties.$appName="projectName"
app.config.globalProperties.$formatDate=(date)=>{
    return new Date(date).toLocaleDateString()
}
app.mount('#app')
