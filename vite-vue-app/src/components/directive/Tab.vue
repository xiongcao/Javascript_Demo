<script setup>
import { ref } from 'vue';

  const index = ref(0);

  const tabs = ref(['tab1', 'tab2', 'tab3'])

  const changeTab = (v) => {
    index.value = v;
  }

  
</script>

<template>
  <div class="tabWrapper">
    <template v-for="(tab, i) in tabs" :key="tab">
      <div
        :class="['tab', i === index && 'active']"
        @click="changeTab(i)"
      >{{tab}}</div>
    </template>
  </div>
</template>
<style lang="scss">
.tabWrapper {
  display: flex;

  .tab {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 100px;
    border: 1px solid #ccc;
    cursor: pointer;

    &:nth-child(2) {
      border-left: none;
      border-right: none;
    }

    &.active {
      background-color: green;
      color: #ffffff;
    }
  }
}
</style>