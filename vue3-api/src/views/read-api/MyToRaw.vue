<template>
  <div>
   <p>toRaw/markRaw</p>
  </div>
</template>

<script>
import { reactive, toRaw, markRaw, isReactive, isProxy } from 'vue';

export default {
  name: 'my-to-raw',
  setup () {
    console.log('/***************** toRaw ***************/')
    // 返回 reactive 或 readonly proxy 的原始对象。
    // 这是一个转义口，可用于临时读取而不会引起 proxy 访问/跟踪开销，也可用于写入而不会触发更改。
    // 不建议保留对原始对象的持久引用。请谨慎使用。
    const foo = {}
    const reactiveFoo = reactive(foo) // 响应式对象
    const rawFoo = toRaw(reactiveFoo); // 原始对象
    console.log(rawFoo === foo) // true
    foo.a = 111;
    console.log(rawFoo) // { a: 111 }


    console.log('/***************** markRaw ***************/')
    // 标记一个对象，使其永远不会转换为 proxy。返回对象本身。
    const obj = { a: 1, more: { b: 2 }}
    const rawObj = markRaw(obj)
    const proxyObj = reactive(rawObj)
    console.log(obj === rawObj) // true
    console.log(proxyObj === rawObj) // true
    console.log(isReactive(proxyObj)) // false
    console.log(isReactive(rawObj.more)) // false


    console.log('**************** bar ****************')
    // 嵌套在其他响应式对象中时也可以使用
    const bar = reactive({ rawObj })
    console.log(isReactive(bar)) // true
    console.log(bar.rawObj === rawObj) // true
    console.log(isReactive(bar.rawObj)) // false

    console.log('**************** baz ****************')
    const baz = reactive({
      more: rawObj.more
    })
    console.log(isReactive(baz)) // true
    console.log(isReactive(baz.more)) // true
    console.log(baz.more === rawObj.more); // false

  }
}
</script>
