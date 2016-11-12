
const routes = [
  {
    path: '/auth',
    component: require('./components/auth.vue'),
    children: [
      {
        path: 'home',
        component: require('./components/auth/home.vue')
      },
      {
        path: 'logout',
        component: require('./components/logout.vue')
      }
    ]
  },
  {
    path: '/nauth',
    component: require('./components/nauth.vue'),
    children: [
      {
        path: 'home',
        component: require('./components/nauth/home.vue')
      },
      {
        path: 'pageA',
        component: require('./components/nauth/pageA.vue')
      },
      {
        path: 'pageB',
        component: require('./components/nauth/pageB.vue')
      },
      {
        path: 'login',
        component: require('./components/login.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: '/nauth/home'
  }
];

module.exports = routes;
