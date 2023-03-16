

<script>
export default {
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    handleClick() {
      this.count++;
    }
  }
}
</script>


<template>
  <div>
    <p>{{count}}</p>
    <button @click="handleClick">ADD</button>
  </div>
</template>
