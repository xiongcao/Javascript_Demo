<template>
  <div>
   <Parent :name="name"/>
   <input type="text" v-model="name" />
   <h2>page: {{ name }}</h2>
   <button @click="handleChange(1)">change name</button>
   <button @click="handleChange(2)">change age</button>
  </div>
</template>

<script>
import { provide, ref, reactive, readonly } from 'vue';

import Parent from '../../components/read-api/Parent'

export default {
  name: 'my-provide',
  components: { Parent },
  setup () {
    console.log('/***************** provide ***************/');
    let name = ref('provide');
    let person = reactive({
      name: '小明',
      age: 10
    })

    provide('name', readonly(name))
    provide('person', person)

    const handleChange = (e) => {
      if (e === 1) {
        person.name = '小红'
      } else {
        person.age = 18
      }
    }

    return {
      name,
      handleChange
    }
  }
}
</script>
