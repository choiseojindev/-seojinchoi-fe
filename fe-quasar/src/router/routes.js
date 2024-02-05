// page variables
const Login = () => import(/* webpackChunkName: "login" */ "pages/login.vue")
const CreateAccount = () => import(/* webpackChunkName: "createAccount" */ "pages/account/createAccount.vue")



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
  {
    path : '/createAccount',
    name : 'createAccount',
    component : CreateAccount,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
