<template>
  <!-- <div id="app" v-once> -->
  <div id="app">
    <h2 ref="h2Ref">Array Active</h2>
    <p>总长度为：{{persons.length}}</p>
    <p>数组元素：<span v-for="(item, i) in  persons" :key="i">{{item.name}}-</span>；</p>
    <button @click="handleListElement">添加元素</button>
    <button @click="handleChangeLen">改变长度</button>

    <child ref="childRef"/>
    <brother/>
  </div>
</template>

<script>

import Child from './components/Child.vue'
import Brother from './components/Brother.vue'

export default {
  name: 'App',
  components: {
    Child, 
    Brother
  },
  data() {
    return {
      name: 'father',
      persons: [{
        name: 'random1'
      }]
    };
  },
  mounted() {
    console.log('h2Ref: ', this.$refs.h2Ref)
    console.log('childRef: ', this.$refs.childRef)
    this.$refs.childRef.hadnleChangeName();


    console.log(this.$children[0].name = '小狗111')
  },
  methods: {
    handleListElement() {
      // this.persons.push({
      //   name: 'Random' + parseInt(Math.random() * 10)
      // })
      this.persons[this.persons.length] = {
        name: 'Random' + parseInt(Math.random() * 10)
      }

      // this.$set(this.persons, this.persons.length, {
      //   name: 'Random' + parseInt(Math.random() * 10)
      // })
      console.log(this.persons)
      this.$forceUpdate();
    },
    handleChangeLen() {
      // this.persons.length = 3
      this.persons.splice(3)
    }
  },
  beforeUpdate() {
    console.log(this.persons)
  },
  updated() {
    console.log(this.persons)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
