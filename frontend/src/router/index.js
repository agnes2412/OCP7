import { createRouter, createWebHashHistory } from 'vue-router'
//import store from '../../store';
import Home from '../views/Home.vue'
//import router from 'vue-router';
//const token = sessionStorage.getItem('token');

/*router.beforeEach((to, from, next) => {
  if (!token) {
      next('/')
      console.log('Not allowed here')
  } else {
      next('/posts')
    }
})*/


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
    component: () => import(/*webpackChunkName:"signup" */'../views/Signup.vue')
  },
  {
    path: '/login',
    name: 'Login',
    /*beforeEnter(to, from, next) {
      const token = sessionStorage.getItem('token');
        if (token) {
          next('/posts');
        } else {
            next()
        }
    },*/
    component: () => import(/*webpackChunkName:"login" */'../views/Login.vue')
  },
  {
    path: '/posts',
    name: 'Posts',

    component: () => import(/*webpackChunkName:"posts" */'../views/Posts.vue'),
  //meta: { requiresAuth: true }
  },
  {
    path: '/onePost/:id',
    name: 'OnePost',

    component: () => import(/*webpackChunkName:"posts" */'../views/OnePost.vue'),
    props: true,
    //meta: { requiresAuth: true }
  },
  {
    path: '/admin/',
    name: 'Admin',

    component: () => import(/*webpackChunkName:"posts" */'../views/Admin.vue'),
    //meta: { requiresAuth: true }
  },
  {
    path: '/statut/:id',
    name: 'Statut',

    component: () => import(/*webpackChunkName:"posts" */'../views/Statut.vue'),
    //meta: { requiresAuth: true }
  },
  {
    path: '/userAccount/',
    name: 'UserAccount',

    component: () => import(/*webpackChunkName:"posts" */'../views/UserAccount.vue'),
    props:true,
    //meta: { requiresAuth: true }
  },
  {
    path: '/createPost',
    name: 'CreatePost',

    component: () => import(/*webpackChunkName:"posts" */'../views/CreatePost.vue'),
    //meta: { requiresAuth: true }
  },
  //{
    //path: '/post/:id',
    //name: 'OnePost',

    //component: () => import(/*webpackChunkName:"posts" */'../views/OnePost.vue'),
    //meta: { requiresAuth: true }
 //}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

/*router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!store.Posts) {
      next({
        name:"http://localhost:8080/#/posts"
      })
    }
  } else {
    next();
  }
});*/

export default router;
