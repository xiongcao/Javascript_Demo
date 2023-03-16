<script setup>
import BaseLayout from './BaseLayout.vue';
</script>

<template>
  <BaseLayout>
    <template #header="headerSlots">
      <h1>Here might be a page title {{ headerSlots.count }}</h1>
    </template>

    <!-- 隐式的默认插槽 -->
    <template #default="mainSlots">
      <p>A paragraph for the main content. {{ mainSlots.id }}</p>
      <p>And another one.</p>
    </template>

    <template #footer="footerSlots">
      <p>Here's some contact info: {{ footerSlots.msg }}</p>
    </template>
  </BaseLayout>
</template>
