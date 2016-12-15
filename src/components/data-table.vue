<style lang="stylus" scoped>
  #component-data-table
    margin-left 15px
    margin-right 15px
  table
    width 100%
  tbody tr
    cursor pointer
    &:hover
      background-color whitesmoke
  th,
  td
    width 15px
    &:nth-child(2)
      width auto
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
  th a,
  td a
    text-decoration none
    display block
  th a,
  th i
    color black
    &:hover
      color dimgray
  td a,
  td i
    color dimgray
    &:hover
      color black
  td a
    color dimgray
    &:first,
    &:nth-child(2)
      display block
  .ctrl-btn
    cursor pointer
    text-align right
  input[type=text].input-like-text
    border 0 none rgba(0, 0, 0, 0)
    outline transparent none 0
    box-shadow none
    background-color transparent
    width 100%
    margin 0
    padding 0
  tbody > tr:last-of-type
    cursor default
    font-weight bold
    color #696969
    &:hover
      background-color transparent
</style>

<template lang="pug">
  #component-data-table
    table.pure-table.pure-table-horizontal
      thead
        tr
          th ID
          th {{ title }}
          th
          th.ctrl-btn(v-on:click="refresh_data")
            a: i.fa.fa-refresh(aria-hidden="true" title="Refresh")
      tbody
        tr(v-show="loading")
          td: i.fa.fa-spinner.fa-spin
          td(colspan="4") Loading, please wait...
        tr(v-show="error")
          td: i.fa.fa-exclamation-triangle
          td(colspan="4") {{ error }}
        tr(v-if="!(loading)", v-for="datum in data")
          router-link(tag="td", :to="datum.url")
            a {{ datum.id }}
          router-link(tag="td", :to="datum.url")
            a {{ datum.name }}
          td
            router-link.ctrl-btn(v-if="datum.config_url", :to="datum.config_url")
              i.fa.fa-pencil(aria-hidden="true" title="Edit")
          td.ctrl-btn(v-on:click="delete_data(datum)")
            i.fa.fa-times(aria-hidden="true" titile="Delete")
        tr(v-if="!(loading)")
          td
          td(colspan="2"): input#new_datum_name.input-like-text(type="text" v-model="new_datum_name" placeholder="New Name...")
          td.ctrl-btn(v-on:click="add_data")
            a: i.fa.fa-plus(aria-hidden="true" title="Add")
</template>

<script>
export default {
  name: 'component-data-table',
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      validator: (item) => {
        return item.every((v) => {
          return ((v === undefined || v === null) ||
                    ((v.id !== undefined && v.id !== null) &&
                                         (v.name !== undefined && v.name !== null) &&
                                         (v.url !== undefined && v.url !== null)
                                        ));
        });
      },
      default: []
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
      new_datum_name: ''
    }
  },

  created () {
    this.refresh_data();
  },
  watch: {
    '$route': 'refresh_data'
  },
  methods: {
    refresh_data () {
      this.$emit('refresh');
    },
    add_data (evt) {
      if (this.new_datum_name) {
        this.$emit('add', this.new_datum_name);
        this.new_datum_name = '';
      }
    },
    delete_data (datum) {
      if (confirm('Are you sure to DELETE ' + datum.name + '?')) {
        this.$emit('delete', datum);
      }
    }
  }
}
</script>
