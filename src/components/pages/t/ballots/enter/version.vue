<style lang="stylus" scoped>
  #t-ballots-enter-version
    padding-left 15px
    padding-right 15px
</style>

<template lang="pug">
  #t-ballots-enter-version
    h3 {{ $route.params.version }}
</template>

<script>
export default {
  name: 't-ballots-enter-version',
  data () {
    return {
      loading: true,
      error: null,
      data: null
    }
  },

  created () {
    this.refresh_data()

    if(this.data === null || this.data === undefined){
      console.log('redirect to:', this.$route.path + '/venue_check');
      this.$router.replace(this.$route.path + '/venue_check');
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
