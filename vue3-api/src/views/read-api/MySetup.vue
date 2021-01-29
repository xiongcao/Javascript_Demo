<template>
  <div>
    <Test :title="title" @toggleTitle="handleToggleTitle"/>
    <div>count: {{ count }}</div>
    <div>count: {{ count }}</div>
    <div>
      <p>number: {{ number }}</p>
      <button @click="changeNumber">牙买得</button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from 'vue';
import Test from '../../components/read-api/Test'

export default {
  name: 'my-setup',
  components: {
    Test
  },
  setup () {
    const title = ref('我是vue');
    // setTimeout(() => {
    //   title.value = '我是vue3.0'
    // }, 500);

    const count = ref(1);
    count.value = 2;

    const state = reactive({
      number: 11
    })

    const changeNumber = () => {
      state.number++;
    }

    const handleToggleTitle = (v) => {
      title.value = v;
    }

    return {
      title,
      count,
      changeNumber,
      handleToggleTitle,
      ...toRefs(state),
    }
  }
}
</script>

<style>
</style>
