<template>
  <div>
    <p>{{ count }}</p>
    <h1 ref="myRef"></h1>
  </div>
</template>

<script>
import { watchEffect, ref, onBeforeUpdate, onMounted } from 'vue';

export default {
  name: 'my-watch-effect',
  setup () {
    /***************** watchEffect ***************/
    // 在响应式地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它。
    const count = ref(0);
    const myRef = ref(null);

    setTimeout(() => {
      count.value = 1;
    }, 100);

    // setTimeout(() => {
    //   count.value = 2;
    // }, 300);

    // 组件更新之前，属性更改之后 调用。在onBeforeUpdate之前调用;
    // 第一次运行在onMounted之前
    const stop = watchEffect((onInvalidate) => {
      // 在onInvalidate 之后 执行
      console.log('count: ', count.value); // 0, 1
      console.log('myRef: ', myRef.value); // pre情况下为null
     
      // 触发条件：1.副作用即将重新执行时；2.侦听器被停止
      onInvalidate(() => {
        console.log('onInvalidate is triggered');
      });
    }, {
      // 默认：pre，在onBeforeUpdate之前执行；
      // flush: 'post', // onBeforeUpdate之后执行
      
      // onTrack 和 onTrigger 只能在开发模式下工作。

      // 将在响应式 property 或 ref 作为依赖项被追踪时被调用。在第一次渲染时也执行
      onTrack(e) {
        console.log('track', e)
      },
      // 将在依赖项变更导致副作用被触发时被调用。在第一次渲染时不执行
      onTrigger(e) {
        console.log('trigger', e);
        // debugger
      }
    });

    onMounted(() => {
      console.log('onMounted')
      watchEffect(() => {
        console.log('onMounted-myRef: ', myRef.value); // h1
      });
    });

    onBeforeUpdate(() => {
      console.log('onBeforeUpdate')
    });

    // setTimeout(() => {
    //   stop(); // 停止watcher
    //   console.log('watchEffect is stoped');
    // }, 200);

    return {
      count,
      myRef
    }
  }
}
</script>
