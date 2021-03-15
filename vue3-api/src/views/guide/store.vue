<template>
  <div>
    <h1>Store</h1>
    <h2>{{message}}</h2>
    <h2>{{count}}</h2>
    <h2>getters: {{getInfo}}</h2>
    <button @click="handleChangeCount('+')">+</button>
    <button @click="handleChangeCount('-')">-</button>
  </div>
</template>
<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  // 方法一
  // computed: {
  //   count() {
  //     return this.$store.state.count
  //   },
  //   message() {
  //     return this.$store.state.message
  //   }
  // },
  // 方法二
  // computed: mapState({
  //   count: state => state.count,
  //   message: state => state.message,
  // }),
  // 方法三
  // computed: mapState({
  //   count: 'count',
  //   message: 'message',
  // }),
  // 方法四
  // computed: mapState(['count', 'message']),
  // 方法五
  computed: {
    // ...mapState({
    //   count: state => state.app.count,
    //   message: state => state.app.message,
    // }),
    ...mapState('app', [
      'count',
      'message'
    ]),
    ...mapGetters('app', [
      'getInfo'
    ])
  },
  data() {
    return {
 
    };
  },
  methods: {
    ...mapActions('app', [
      'postCount'
    ]),
    handleChangeCount(type) {
      // if (type === '+') {
      //   this.$store.commit('setCount', this.count + 1)
      // } else {
      //   this.$store.commit('setCount', this.count - 1)
      // }

      // mutations 需要使用 payload.count 访问
      // if (type === '+') {
      //   this.$store.commit({ type: 'setCount', count: this.count + 1})
      // } else {
      //   this.$store.commit({ type: 'setCount', count: this.count - 1})
      // }

      this.postCount()
    }
  }
};
</script>
