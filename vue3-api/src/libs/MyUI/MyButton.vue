<template>
  <button class="my-button">
    <slot></slot>
  </button>
</template>

<script>
import {  } from 'vue';

export default {
  name: 'my-button',
  setup () {
  }
}
</script>
<style>
.my-button {
  outline: none;
  border: 1px solid red;
}
</style>
