<style lang="stylus" scoped>
  /*#t-ballots-enter-speaker_score*/
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
  #t-ballots-enter-speaker_score
    form.pure-form.pure-form-aligned
      fieldset
        legend {{ role.long_name }} ({{ team.name }})
        .pure-control-group
          label(for="speaker_name") Name
          select#speaker_name(v-model="speaker.name")
            option(v-for="option in options.speaker", :value="option.value") {{ option.text }}
      fieldset
        legend Score
        .pure-control-group
          label(for="speaker_matter") Matter
          select#speaker_matter(v-model="speaker.scores.matter")
            option(v-for="option in options.matter", :value="option.value") {{ option.text }}
        .pure-control-group
          label(for="speaker_manner") Manner
          select#speaker_manner(v-model="speaker.scores.manner")
            option(v-for="option in options.manner", :value="option.value") {{ option.text }}
      fieldset
        legend Others
        .pure-control-group
          label(for="speaker_poi_score") POI
          select#speaker_poi_score(v-model="speaker.user_defined_data.poi_score")
            option(v-for="option in options.poi_score", :value="option.value") {{ option.text }}
        .pure-controls
          label.pure-checkbox(for="best_speaker")
            input#best_speaker(type="checkbox", v-model="speaker.user_defined_data.is_best_speaker")
            | Best Speaker
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
  name: 't-ballots-enter-speaker_score',
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
    let v_range = (min, max, step) => {
      var arr = [];
      for(var i = min; i <= max; i += step){
        arr.push({text: i.toString(), value: i});
      }
      return arr;
    };
    return {
      speaker: {
        name: '',
        role: 0,
        scores: {
          matter: 0,
          manner: 0,
        },
        user_defined_data: {
          poi_score: 0,
          is_best_speaker: false
        }
      },
      options: {
        speaker: [
          {text: '', value: ''},
          {text: '', value: ''},
          {text: '', value: ''}
        ],
        matter: v_range(this.schema.score_range.matter.min, this.schema.score_range.matter.max, this.schema.score_range.matter.step),
        manner: v_range(this.schema.score_range.manner.min, this.schema.score_range.manner.max, this.schema.score_range.manner.step),
        poi_score: v_range(this.schema.user_defined_data.poi_score.range.min, this.schema.user_defined_data.poi_score.range.max, this.schema.user_defined_data.poi_score.range.step)
      }
    }
  },
  computed: {
    team () {
      return this.find_team_by_long_side_name(this.$route.params.side_name);
    },
    side () {
      return this.find_side_by_long_side_name(this.$route.params.side_name);
    },
    role () {
      return this.find_role_by_long_role_name(this.$route.params.side_name, this.$route.params.role_name);
    },
    next_link () {
      let sq_side = this.$route.params.side_name;
      let sq_role = this.$route.params.role_name;
      let next_i = this.links.map((v, i) => [v, i]).filter(v => v[0] === sq_side + '/' + sq_role)[0][1] + 1
      return '../' + this.links[next_i];
    },
    back_link () {
      let sq_side = this.$route.params.side_name;
      let sq_role = this.$route.params.role_name;
      let back_i = this.links.map((v, i) => [v, i]).filter(v => v[0] === sq_side + '/' + sq_role)[0][1] - 1
      return '../' + this.links[back_i];
    }
  },
  watch: {
    'speaker': 'save',
    '$route': 'refresh_speaker'
  },
  created () {
    this.refresh_speaker();
  },
  methods: {
    refresh_speaker () {
      let t = this.team.speakers.filter((speaker, i) => this.side.roles[speaker.role].long_name === this.role.long_name);
      this.speaker = (t.length >= 1) ? t[0] : this.team.speakers[0];
      this.speaker.role = this.side.roles.map((role, i) => [i, role.long_name]).filter(v => v[1] === this.role.long_name)[0][0];
      this.options.speaker = this.team.speakers.map(speaker => { return { text: speaker.name, value: speaker.name } });
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
    save () {
      var new_data = this.data;
      new_data.teams.forEach((_, i) => {
        new_data.teams[i].speakers.forEach((speaker, j) => {
          if(speaker.name === this.speaker.name){
            new_data.teams[i].speakers[j] = this.speaker;
          }
        });
      });
      this.$emit('save', new_data);
    },
    next () {
      this.$emit('next', this.$route.path);
    },
    back () {
      this.$emit('back', this.$route.path);
    }
  }
}
</script>
