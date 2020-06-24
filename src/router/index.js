import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('views/home/home.vue')
const Category = () => import('views/category/category.vue')
const Cart = () => import('views/cart/cart.vue')
const Profile = () => import('views/profile/profile.vue')

export default new Router({
  routes: [
    {
      path: '',
      //redirect重定向
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component:Home,
    },
    {
      path: '/category',
      name: 'category',
      component:Category,
    },
    {
      path: '/cart',
      name: 'cart',
      component:Cart,
    },
    {
      path: '/profile',
      name: 'profile',
      component:Profile,
    }
  ],
  mode:'history',
})
