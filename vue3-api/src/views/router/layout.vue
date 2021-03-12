<template>
  <div class="layout">
    <h1>layout</h1>
    <router-view name="head"></router-view>
    <router-view name="main"></router-view>
    <router-view name="foot"></router-view>
  </div>
</template>
<script>
export default {
 
};
</script>
<style>
span {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>
