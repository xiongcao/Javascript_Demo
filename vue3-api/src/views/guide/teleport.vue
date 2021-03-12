<template>
  <div>
    <h1>Root instance</h1>
    <parent-component />

    <h1>在同一目标上使用多个 teleport </h1>
    <teleport to="#app">
      <div>A</div>
    </teleport>
    <teleport to="#app">
      <div>B</div>
    </teleport>
  </div>
</template>
<script>

import ParentComponent from '../../components/guide/Parent-Component'

export default {
  components: {
    ParentComponent
  },
  data() {
    return {
 
    };
  },
  created() {
  }
};

</script>
<style>
</style>
