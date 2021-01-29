<template>
  <div>
    <p>{{ count }}</p>
    <p>{{ name }}</p>
    <button @click="handleChange">change</button>
  </div>
</template>

<script>
import { watch, ref, onBeforeUpdate, onUpdated } from 'vue';

export default {
  name: 'my-watch',
  setup () {
    /***************** watch ***************/
    const count = ref(0);
    const name = ref('张三');

    // setTimeout(() => {
    //   count.value = 1;
    // }, 100);

    // setTimeout(() => {
    //   name.value = '李四';
    // }, 200);

    // 与 watchEffect 比较，watch 允许我们：
    // 1.懒执行副作用；
    // 2.更具体地说明什么状态应该触发侦听器重新运行；
    // 3.访问侦听状态变化前后的值。

    // 如果不是ref定义的属性，则需要手动return
    // watch(() => {
    //   return count.value;
    // }, (newVal, oldVal) => {
    //   console.log(newVal, oldVal) // 1, 0
    // })

    // 如果监听的数据是ref，那么可以简写为下面这种形式
    const stop = watch(count, (newVal, oldVal, onInvalidate) => {
      console.log(newVal, oldVal) // 1, 0

      onInvalidate(() => {
        console.log('onInvalidate');
      })
    })

    const handleChange = () => {
      count.value++;
    }

    setTimeout(stop, 2000);

    // 监听多个源
    // watch(() => {
    //   return [count.value, name.value]
    // }, ([newCount, newName], [oldCount, oldName]) => {
    //   console.log('newVal: ', newCount, newName)
    //   console.log('oldVal: ', oldCount, oldName)
    // }, {
    //   // flush: 'post',
    //   // onTrack(e) {},
    //   // onTrigger(e) {}
    // })


    // onBeforeUpdate(() => {
    //   console.log('onBeforeUpdate')
    // })

    // onUpdated(() => {
    //   console.log('onUpdated')
    // });


    return {
      count,
      name,
      handleChange
    }
  }
}
</script>
