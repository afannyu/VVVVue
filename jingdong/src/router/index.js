import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    // 异步加载
    component: ()=>import('../views/home/Home')
  },
  {
    path: '/order/:id',
    name: 'Order',
    // 异步加载
    component: ()=>import('../views/order/Order')
  },
  {
    path: '/cart',
    name: 'CartList',
    // 异步加载
    component: ()=>import('../views/cartList/CartList')
  },
  {
    path: '/orderList',
    name: 'OrderList',
    // 异步加载
    component: ()=>import('../views/orderList/OrderList')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: ()=>import('../views/shop/Shop')
  },
  {
    path: '/login',
    name: 'Login',
    component: ()=>import('../views/login/Login'),
    beforeEnter: (to, from, next) => {
      const {isLogin} = localStorage;
      isLogin ? next({name: 'Home'}) : next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: ()=>import('../views/register/Register'),
    beforeEnter: (to, from, next) => {
      const {isLogin} = localStorage;
      isLogin ? next({name: 'Home'}) : next()
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// to：表示即将跳转的页面
router.beforeEach((to, from, next)=>{
  const {isLogin} = localStorage;
  const {name} = to;
  const isloginOrRegister = (name === 'Login' || name === 'Register');
  // 表示如果是登录或者注册页面的时候，也会给我们展示，
  // 但是在进入登录或者注册之前会再次进行判断（代码逻辑写在各个路由项目里）
  (isLogin || isloginOrRegister) ? next() : next({name: 'Login'})
})

export default router
