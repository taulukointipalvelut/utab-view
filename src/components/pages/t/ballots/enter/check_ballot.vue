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
    div(v-for="i in data.teams.length")
      h3
        | {{ data.teams[i - 1].name }} ({{ schema.side_names[data.teams[i - 1].side].long_name }}) &nbsp;
        i.fa.fa-flag-checkered(v-if="data.teams[i - 1].win === 1")
      ballot.draw(:data="ballot[i - 1]", :error="error", :loading="loading" v-on:refresh="refresh_data")
    .pure-g
      .pure-u-1-2.button-container
        button#back_link.pure-button.pure-button-primary(@click="back")
          i.fa.fa-chevron-left(aria-hidden="true")
          | &nbsp;Back
      .pure-u-1-2.button-container
        button#next_link.pure-button.pure-button-primary(@click="send")
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
    ballot () {
      return this.data.teams.map((team, side_i) => team.speakers.map((speaker, speaker_i) => {
        return {
          speaker: speaker.name,
          role: this.schema.side_names[team.side].roles[speaker.role].short_name,
          scores: {
            matter: speaker.scores.matter,
            manner: speaker.scores.manner,
            poi_score: speaker.user_defined_data.poi_score
          },
          is_best_speaker: speaker.user_defined_data.is_best_speaker,
          url: this.schema.side_names[team.side].long_name + '/' + this.schema.side_names[team.side].roles[speaker.role].long_name
        };
      }));
    }
  },
  methods: {
    refresh_data () {
      this.loading = true;
      setTimeout(()=>{
        this.loading = false;
      }, 500);
    },
    back () {
      this.$emit('back', this.$route.path);
    },
    send () {
      this.$emit('send');
    }
  }
}
</script>
