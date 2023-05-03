<script setup>
// import Parent from './components/ref/Parent.vue';
// import VModal from './components/vmodal/VModal.vue';
// import Tab from './components/directive/Tab.vue';
import DTab from './components/directive/DTab.vue';

import { ref } from 'vue';

  const list = ref([
    {name: '111', checked: true},
    {name: '222'},
    {name: '333'},
  ])

  const add = () => {
    list.value.push({name: '444'})
  }


</script>

<template>
  <!-- <Parent /> -->
  <!-- <VModal/>
  <Tab/> -->
  <DTab/>
  <template v-for="item in list">
    <h1 :style="{color: item.checked ? 'red' : 'black'} ">{{item.name}}</h1>
  </template>
  
  <button @click="add">Add</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
