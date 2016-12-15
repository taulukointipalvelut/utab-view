<style lang="stylus" scoped>
  #t-home
    padding-left 15px
    padding-right 15px
</style>

<template lang="pug">
  #t-home
    h1 Admin Home
    data-table(title="Tournament Name", :data="tournaments", :error="error", :loading="loading", v-on:refresh="refresh_data", v-on:add="add_data", v-on:delete="delete_data")
</template>

<script>
export default {
  name: 't-home',
  data () {
    return {
      loading: true,
      error: null,
      tournaments: [
        {
          id: 0,
          name: 'Test Tournament',
          url: '/t/Test Tournament',
          config_url: '/t/Test Tournament/config'
        },
        {
          id: 1,
          name: 'Test Tournament 2',
          url: '/t/Test Tournament 2',
          config_url: '/t/Test Tournament 2/config'
        }
      ]
    }
  },
  created () {
    this.refresh_data();
  },
  watch: {
    '$route': 'refresh_data'
  },
  methods: {
    refresh_data () {
      this.loading = true;
      setTimeout(()=>{
        this.loading = false;
      }, 500);
    },
    add_data (new_tournament_name) {
      this.tournaments.push({
        id: 0,
        name: new_tournament_name,
        url: '/' + ['t', new_tournament_name].join('/'),
        config_url: '/' + ['t', new_tournament_name, 'config'].join('/')
      });
    },
    delete_data (tournament) {
      this.tournaments = this.tournaments.filter((el) => el.id !== tournament.id, this);
    }
  }
}
</script>
