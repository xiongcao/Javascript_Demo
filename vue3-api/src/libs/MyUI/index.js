import MyButton from './MyButton.vue'
import MyInput from './MyInput.vue'

const components = [
  MyButton,
  MyInput
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