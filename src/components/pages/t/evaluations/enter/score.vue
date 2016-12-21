<style lang="stylus" scoped>
  /*#t-ballots-enter-score*/
  .this-adjudicator
    color red
    font-size bold
  .draw
    margin-bottom 10px
  #next_link
    display block
    text-align center
  .content
    vertical-align middle
    height 55.4375px
</style>

<template lang="pug">
  #t-ballots-enter-score
    router-view(:data="data", :schema="schema", @save="save", :error="error", :loading="loading", :links="links")/
</template>

<script>
export default {
  name: 't-ballots-enter-score',
  props: {
    data: {
      type: Object
    },
    schema: {
      type: Object,
      required: true
    },
    links: {
      type: Array,
      required: true
    },
    error: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    adjudicator_positions () {
      return ['chairs', 'panels', 'trainees']
              .map((v) => this.data.square[v].length > 0 ? { name: v[0].toUpperCase() + v.slice(1), data: this.data.square[v] } : null)
              .filter((v) => v !== null);
    }
  },
  created () {
    //this.$emit('visited_navs', this.find_side_by_long_side_name(this.$route.params.side_name).short_name.toLowerCase());
  },
  methods: {
    refresh_data () {
      this.loading = true;
      setTimeout(()=>{
        this.loading = false;
      }, 500);
    },
    add_data (new_round_name) {
      this.rounds.push({
        id: 0,
        name: new_round_name,
        url: '/' + ['t', this.$route.params.tournament_name, new_round_name].join('/'),
        config_url: '/' + ['t', this.$route.params.tournament_name, new_round_name, 'config'].join('/')
      });
    },
    delete_data (round) {
      this.rounds = this.rounds.filter((el) => el.id !== round.id, this);
    },
    find_side_by_long_side_name (long_side_name) {
      return this.schema.side_names.filter((v, i) => v.long_name === long_side_name)[0];
    },
    save (data) {
      this.$emit('save', data)
    }
  }
}
</script>
