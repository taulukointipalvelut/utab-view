<style>
</style>

<template lang="pug">
  #err404
    h1 404 Error: Page Not Found
    p
      | Requested URL "{{ $route.path }}" is not found.
      br
      | Go back to 
      router-link(to="/home") Home
</template>

<script>
export default {
  name: 'err404'
}
</script>
