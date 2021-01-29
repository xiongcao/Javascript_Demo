<template>
  <div>
   <h1>LifeCycle</h1>
   <p ref="myRef">
    {{ count }}
    <button @click="count++">change</button>
   </p>
   <Test title="测试"/>
  </div>
</template>

<script>
import {
  ref, getCurrentInstance, watchEffect,
  onBeforeMount, onMounted, onBeforeUpdate, onUpdated,onBeforeUnmount, onUnmounted,
  onErrorCaptured, onRenderTracked, onRenderTriggered
 } from 'vue';

import Test from '../../components/read-api/Test'

export default {
  name: 'my-life-cycle',
  components: {
    Test
  },
  setup () {
    console.log('/***************** LifeCycle ***************/');
    const instance = getCurrentInstance(); // 获取当前组件实例

    console.log('instance', instance)

    const count = ref(0);
    const myRef = ref(null);
    
    onBeforeMount(() => {
      console.log('onBeforeMount')
    });

    onMounted(() => {
      console.log('onMounted')
    })

    watchEffect((onInvalidate) => {
      // 在两个 onBeforeUpdate 之前执行
      console.log('watchEffect', count.value)

      onInvalidate(() => {
        console.log('onInvalidate', count.value)
      })
    }, {
      // flush: 'post' , // 如果设置 为'post', 则在onBeforeUpdate之后执行
    });

    onBeforeUpdate(() => {
      console.log('onBeforeUpdate', count.value)
    })

    onUpdated(() => {
      console.log('onUpdate', count.value)
    });

    onBeforeUnmount(() => {
      console.log('onBeforeUnmount')
    });

    onUnmounted(() => {
      console.log('onUnmounted')
    })

    onErrorCaptured((e) => {
      // 捕获 子孙组件 的错误
      console.log('onErrorCaptured', e)
    });

    onRenderTracked((e) => {
      // 开发环境中使用
      // 将在响应式 property 或 ref 作为依赖项被追踪时被调用。在第一次渲染时也执行
      console.log('onRenderTracked', e)
    });

    onRenderTriggered((e) => {
      // 开发环境中使用
      // 将在依赖项变更导致副作用被触发时被调用。在第一次渲染时不执行
      console.log('onRenderTriggered', e)
    });

    return {
      count,
      myRef
    }
  }
}
</script>
