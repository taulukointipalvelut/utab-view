<template lang="pug">
  #t
    .pure-menu.pure-menu-horizontal.pure-menu-scrollable
      ul.pure-menu-list
        router-link.pure-menu-item(tag="li", to="/home"): a.pure-menu-link Home
        router-link.pure-menu-item(tag="li", to="/t/Test Tournament/Round 1/draws/Draw 0"): a.pure-menu-link Draw
        router-link.pure-menu-item(tag="li", to="/t/Test Tournament/Round 1/ballots"): a.pure-menu-link Ballot
        router-link.pure-menu-item(tag="li", to="/t/Test Tournament/Round 1/evaluations"): a.pure-menu-link Evaluation
        router-link.pure-menu-item(tag="li", to="/login"): a.pure-menu-link Login
    router-view/
</template>

<script>
export default {
  name: 't'
}
</script>
