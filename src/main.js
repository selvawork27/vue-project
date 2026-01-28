import { createApp } from 'vue'
import App from './App.vue'
const app=createApp(App)
app.config.globalProperties.$appName="projectName"
app.config.globalProperties.$formatDate=(date)=>{
    return new Date(date).toLocaleDateString()
}
app.mount('#app')
