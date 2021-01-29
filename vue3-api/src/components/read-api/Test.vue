<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="handleToggleTitle">切换标题</button>
  </div>
</template>

<script>
import { watchEffect, watch } from 'vue';

export default {
  name: 'test',
  props: {
    title: String
  },
  emit: ['toggle-title'],
  setup (props, ctx) {
    // 1.不要在 上面括号内 和 这儿 解构props，否则没有响应式
    // 2.不要在子组件里更改props

    console.log(ctx.attrs)
    /**
     * ctx 有以下被代理（proxy）的对象
     * attrs:  有props(name下面那个)就没我
     * emit:   自定义事件
     * expose:
     * props:
     * slots:
     */

    // 开始渲染和数据改变时执行
    // watchEffect(() => {
    //   console.log(props.title)
    // })

    // 变化的时候才执行
    watch(() => props.title, 
    (newValue) => {
      console.log(newValue)
    })

    const handleToggleTitle = () => {
      const { title } = props;
      ctx.emit('toggle-title', title.includes('3') ? '我是vue' : '我是vue3.0')
    }

    return {
      handleToggleTitle
    }

  }
}
</script>
