<template>
  <div>
    <p>count: {{count}}</p>
    <p>word.a: {{ word.a }} </p>
    <p>word.b: {{ word.b }} </p>
    <p>word.capital.A: {{ word.capital.A }} </p>
    <p>word.capital.B: {{ word.capital.B }} </p>
    <p>state.count: {{state.count}}</p>
    <p>state.word.a: {{ word.a }} </p>
    <p>state.word.b: {{ word.b }} </p>
    <p>state.word.capital.A: {{ state.word.capital.A }} </p>
    <p>state.word.capital.B: {{ state.word.capital.B }} </p>
  </div>
</template>

<script>
import { ref, reactive, isRef, unref } from 'vue';

export default {
  name: 'my-ref',
  setup () {
    /***************** ref ***************/
    const count = ref(1);
    const newCount = ref(2);

    // 如果是对象，使用的是 reactive 包装的 深度响应式 数据
    const word = ref({
      a: 1,
      b: 2,
      capital: {
        A: 1,
        B: 2,
      }
    })
    // 深度响应式
    word.value.capital.A = 'A';

    const state = reactive({
      word,
      count
    })
    // 覆盖count
    state.count = newCount;
    // state.count; // 2
    state.count = 3;
    // state.count; // 3

    /***************** unref ***************/
    const person = {
      name: '小明',
      age: 6
    }
    // const person = ref({
    //   name: '小明',
    //   age: 6
    // })
    const p = isRef(person) ? person.value : person;
    // unref 简化下面的操作
    const p1 = unref(person);
    console.log(p, p1)


    return {
      state,
      count,
      word
    }
  }
}
</script>
