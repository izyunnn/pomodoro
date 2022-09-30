import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// @ts-ignore
import svg from 'svg-progress-bar'
// import CircleProgress from 'vue3-circle-progress'
import 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
// import 'vue3-circle-progress/dist/circle-progress.css'

const app = createApp(App).use(store).use(router)
app.use(svg, { componentName: 'percent-bar' })
// app.use(CircleProgress)
app.mount('#app')
