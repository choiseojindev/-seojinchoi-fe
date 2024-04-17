// page variables
const Login = () => import(/* webpackChunkName: "login" */ "pages/login.vue");
const CreateAccount = () =>
  import(
    /* webpackChunkName: "createAccount" */ "pages/account/createAccount.vue"
  );

// 메인 페이지
const Home = () => import(/* webpackChunkName: "home" */ "pages/home");
const Test = () => import(/* webpackChunkName: "test" */ "pages/test.vue");

const routes = [
  {
    path: "/",
    // component: () => import('layouts/MainLayout.vue'),
    redirect: { name: "login" },
    name: "index",
    // children: [
    //   { path: '', component: () => import('pages/Index.vue') }
    // ]
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/createAccount",
    name: "createAccount",
    component: CreateAccount,
  },
  {
    path: "/home",
    component: Home,
    // beforeEnter: hasToken,
    // TODO: 최근 현재 페이지로 redirect
    // redirect: { name: "" },
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/test",
        name: "test",
        meta: {
          title: {
            ko: "테스트",
            en: "test",
          },
          breadcrumb: "xptmxm",
        },
        component: Test,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: "*",
  //   component: () => import("pages/Error404.vue"),
  // },
];

export default routes;
