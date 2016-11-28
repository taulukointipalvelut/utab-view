<template lang="pug">
  #t
    .pure-menu.pure-menu-horizontal.pure-menu-scrollable
      ul.pure-menu-list
        router-link.pure-menu-item(tag="li", to="/home"): a.pure-menu-link Home
        router-link.pure-menu-item(tag="li", to="/login"): a.pure-menu-link Login
    router-view/
</template>

<script>
export default {
  name: 't'
}
</script>
