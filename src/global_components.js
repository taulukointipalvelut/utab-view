// global components

const components = [
  {
    name: 'data-table',
    component: require('./components/data-table.vue'),
  },
  {
    name: 'draw-table',
    component: require('./components/draw-table.vue')
  },
  {
    name: 'ballot-table',
    component: require('./components/ballot-table.vue')
  },
  {
    name: 'ballot',
    component: require('./components/ballot.vue')
  },
  {
    name: 'evaluation',
    component: require('./components/evaluation.vue')
  },
  {
    name: 'version-table',
    component: require('./components/version-table.vue')
  }
];

module.exports = components;
