import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Main from '@/views/MainView'
import TodoListPanel from '@/components/Tools/TodoListPanel'
import RingtoneList from '@/components/Tools/RingtonesPanel'
import Analytics from '@/components/Tools/AnalyticsPanel'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/Main',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/ToDoList',
        component: TodoListPanel
      },
      {
        name: 'RingtoneList',
        path: '/RingtoneList',
        component: RingtoneList
      },
      {
        name: 'Analytics',
        path: '/Analytics',
        component: Analytics
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
