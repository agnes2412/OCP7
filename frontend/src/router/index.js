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
    component: () => import(/*webpackChunkName:"signup" */'../views/Signup.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/*webpackChunkName:"login" */'../views/Login.vue')
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import(/*webpackChunkName:"posts" */'../views/Posts.vue'),
  },
  {
    path: '/onePost/:id',
    name: 'OnePost',
    component: () => import(/*webpackChunkName:"posts" */'../views/OnePost.vue'),
    props: true,
  },
  {
    path: '/admin/',
    name: 'Admin',
    component: () => import(/*webpackChunkName:"posts" */'../views/Admin.vue'),
  },
  {
    path: '/statut/:id',
    name: 'Statut',
    component: () => import(/*webpackChunkName:"posts" */'../views/Statut.vue'),
  },
  {
    path: '/userAccount/',
    name: 'UserAccount',
    component: () => import(/*webpackChunkName:"posts" */'../views/UserAccount.vue'),
    props: true,
  },
  {
    path: '/createPost',
    name: 'CreatePost',
    component: () => import(/*webpackChunkName:"posts" */'../views/CreatePost.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
