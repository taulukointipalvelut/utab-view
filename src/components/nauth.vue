<template lang="pug">
  #nauth
    #menu.pure-menu.pure-menu-horizontal.pure-menu-scrollable
      ul.pure-menu-list
        li.pure-menu-item
          router-link.pure-menu-link(to="/nauth/home") Home
        li.pure-menu-item
          router-link.pure-menu-link(to="/nauth/pageA") Page A
        li.pure-menu-item
          router-link.pure-menu-link(to="/nauth/pageB") Page B
        li.pure-menu-item
          router-link.pure-menu-link(to="/nauth/login") Login
    router-view/
</template>

<script>
export default {
  name: 'nauth'
}
</script>
