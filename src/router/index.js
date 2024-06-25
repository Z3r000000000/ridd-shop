import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

  const router = createRouter({
    history: createWebHistory(process.env.NODE_ENV === "production" ? "/ridd-shop/" : "/",),
    routes: [
      {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: { notAdmin: true }
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/NFView.vue'),
        meta: { notAdmin: true }
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/AboutView.vue'),
        meta: { notAdmin: true }
      },
      {
        path: '/shop',
        name: 'shop',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/ShopView.vue'),
        meta: { notAdmin: true }
      },
      {
        path: '/shop/:categoryId',
        name: 'catalog',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/CatalogView.vue'),
        meta: { notAdmin: true }
      },
      {
        path: '/wishlist/:id',
        name: 'wihhlist',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/WihhlistView.vue'),
        meta: { notAdmin: true }
      },
      {
        path: '/auth',
        name: 'auth',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/AuthView.vue'),
        meta: { notAdmin: true }
      },
      {
        path: '/register',
        name: 'register',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/RegView.vue'),
        meta: { notAdmin: true }
      },
      {
        path: '/cart',
        name: 'cart',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/CartView.vue'),
        meta: { notAdmin: true }
      },
      {
        path: '/checkout',
        name: 'checkout',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/CheckView.vue'),
        meta: { notAdmin: true }
      },
      {
        path: '/lkOrder',
        name: 'lkOrder',
        component: () => import('../views/lkOrdersView.vue'),
        meta: { notAdmin: true }
      },
      {
        path: '/lkData',
        name: 'lkData',
        component: () => import('../views/lkDataView.vue'),
        meta: { notAdmin: true }
      },
      {
        path: '/lkPass',
        name: 'lkPass',
        component: () => import('../views/lkPassView.vue'),
        meta: { notAdmin: true }
      },
      {
        path: '/lkAddress',
        name: 'lkAddress',
        component: () => import('../views/lkAddressView.vue'),
        meta: { notAdmin: true }
      },
      {
        path: '/adminShop',
        name: 'adminShop',
        component: () => import('../views/Admin/adminShopView.vue'),
        meta: { requiresAdmin: true}
      },
      {
        path: '/adminOrder',
        name: 'adminOrder',
        component: () => import('../views/Admin/adminOrderView.vue'),
        meta: { requiresAdmin: true }
      },
    ]
  })
  router.beforeEach((to, from, next) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const isAdmin = user && user.isAdmin
  
    if (to.meta.requiresAdmin && !isAdmin) {
      next({ name: 'auth' })
    }if(to.meta.notAdmin && isAdmin){
      next({ name: 'adminShop' })
    } else{
      next()
    }
  })
  export default router


