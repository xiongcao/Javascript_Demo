<template>
  <div>
    <h1>read-api</h1>
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
    <!-- <my-component/> -->
  </div>
</template>

<script>
import MySetup from './MySetup';
import MyReactive from './MyReactive';
import MyRef from './MyRef';
import MyToRef from './MyToRef';
import MyCustomRef from './MyCustomRef';
import MyComputed from './MyComputed';
import MyWatchEffect from './MyWatchEffect';
import MyWatch from './MyWatch';
import MyBasicApi from './MyBasicApi';
import MyToRaw from './MyToRaw';
import MyLifeCycle from './MyLifeCycle';
import MyProvide from './MyProvide';
import MyDomRef from './MyDomRef';
import MyDirective from './MyDirective';
import MyComponent from './MyComponent';
import { getCurrentInstance } from 'vue';

export default {
  name: 'read-api',
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

