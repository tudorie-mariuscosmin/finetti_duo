import fire from '../store/fire'
const authorize = (to, from, next) => {
  if (fire.state().token) {
    next()
  } else {
    next('/login')
  }
}


const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: authorize,
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: '/income', component: () => import('pages/IncomePage.vue') },
      { path: '/investing', component: () => import('pages/InvestingPage.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [{ path: '', component: () => import('pages/AuthPage.vue'), name: "AuthPage" }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
