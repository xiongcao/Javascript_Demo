<template>
  <div>
    <!-- <h2>{{$route.params.name}}</h2> -->
    <!-- <h2>Home</h2> -->
    <h2>{{name}}</h2>
  </div>
</template>
<script>
export default {
  props: {
    name: String
  }
}
</script>
