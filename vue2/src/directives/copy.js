// 需求：实现一键复制文本内容，用于鼠标右键粘贴。

// 思路：
// 1.动态创建 textarea 标签，并设置 readOnly 属性及移出可视区域
// 2.将要复制的值赋给 textarea 标签的 value 属性，并插入到 body
// 3.选中值 textarea 并复制
// 4.将 body 中插入的 textarea 移除
// 5.在第一次调用时绑定事件，在解绑时移除事件


export default {
  // 只调用一次，指令第一次绑定到元素时调用，可以定义一个在绑定时执行一次的初始化动作。
  bind(el, { value }) {
    el.$value = value

    el.handler = () => {
      if (!el.$value) {
        console.log('没有复制内容');
        return;
      }
      
      // 动态创建 textarea 标签
      const $textarea = document.createElement('textarea')

      $textarea.readOnly = true
      $textarea.style.position = 'absolute'
      $textarea.style.left = '-9999px'

      // 将要copy的值赋给 textarea 的 value 属性
      $textarea.value = el.$value
      // 将textarea 插入到 body 中
      document.body.append($textarea)

      // 选中值
      $textarea.select();
      // 执行复制命令
      const result = document.execCommand('copy')
      if (result) {
        console.log('复制成功');
      }
      document.body.removeChild($textarea);
    }

    // 绑定监听事件，即所谓的一键复制
    el.addEventListener('click', el.handler)
   
  },
  // 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
  inserted() {

  },
  // 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值。
  update() {
    console.log(111);
  },
  // 被绑定元素所在模板完成一次更新周期时调用。
  componentUpdate(el, { value }) {
    console.log(el, value);

  },
  // 只调用一次， 指令与元素解绑时调用。
  unbind(el) {
    el.removeEventListener('click', el.handler)
  }

}