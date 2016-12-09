
const routes = [
  {
    path: '/t',
    component: require('./components/pages/t.vue'),
    children: [
      {
        path: 'home',
        component: require('./components/pages/t/home.vue')
      },
      {
        path: ':tournament_name',
        component: require('./components/pages/t/tournaments/home.vue')
      },
      {
        path: ':tournament_name/config',
        component: require('./components/pages/t/tournaments/config.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: ':tournament_name/:round_name',
        component: require('./components/pages/t/rounds/home.vue')
      },
      {
        path: ':tournament_name/:round_name/config',
        component: require('./components/pages/t/rounds/config.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: ':tournament_name/:round_name/:draw_name',
        component: require('./components/pages/t/draws/home.vue')
      }/*,
      {
        path: ':tournament_name/:round_name/ballots',
        component: require('./components/pages/t/ballots.vue')
      },
      {
        path: ':tournament_name/:round_name/evaluations',
        component: require('./components/pages/t/evaluations.vue')
      },
      {
        path: ':tournament_name/:round_name/standings',
        component: require('./components/pages/t/standings.vue')
      }
*/    ]
  },
/*  {
    path: '/logout',
    component: require('./components/pages/logout.vue')
  },
  {
    path: '/login',
    component: require('./components/pages/login.vue')
  },
*/  {
    path: '/home',
    redirect: '/t/home'
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '*',
    component: require('./components/pages/err404.vue')
  }
];

module.exports = routes;
