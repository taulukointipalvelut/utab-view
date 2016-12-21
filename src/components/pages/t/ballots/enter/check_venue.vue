<style lang="stylus" scoped>
  /*#t-ballots-enter-check_venue*/
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
</style>

<template lang="pug">
  #t-ballots-enter-check_venue
    draw-table.draw(:squares="[data.square]", :error="error", :loading="loading" v-on:refresh="refresh_data")
    //-
      .pure-g
        .pure-u-1-3
          h3 Venue
        .pure-u-2-3.content {{ data.square.venue }}
      .pure-g(v-for="(team, i) in data.square.teams")
        .pure-u-1-3
          h3 {{ schema.side_names[i].long_name }}
        .pure-u-1-3.content {{ team }}
      .pure-g(v-for="position in adjudicator_positions")
        .pure-u-1-3
          h3 {{ position.name }}
        .pure-u-2-3.content
          span(v-for="adjudicator in position.data", :class="{ 'this-adjudicator': adjudicator === $route.params.adjudicator_name }") {{ adjudicator }}
    .pure-g
      .pure-u-1-2.button-container
        button#back_link.pure-button.pure-button-primary(@click="$router.back()")
          i.fa.fa-chevron-left(aria-hidden="true")
          | &nbsp;Back
      .pure-u-1-2.button-container
        button#next_link.pure-button.pure-button-primary(@click="next")
          | Next&nbsp;
          i.fa.fa-chevron-right(aria-hidden="true")
</template>

<script>
export default {
  name: 't-ballots-enter-check_venue',
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
      next_link: this.schema.side_names[0].long_name + '/' + this.schema.side_names[0].roles[0].long_name
    }
  },
  computed: {
    adjudicator_positions () {
      return ['chairs', 'panels', 'trainees']
              .map((v) => this.data.square[v].length > 0 ? { name: v[0].toUpperCase() + v.slice(1), data: this.data.square[v] } : null)
              .filter((v) => v !== null);
    }
  },
  methods: {
    refresh_data () {
      this.loading = true;
      setTimeout(()=>{
        this.loading = false;
      }, 500);
    },
    next () {
      this.$emit('next', this.$route.path);
    }
  }
}
</script>
