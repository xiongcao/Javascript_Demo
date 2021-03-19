import copy from './copy'
import longpress from './longpress'
// 自定义指令
const directives = {
  copy, // 复制粘贴指令 v-copy
  longpress, // 长按指令 v-longpress
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}
