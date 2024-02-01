// page variables
const Login = () => import(/* webpackChunkName: "login" */ "pages/login.vue")



const routes = [
  {
    path: '/',
    // component: () => import('layouts/MainLayout.vue'),
    redirect: { name: "login" },
    name: "index",
    // children: [
    //   { path: '', component: () => import('pages/Index.vue') }
    // ]
  },{
    path : '/login',
    name : 'login',
    component : Login,

  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
