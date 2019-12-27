import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const refs = {
  post: 'https://tranquil-waters-42736.herokuapp.com/api/posts'
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    props: {
      ref: refs.post
    }
  },
  {
    path: '/new',
    name: 'newPost',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "new" */ '../views/New.vue'),
    props: {
      ref: refs.post
    }
  },
  {
    path: '/:id',
    name: 'showPost',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "show" */ '../views/Post.vue'),
    props: route => ({ ref: refs.post + '/' + route.params.id })
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: '/posts/',
  routes
})

export default router
