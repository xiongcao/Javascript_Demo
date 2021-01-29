import MyButton from './button/MyButton.vue'
import MyInput from './input/MyInput.vue'
import Carousel from './carousel/index.vue'

const components = [
  MyButton,
  MyInput,
  Carousel
]

export default {
  install (app, options) {
    if (options.components) {
      options.components.map(compName => {
        components.forEach(comp => {
          if(compName === comp.name) {
            app.component(comp.name, comp)
          }
        })
      })
    } else {

      // 注册组件
      // app.component(MyButton.name, MyButton)
      // app.component(MyInput.name, MyInput)
  
      // 注册组件
      components.map(comp => app.component(comp.name, comp))
    }
  }
}