<template lang="pug">
  #auth
    #menu.pure-menu.pure-menu-horizontal.pure-menu-scrollable
      ul.pure-menu-list
        li.pure-menu-item
          router-link.pure-menu-link(to="/auth/home") Home
        li.pure-menu-item
          router-link.pure-menu-link(to="/auth/logout") Logout
    router-view/
</template>

<script>
export default {
  name: 'auth'
}
</script>
