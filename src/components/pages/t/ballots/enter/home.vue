<style lang="stylus" scoped>
  #t-ballots-enter-home
    padding-left 15px
    padding-right 15px
</style>

<template lang="pug">
  #t-ballots-enter-home
    version-table(title="Version", :data="data", :error="error", :loading="loading" v-on:refresh="refresh_data" v-on:add_data="add_data" v-on:delete_data="delete_data")
</template>

<script>
export default {
  name: 't-ballots-enter-home',
  data () {
    return {
      loading: true,
      error: null,
      data:[
        {
          version: '20161216004223',
          time: Date.now(),
          url: '/' + ['t', this.$route.params.tournament_name, this.$route.params.round_name, 'ballots', 'Adjudicator 1', '20161216004223'].join('/')
        },
        {
          version: '20161216000000',
          time: 100,
          url: '/' + ['t', this.$route.params.tournament_name, this.$route.params.round_name, 'ballots', 'Adjudicator 1', '20161216000000'].join('/')
        }
      ]
    }
  },

  created () {
    this.refresh_data()

    if(true){//this.data === [] || this.data === null || this.data === undefined){
      console.log('redirect to:', this.$route.path.replace('/home', '') + '/201612160000000/check_venue');
      this.$router.replace(this.$route.path.replace('/home', '') + '/201612160000000/check_venue');
    }
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
    add_data (new_datum_name) {
      this.data.push({
        id: 0,
        version: '20161216000000',
        time: Date.now().toISOString(),
        url: '/' + ['t', this.$route.params.tournament_name, this.$route.params.round_name, 'ballots', 'Adjudicator 1', datenow_iso].join('/')
      });
    },
    delete_data (datum) {
      this.data = this.data.filter((el) => el.id !== datum.id, this);
    }
  }
}
</script>
