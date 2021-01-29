<template>
  <input type="text" class="my-input" :placeholder="placeholderText"/>
</template>

<script>

export default {
  name: 'my-input',
  props: {
    placeholderText: {
      type: String,
      default: '请输入。。。'
    }
  },
  setup () {
  }
}
</script>
<style>
.my-input {
  outline: none;
  border: 1px solid red;
}
</style>
