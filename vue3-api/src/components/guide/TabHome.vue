<template>
  <div class="demo-tab">Home component</div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  created () {
    console.log('组件来了')
  },
  unmounted () {
    console.log('组件被销毁了')
  }
}
</script>