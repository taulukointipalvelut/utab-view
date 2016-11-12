var Vue       = require('vue/dist/vue');  // vue incl. template 
var VueRouter = require('vue-router');

Vue.use(VueRouter);

const PageA = require('./components/pageA.vue');
const PageB = require('./components/pageB.vue')

const routes = [
  {
    path: '/pageA',
    components: {
      main: PageA
    }
  },
  {
    path: '/pageB',
    components: {
      main: PageB
    }
  }
]

const router = new VueRouter({routes});

const app = new Vue({
  router
}).$mount('#app')
