<template>
  <div>
    <Child />
  </div>
</template>

<script>

import Child from './Child'

export default {
  name: 'parent',
  components: {
    Child
  },
  setup (props, ctx) {

  }
}
</script>

