<template>
  <div>
    <p>toRef/toRefs</p>
    <p>person.name: {{name}}</p>
    <p>person.age: {{age}}</p>
  </div>
</template>

<script>
import { ref, reactive, isRef, unref, toRef, toRefs } from 'vue';

export default {
  name: 'my-to-ref',
  setup () {
    /***************** toRef ***************/
    // 可以用来为源响应式对象上的 property 新创建一个 ref。
    // 然后可以将 ref 传递出去，从而保持对其源 property 的响应式连接。
    const state = reactive({
      foo: 1,
      bar: 2
    })

    const fooRef = toRef(state, 'foo')

    fooRef.value++
    console.log(state.foo) // 2

    state.foo++
    console.log(fooRef.value) // 3

    const res = useDoSomeThing(toRef(state, 'foo'))
    console.log(res);

    /***************** toRefs ***************/
    // 将响应式对象转换为普通对象，其中结果对象的每个 property 
    // 都是指向原始对象相应 property 的ref。
    const person = reactive({
      name: '小明',
      age: 6
    })
    const personAsRefs = toRefs(person);
    // 在不丢失响应性的情况下对返回的对象进行分解/扩散：
    const { name, age } = toRefs(person);
    
    // ref 和 原始property “链接”
    person.age++
    console.log(personAsRefs.age.value) // 7
    console.log(isRef(personAsRefs.name)) // true

    personAsRefs.age.value++
    console.log(person.age) // 8

    console.log(name.value, age.value) // 小明，8

    return {
      ...personAsRefs
    }

  }
}

function useDoSomeThing(field) {
  return `toRef的使用，字段值为：${field.value}`;
}
</script>
