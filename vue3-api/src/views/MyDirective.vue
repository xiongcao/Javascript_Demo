<template>
  <div>
    <h1>directive</h1>

    <h2>原始方式</h2>
    <div class="tab" @click="handleClickTab">
      <button data-idx="0" :class="['tab-item', { 'tab-active' : idx === 0 }]">选项1</button>
      <button data-idx="1" :class="['tab-item', { 'tab-active' : idx === 1}]">选项2</button>
      <button data-idx="2" :class="['tab-item', { 'tab-active' : idx === 2 }]">选项3</button>
    </div>

    <h2>自定义指令方式</h2>
    <div 
      class="tab" 
      v-tab="{
        className: 'tab-item',
        activeClass: 'tab-active',
        idx
      }"
      @click="handleClickTab">
      <button data-idx="0" class="tab-item">选项1</button>
      <button data-idx="1" class="tab-item">选项2</button>
      <button data-idx="2" class="tab-item">选项3</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

import { tab } from '../directives'

export default {
  name: 'my-directive',
  directives: {
    'tab': tab
  },
  setup() {

    const idx = ref(0)

    const handleClickTab = (e) => {

      const tar = e.target;
      const className = tar.className;

      if (className === 'tab-item') {
        idx.value = parseInt(tar.dataset.idx);
      }
    }
    
    return {
      idx,
      handleClickTab
    }
  }
}
</script>

<style>
.tab  {
  display: flex;
}

.tab-item {
  border: 1px solid green;
  outline: none;
  border-left: none;
  cursor: pointer;
}

.tab-item:first-child {
  /* box-shadow: -1px 0 green; */
  border-left: 1px solid green;
}

.tab-item.tab-active {
  box-shadow: -1px 0 red;
  border-color: red;
  color: red;
}

.tab-item.tab-active:first-child {
  /* box-shadow: -1px 0 0 0 red; */
  box-shadow: none;
}
</style>
