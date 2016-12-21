
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
        path: ':tournament_name/:round_name/draws/:draw_name',
        component: require('./components/pages/t/draws/home.vue')
      },
      {
        path: ':tournament_name/:round_name/ballots',
        component: require('./components/pages/t/ballots/home.vue')
      },
      {
        path: ':tournament_name/:round_name/ballots/:adjudicator_name',
        component: require('./components/pages/t/ballots/adjudicator.vue'),
        children: [
          {
            path: 'home',
            component: require('./components/pages/t/ballots/enter/home.vue')
          },
          {
            path: ':version',
            redirect: ':version/check_venue'
          },
          {
            path: ':version/check_venue',
            component: require('./components/pages/t/ballots/enter/check_venue.vue')
          },
          {
            path: ':version/check_ballot',
            component: require('./components/pages/t/ballots/enter/check_ballot.vue')
          },
          {
            path: ':version/check_win',
            component: require('./components/pages/t/ballots/enter/check_win.vue')
          },
          {
            path: ':version/:side_name/:role_name',
            component: require('./components/pages/t/ballots/enter/speaker_score.vue')
          },
          {
            path: '',
            redirect: 'home'
          }
        ]
      },
      {
        path: ':tournament_name/:round_name/evaluations',
        component: require('./components/pages/t/evaluations/home.vue')
      },
      {
        path: ':tournament_name/:round_name/evaluations/:evaluater_name',
        component: require('./components/pages/t/evaluations/evaluater.vue'),
        children: [
          {
            path: 'home',
            component: require('./components/pages/t/evaluations/enter/home.vue')
          },
          {
            path: ':version',
            redirect: ':version/check_venue'
          },
          {
            path: ':version/check_venue',
            component: require('./components/pages/t/evaluations/enter/check_venue.vue')
          },
          {
            path: ':version/check_evaluation',
            component: require('./components/pages/t/evaluations/enter/check_evaluation.vue')
          },
          {
            path: ':version/:evaluatee_name',
            component: require('./components/pages/t/evaluations/enter/score.vue'),
            children: [
              {
                path: '',
                component: require('./components/pages/t/evaluations/enter/adjudicator_score.vue')
              },
              /*{
                path: '',
                component: require('./components/pages/t/ballots/enter/team_score.vue')
              }*/
            ]
          },
          {
            path: '',
            redirect: 'home'
          }
        ]
      }/*,
      {
        path: ':tournament_name/:round_name/evaluations',
        component: require('./components/pages/t/evaluations.vue')
      },
      {
        path: ':tournament_name/:round_name/standings',
        component: require('./components/pages/t/standings.vue')
      }*/,
      {
        path: '',
        redirect: 'home'
      }
    ]
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
