<template>
  <div class="parent">
    <h2>This is a parent component</h2>
    <teleport to="#app">
      <child-component name="John" />
    </teleport>
  </div>
</template>
<script>

import ChildComponent from '../../components/guide/Child-Component'

export default {
  components: {
    ChildComponent
  },
  data() {
    return {
 
    };
  },
  created() {
  }
};

</script>