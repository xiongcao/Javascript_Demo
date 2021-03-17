<template>
  <div>
    <h1>Store</h1>
    <h2>{{message}}</h2>
    <h2>{{count}}</h2>
    <h2>getters: {{getInfo}}</h2>
    <button @click="handleChangeCount('+')">+</button>
    <button @click="handleChangeCount('-')">-</button>
    <h2>show</h2>
    <tab-home v-if="show"/>
    <button @click="show = !show">显示/隐藏</button>
    <h2>Array Active</h2>
    <p>总长度为：{{persons}}</p>
    <!-- <p>数组元素：<span v-for="(item, i) in  persons" :key="i">{{item.name}}-</span>；</p> -->
    <button @click="handleListElement">添加元素</button>
    <button @click="handleChangeLen">改变长度</button>
  </div>
</template>
<script>
import TabHome from '../../components/guide/TabHome.vue'

import { mapState, mapGetters, mapActions } from 'vuex'

import { reactive, ref, toRefs  } from 'vue'

export default {
  components: {
    TabHome
  },
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
      show: true,
      persons: [{
        name: 'random1'
      }]
    };
  },
  // setup() {
    
  //   const show = ref(false);

  //   const persons = reactive([{
  //     name: 'Random1'
  //   }])

  //   const handleListElement = () => {
  //     persons[persons.length] = {
  //       name: 'Random' + parseInt(Math.random() * 10)
  //     }
  //     console.log(persons);
      
  //   }

  //   return {
  //     show,
  //     // ...toRefs(persons)
  //     persons,
  //     handleListElement
  //   }
  // },
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
    },
    handleListElement() {
      // this.persons.push({
      //   name: 'Random' + parseInt(Math.random() * 10)
      // })
      // this.persons[this.persons.length] = {
      //   name: 'Random' + parseInt(Math.random() * 10)
      // }

      // this.$set(this.persons, this.persons.length, {
      //   name: 'Random' + parseInt(Math.random() * 10)
      // })
      // console.log(this.persons)
    },
    // handleChangeLen() {
    //   this.persons.length = 3
    //   console.log(this.persons)
    // }
  }
};
</script>
