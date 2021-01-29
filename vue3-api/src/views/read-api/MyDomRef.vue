<template>
  <div>
    <h1 ref="domRef">domRef</h1>
    <button @click="handleClickDom">change domRef</button>

    <ul>
      <li 
        v-for="(item, index) in students"
        :key="index"
        :ref="(el) => { if(el) refLiDomList[index] = el }"
      >
        {{ item.name }}
      </li>
    </ul>

    <Child ref="childRef"/>

    <p>parent:</p>
    <button @click="handleChangeTitle">change title</button>
  </div>
</template>

<script>
import { inject, ref, onMounted, reactive } from 'vue';

import Child from '../../components/read-api/Child'

export default {
  name: 'my-dom-ref',
  components: {
    Child
  },
  setup (props, ctx) {
    const domRef = ref(null);
    const students = reactive([
      {
        id: 1,
        name: '张三'
      },
      {
        id: 2,
        name: '李四'
      },
      {
        id: 3,
        name: '王五'
      }
    ])

    const refLiDomList = ref([])

    onMounted(() => {
      console.log(domRef.value)
      console.log(refLiDomList.value[0].innerText = '阿瓜')
    });

    const handleClickDom = () => {
      domRef.value.innerText = '你好，世界！'
    }

    const childRef = ref(null)


    const handleChangeTitle = () => {
      childRef.value.changeTitle()
    }

    return {
      domRef,
      childRef,
      students,
      refLiDomList,
      handleClickDom,
      handleChangeTitle
    }
  }
}
</script>

