<style lang="stylus" scoped>
  #t-tournaments-config
    padding-left 15px
    padding-right 15px
</style>

<template lang="pug">
  #t-tournaments-config
    form.pure-form.pure-form-aligned
      h1 {{ tournament.name }}
        input#field_tournament_name.input-like-text(type="text" v-model="tournament.name" placeholder="Tournament Name..." required)
      fieldset
        .pure-control-group
          label(for="field_tournament_style") Tournament Style
          select#field_touenament_style(v-model="tournament.style")
            option(v-if="this.loading") Loading
            option(v-for="style in styles", :value="style.id") {{ style.name }}
    h2 Rounds
    data-table(title="Round Name", :data="rounds", :error="error", :loading="loading", v-on:refresh="refresh_data", v-on:add="add_data", v-on:delete="delete_data")
</template>

<script>
export default {
  name: 't-tournaments-config',
  data () {
    return {
      loading: true,
      error: null,
      new_round_name: '',
      tournament:{
        name: this.$route.params.tournament_name,
        style: 'PDA',
        url: '/' + ['t', this.$route.params.tournament_name].join('/'),
        config_url: '/' + ['t', this.$route.params.tournament_name, 'config'].join('/')
      },
      rounds: [
        {
          id: 0,
          name: 'Round 1',
          url: '/' + ['t', this.$route.params.tournament_name, 'Round 1'].join('/'),
          config_url: '/' + ['t', this.$route.params.tournament_name, 'Round 1', 'config'].join('/')
        }
      ],
      styles: [
        {
          id: 'PDA',
          name: 'PDA'
        },
        {
          id: 'Asian',
          name: 'Asian'
        },
        {
          id: 'BP',
          name: 'BP (British Parliamentary)'
        },
        {
          id: 'NA',
          name: 'NA (North American)'
        },
        {
          id: 'HEnDA',
          name: 'HEnDA (Academic)'
        }
      ]
    }
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
