<template>
  <div class="myRouter">
    <h2>myRouter</h2>

    <!-- <router-link to="/home">Home | </router-link>
    <router-link to="/about">About</router-link> -->
    <!-- <router-link :to="{ name: 'home'}">Home | </router-link>
    <router-link :to="{ name: 'about'}">About</router-link> -->


    <!-- 方式一：router-link的方式 -->
    <!-- <router-link :to="{ name: 'home', params: { name: 'Home'}}">Home | </router-link> -->

    <!-- <router-link to="/myRouter/about?name=About">About</router-link> -->
    <!-- <router-link :to="{ path: '/myRouter/about', query: { name: 'About' }}">About</router-link> -->
    <!-- <router-link :to="{ name: 'about', query: { name: 'About' }}">About</router-link> -->

    <!-- 方法二 编程式导航 -->
    <span @click="handleToPage('Home')">Home | </span>
    <span @click="handleToPage('About')">About</span>

    <router-view></router-view>
  </div>
</template>
<script>
export default {
  methods: {
    handleToPage(name) {
      if (name === "Home") {
        this.$router.push({
          path: '/myRouter/home/Home'
        });

        // this.$router.push({
        //   name: 'home',
        //   params: {
        //     name: 'Home'
        //   }
        // });
      } else {

        // this.$router.push({
        //   path: '/myRouter/about',
        //   query: { name: 'About'}
        // });

        this.$router.push({
          name: 'about',
          query: { name: 'About'}
        });
      }
    },
  },
};
</script>
<style>
span {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>
