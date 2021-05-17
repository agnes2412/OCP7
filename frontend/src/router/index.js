import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

///Les routes sont définies via des objets qui définissent chaque route
const routes = [
  //Chaque objet route contient trois propriétés clés:
  { //Chemin menant à l'Url correspondant au componant
    path: '/',
    //nom de la route pour l'étiquetage et le débuggage
    name: 'Home',
    //Composant qui doit s'afficher lorsque le path est trouvé
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/login',
    name: 'Login',

    component: () => import('../views/Login.vue')
  },
  {
    path: '/posts',
    name: 'Posts',

    component: () => import('../views/Posts.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
