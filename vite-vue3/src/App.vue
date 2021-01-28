<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Hello Vue 3.0 + Vite" />
  </div>
</template>

<script lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import { getData } from './services';
import '/@/assets/style.scss';

import { onMounted } from 'vue';

enum Gender {
  Male,
  Female
}

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup () {
    onMounted(async () => {
      const data = await getData();
      console.log(data)
    })
  }
}
</script>
