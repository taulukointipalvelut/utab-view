const Vue       = require('vue/dist/vue');  // vue incl. template 
const VueRouter = require('vue-router');
const routes    = require('./routes');

Vue.use(VueRouter);

const router = new VueRouter({routes});

const app = new Vue({
  router
}).$mount('#app');
