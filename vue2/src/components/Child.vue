<template>
  <!-- <div id="app" v-once> -->
  <div id="child">
    {{ name }}
  </div>
</template>

<script>

export default {
  name: 'child',
  data() {
    return {
      name: '小明'
    };
  },
  created() {
    console.log('子组件中访问$parent: ', this.$parent.name)
  },
  methods: {
    hadnleChangeName() {
      this.name = '小红'
    }
  }
}
</script>

