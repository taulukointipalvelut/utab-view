<template lang="pug">
  #logout
</template>

<script>
export default {
  name: 'logout',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$router.replace('/')
    });
  }
}
</script>
