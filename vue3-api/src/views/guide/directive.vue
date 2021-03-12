<template>
  <input v-focus="{name: 'focus指令'}" />
</template>
<script>
import { focus } from '../../directives'
export default {
  directives: {
    focus
  },
  data() {
    return {
 
    };
  },
  created() {
    console.log(111)
  },
  mounted(){
    console.log(333)
  }
};
</script>
<style>
</style>
