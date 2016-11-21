const Vue        = require('vue/dist/vue');  // vue incl. template 
const VueRouter  = require('vue-router');
const routes     = require('./routes');
const components = require('./global_components');

Vue.use(VueRouter);

components.forEach(function(c){
  Vue.component(c.name, c.component);
});

const router = new VueRouter({routes});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (false) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

const app = new Vue({
  router
}).$mount('#app');
