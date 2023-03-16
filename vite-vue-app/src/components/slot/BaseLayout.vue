<script setup>
  import { ref } from 'vue';

  const count = ref(0);
  const message = ref('hello world');
</script>

<template>

<div class="container">
  <header>
    <slot name="header" :count="count"></slot>
  </header>
  <main>
    <slot id="test">阿斯蒂芬</slot>
  </main>
  <footer>
    <slot name="footer" :msg="message"></slot>
  </footer>
</div>

</template>