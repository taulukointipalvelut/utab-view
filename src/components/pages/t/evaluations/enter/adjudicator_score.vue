<style lang="stylus" scoped>
  /*#t-ballots-enter-adjudicator-score*/
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
  .comments
    width 100%
</style>

<template lang="pug">
  #t-ballots-enter-adjudicator-score
    form.pure-form.pure-form-aligned
      fieldset
        legend {{ $route.params.evaluatee_name }} (Trainee)
        .pure-control-group
          label(for="speaker_matter") Score
          select#speaker_matter
            option(v-for="n in v_range(1, 10, 1)") {{ n }}
      fieldset
        legend Comments
        textarea.comments(placeholder="Comments", row="3")
    .pure-g
      .pure-u-1-2.button-container
        button#back_link.pure-button.pure-button-primary(@click="$router.push(back_link)")
          i.fa.fa-chevron-left(aria-hidden="true")
          | &nbsp;Back
      .pure-u-1-2.button-container
        button#next_link.pure-button.pure-button-primary(@click="$router.push(next_link)")
          | Next&nbsp;
          i.fa.fa-chevron-right(aria-hidden="true")
</template>

<script>
export default {
  name: 't-ballots-enter-adjudicator-score',
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
      best_speakers: [],
      next_link: 'check_evaluation'
    }
  },
  computed: {
    /*next_link () {
      let sq_side = this.$route.params.side_name;
      let sq_role = this.$route.params.role_name;
      let next_i = this.links.map((v, i) => [v, i]).filter(v => v[0] === sq_side + '/' + sq_role)[0][1] + 1
      return '../' + this.links[next_i];
    },*/
    back_link () {
      /*let sq_side = this.$route.params.side_name;
      let sq_role = this.$route.params.role_name;
      let back_i = this.links.map((v, i) => [v, i]).filter(v => v[0] === sq_side + '/' + sq_role)[0][1] - 1
      */return '../'// + this.links[back_i];
    }
  },
  methods: {
    refresh_data () {
      this.loading = true;
      setTimeout(()=>{
        this.loading = false;
      }, 500);
    },
    find_side_by_long_side_name (long_side_name) {
      return this.schema.side_names.filter((v, i) => v.long_name === long_side_name)[0];
    },
    find_team_by_long_side_name (long_side_name) {
      let team_i = this.schema.side_names.map((v, i) => v.long_name === long_side_name ? i : null).filter(v => v !== null)[0];
      return this.data.teams.filter(v => v.side === team_i)[0];
    },
    find_role_by_long_role_name (long_side_name, long_role_name) {
      let side = this.find_side_by_long_side_name(long_side_name);
      return side.roles.filter(v => v.long_name === long_role_name)[0];
    },
    v_range (min, max, step){
      var arr = [];
      for(var i = min; i <= max; i += step){
        arr.push(i);
      }
      return arr;
    }
  }
}
</script>
