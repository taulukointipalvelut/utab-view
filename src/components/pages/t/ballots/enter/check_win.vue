<style lang="stylus" scoped>
  /*#t-ballots-enter-check_win*/
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
  #t-ballots-enter-check_win
    form.pure-form.pure-form-aligned
      fieldset
        legend Winner
        .pure-control-group
          label(for="win_team_name") Name
          select#win_team_name(v-model="winner")
            option(v-for="option in options", :value="option.value", :selected="option.selected") {{ option.text }}
    .pure-g
      .pure-u-1-2.button-container
        button#back_link.pure-button.pure-button-primary(@click="back")
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
    let p = x => {console.log(x); return x;};
    return {
      winner: 0,
      options: this.data.teams.map((team, i) => {
        return {
          text: `${team.name} (${this.schema.side_names[team.side].short_name})`,
          value: i
        };
      })
    }
  },
  watch: {
    'winner': 'save',
    'data': 'refresh_winner'
  },
  created () {
    this.refresh_winner();
  },
  methods: {
    refresh_winner () {
      let t = this.data.teams.map((team, i) => [i, team.win]).filter(v => v[1] === 1);
      this.winner = (t.length && t.length >= 1) ? t[0][0] : 0;
    },
    save () {
      var new_data = this.data;
      new_data.teams.forEach((_, i) => {
        if(i === this.winner){
          new_data.teams[i].win = 1;
        }else{
          new_data.teams[i].win = 0;
        }
      });
      this.$emit('save', new_data);
    },
    next () {
      this.save();
      this.$emit('next', this.$route.path);
    },
    back () {
      this.$emit('back', this.$route.path);
    }
  }
}
</script>
