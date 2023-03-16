<script setup>
import { watchEffect, ref } from 'vue';
import CustomInput from './CustomInput.vue';

const searchText = ref('init');

watchEffect(() => {
  console.log(searchText.value, 'searchText')
})

const handleClick = () => {
  alert('parent')
}

</script>
<template>
  <CustomInput
    v-model="searchText"
    @click="handleClick"
    class="vmodal"
    id="vmodal"
    style="color: red"
    data-id="testid"
  />
  <h3>{{searchText}}</h3>
</template>


