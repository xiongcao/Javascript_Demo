<template>
  <!-- <div id="app" v-once> -->
  <div id="brother">
    {{ name }}
  </div>
</template>

<script>

export default {
  name: 'brother',
  data() {
    return {
      name: '小猪'
    };
  }
}
</script>

