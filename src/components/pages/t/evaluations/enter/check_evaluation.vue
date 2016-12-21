<style lang="stylus" scoped>
  /*#t-ballots-enter-check_ballot*/
  .this-adjudicator
    color red
    font-size bold
  .draw
    margin-bottom 10px
  .button-container
    text-align center
  #next_link,
  #back_link
    display inline-block
    text-align center
  .content
    vertical-align middle
    height 55.4375px
  .fa-flag-checkered
    font-style italic
</style>

<template lang="pug">
  #t-ballots-enter-check_ballot
    evaluation.draw(:data="evaluations", :error="error", :loading="loading" v-on:refresh="refresh_data")
    .pure-g
      .pure-u-1-2.button-container
        button#back_link.pure-button.pure-button-primary(@click="$router.back()")
          i.fa.fa-chevron-left(aria-hidden="true")
          | &nbsp;Back
      .pure-u-1-2.button-container
        button#next_link.pure-button.pure-button-primary(@click="$router.push('../../')")
          | Send&nbsp;
          i.fa.fa-send(aria-hidden="true")
</template>

<script>
export default {
  name: 't-ballots-enter-check_ballot',
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
  computed: {
    evaluations () {
      return [
        {
          role: 'Trainee',
          name: 'Adjudicator 5',
          score: 5,
          comments: '',
          url: 'Adjudicator 5'
        }
      ]
    }
  },
  created () {
    this.$emit('visited_navs', 'check_ballot');
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
    }
  }
}
</script>
