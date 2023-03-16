<script setup>
import Child from './Child.vue';
import { ref, onMounted, watchEffect } from 'vue';

const child = ref(null);

watchEffect(() => {
  console.log(child?.value?.count, 'child')
})

const handleAdd = () => {
  child.value.handleClick();
}

</script>

<template>
  <Child ref="child"/>
  <p>父组件的button</p>
  <button @click="handleAdd">ADD</button>
</template>
