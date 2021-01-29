<template>
  <div>
    <p>{{text}}</p>
    <p><input v-model="text" /></p>
  </div>
</template>

<script>
import { customRef, ref, shallowRef, isReactive, watchEffect, triggerRef } from 'vue';

export default {
  name: 'my-custom-ref',
  components: {
  },
  setup () {
    /***************** customRef ***************/
    // 创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。
    // 它需要一个工厂函数，该函数接收 track 和 trigger 函数作为参数，
    // 并应返回一个带有 get 和 set 的对象。
    const text = useDebounce('你好', 500)


    /***************** shallowRef ***************/
    // 创建一个 ref，它跟踪自己的 .value 更改，但不会使其值成为响应式的。
    const obj = ref({
      a: 1,
    })
    // 为obj赋值新对象，仍然是响应式
    obj.value = {
      b: 2
    }
    console.log(isReactive(obj.value)) // true

    const obj2 = shallowRef({
      a: 1,
    })
    // 为obj赋值新对象，丧失 响应式
    obj2.value = {
      b: 2
    }
    console.log(isReactive(obj2.value)) // false

    /***************** triggerRef ***************/
    // 手动执行与 shallowRef 关联的任何副作用。
    const person = shallowRef({
      name: '张三'
    })
    let name = '';
    watchEffect(() => {
      name = person.value.name;
      console.log(name)
    })

    person.value.name = '李四'; // watchEffect 检测不到改变
    triggerRef(person); // watchEffect 可以检测到 name的变化了

    return {
      text
    }
  }
}

function useDebounce(value, delay = 200) {
  let t = null;

  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newVal) {
        clearTimeout(t);
        t = setTimeout(() => {
          value = newVal;
          trigger();
        }, delay);
      }
    }
  });
}

</script>
