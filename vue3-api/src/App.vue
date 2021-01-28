<template>
  <div>
    <!-- <my-setup/> -->
    <!-- <my-reactive/> -->
    <!-- <my-ref/> -->
    <!-- <my-to-ref/> -->
    <!-- <my-custom-ref/> -->
    <!-- <my-computed/> -->
    <!-- <my-watch-effect/> -->
    <!-- <my-watch/> -->
    <!-- <my-basic-api/> -->
    <!-- <my-to-raw/> -->
    <!-- <my-life-cycle/> -->
    <!-- <my-provide/> -->
    <!-- <my-dom-ref/> -->
    <!-- <my-directive/> -->
    <my-component/>
  </div>
</template>

<script>
import MySetup from './views/MySetup';
import MyReactive from './views/MyReactive';
import MyRef from './views/MyRef';
import MyToRef from './views/MyToRef';
import MyCustomRef from './views/MyCustomRef';
import MyComputed from './views/MyComputed';
import MyWatchEffect from './views/MyWatchEffect';
import MyWatch from './views/MyWatch';
import MyBasicApi from './views/MyBasicApi';
import MyToRaw from './views/MyToRaw';
import MyLifeCycle from './views/MyLifeCycle';
import MyProvide from './views/MyProvide';
import MyDomRef from './views/MyDomRef';
import MyDirective from './views/MyDirective';
import MyComponent from './views/MyComponent';
import { getCurrentInstance } from 'vue';

export default {
  name: 'App',
  components: {
    MySetup,
    MyReactive,
    MyRef,
    MyToRef,
    MyCustomRef,
    MyComputed,
    MyWatchEffect,
    MyWatch,
    MyBasicApi,
    MyToRaw,
    MyLifeCycle,
    MyProvide,
    MyDomRef,
    MyDirective,
    MyComponent
  },
  setup() {
    const { ctx } = getCurrentInstance()

    // console.log('setup in ', ctx.$http())
  },
  custom: 'hello custom options',
  created() {
    // console.log('app: ',this.$options.custom)

    // console.log('options api ', this.$http()) // globalProperties $http
  }
}
</script>

