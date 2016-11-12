<template lang="pug">
  #login
    button.pure-button(v-on:click="login") Log-in
</template>

<script>
export default {
  name: 'login',
  methods: {
    login () {
      this.$router.push('/auth/home');
    }
  }
}
</script>
