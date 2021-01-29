<template>
  <div>
    <h1>子孙组件：</h1>
    <p>{{name}}</p>
    <p v-if="person.name">{{person.name}}, {{person.age}}</p>

    <p>{{ title }}</p>
  </div>
</template>

<script>
import { inject, ref } from 'vue';

export default {
  name: 'child',
  setup (props, ctx) {
    const name = inject('name', 'hello world！')
    const person = inject('person', {})

    const title = ref('dom ref child')

    const changeTitle = () => {
      title.value = 'parent components use child componets method change title value!'
    }

    return {
      name,
      person,
      title,
      changeTitle
    }
  }
}
</script>

