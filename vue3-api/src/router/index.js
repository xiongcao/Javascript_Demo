import { createRouter, createWebHashHistory } from 'vue-router'
import ReadApi from '../views/read-api/ReadApi.vue'
import Guide from '../views/guide/index.vue'
import ComAsync from '../views/guide/com-async.vue'
import Animation from '../views/guide/animation.vue'
import Directive from '../views/guide/directive.vue'
import Teleport from '../views/guide/teleport.vue'
import Store from '../views/guide/store.vue'
import MyRouter from '../views/router/index.vue'
import Layout from '../views/router/layout.vue'
import Main from '../components/router/Main.vue'


const routes = [
  // {
  //   path: '/',
  //   name: 'ReadApi',
  //   component: ReadApi
  // },
  {
    path: '/guide',
    name: 'guide',
    component: Guide
  },
  {
    path: '/async',
    name: 'comAsync',
    component: ComAsync
  },
  {
    path: '/animation',
    name: 'animation',
    component: Animation
  },
  {
    path: '/directive',
    name: 'directive',
    component: Directive
  },
  {
    path: '/teleport',
    name: 'teleport',
    component: Teleport
  },
  {
    path: '/store',
    name: 'store',
    component: Store
  },
  {
    path: '/carousel',
    name: 'Carousel',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/carousel/Carousel.vue')
  },
  {
    path: '/myRouter',
    name: 'myRouter',
    component: MyRouter,
    children: [
      // { path: 'home', name: 'home', component: () => import('../components/router/Home.vue') },
      { path: 'home/:name', name: 'home', props: true, component: () => import('../components/router/Home.vue') },
      { path: 'about', name: 'about', component: () => import('../components/router/About.vue') },
      // { path: 'about', alias: 'alias_about', component: () => import('../components/router/About.vue') },
    ]
  },
  {
    path: '/layout',
    name: 'layout',
    component: Layout,
    // components: {
    //   default: Layout,
    //   main: () => import('../components/router/Head.vue')
    // },
    children: [
      { 
        path: 'main',
        name: 'main', 
        components: {
          head: () => import('../components/router/Head.vue'),
          main: () => import('../components/router/Main.vue'),
          foot: () => import('../components/router/Foot.vue'),
        }
      },

      // { path: 'head', name: 'head', component: () => import('../components/router/Head.vue') },
      // { path: 'foot', name: 'foot', component: () => import('../components/router/Foot.vue') },
    ]
  },

  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
