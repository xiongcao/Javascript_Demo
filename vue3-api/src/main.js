import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import MyUI from './libs/MyUI'
import i18nPlugin from './plugins/i18n'

const app = createApp(App);

// 注册插件
app.use(MyUI, {
  // 按需加载组件
  components: [
    'my-button',
    'my-input',
    'carousel'
  ]
})

const i18nStrings = {
  greetings: {
    hi: 'Hallo!'
  }
}
app.use(i18nPlugin, i18nStrings)

// 注册全局prototype

// Vue2.x
// Vue.prototype.$http = () => {} 

// Vue3.x
app.config.globalProperties.$http = () => {
  return 'globalProperties $http'
}

// 性能追踪
// app.config.performance = true;

// 自定义options
app.config.optionMergeStrategies.custom = (toVal, fromVal) => {
  // console.log('fromVal:', fromVal, 'toVal:', toVal)
  return fromVal || toVal; // 使用子实例的值
  // return toVal || fromVal; // 使用父实例的值
}

app.mixin({
  custom: 'parent custom options!',
  created() {
    // console.log('main ',this.$options.custom) // => "hello!"
  }
})

app.use(router).use(store).mount('#app');