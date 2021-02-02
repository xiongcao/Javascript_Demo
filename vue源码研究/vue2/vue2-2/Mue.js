// import Observer from './Observer.js'

const compileUtil = {
  getVal(expr, vm) {
    return expr.split('.').reduce((data, currentVal) => {
      return data[currentVal];
    }, vm.$data);
  },
  setVal(expr, vm, inputVal) {
    return expr.split('.').reduce((data, currentVal) => {
      data[currentVal] = inputVal
    }, vm.$data);
  },
  getContentVal(expr, vm) {
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(args[1], vm);
    });
  },
  text(node, expr, vm) {
    // expr: 指令表达式，如 v-text="msg" 中的 msg的值
    // <span v-text=person.age></span>
    // <span>{{person.age}}</span>
    let value;
    if (expr.indexOf('{{') !== -1) {
      // {{ person.name }}
      value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {

        // 绑定观察者，将来数据发生变化 触发这里的回调 进行更新
        new Watcher(vm, args[1], (newVal) => {
          this.updater.textUpdater(node, this.getContentVal(expr, vm));
        });

        return this.getVal(args[1], vm);
      });
    } else {
      value = this.getVal(expr, vm);
    }
    this.updater.textUpdater(node, value);
  },
  html(node, expr, vm) {
    const value = this.getVal(expr, vm);
    new Watcher(vm, expr, (newVal) => {
      this.updater.htmlUpdater(node, newVal);
    });
    this.updater.htmlUpdater(node, value);
  },
  model(node, expr, vm) {
    const value = this.getVal(expr, vm);
    // 绑定更新函数 数据=》视图
    new Watcher(vm, expr, (newVal) => {
      this.updater.modelUpdater(node, newVal);
    });

    // 视图=》数据=》视图
    node.addEventListener('input', (e) => {
      this.setVal(expr, vm, e.target.value)
    }, false)
    this.updater.modelUpdater(node, value);
  },
  bind(node, expr, vm, attrName) {},
  on(node, expr, vm, eventName) {
    const eventFn = vm.$options.methods && vm.$options.methods[expr];
    node.addEventListener(eventName, eventFn.bind(vm), false)
  },
  updater: {
    textUpdater(node, value) {
      node.textContent = value;
    },
    htmlUpdater(node, value) {
      node.innerHTML = value;
    },
    modelUpdater(node, value) {
      node.value = value;
    }
  }
}


class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    // 1.获取文档碎片对象，放入内存中会减少页面的回流和重绘
    const fragment = this.node2Fragment(this.el);
    // 2.编译模板
    this.compile(fragment);
    // 3追加子元素到根元素
    this.el.appendChild(fragment);
  }

  compile(fragment) {
    // 1.获取子节点
    const childNodes = fragment.childNodes;
    [...childNodes].forEach(child => {
      if (this.isElementNode(child)) {
        // 元素节点，编译元素节点
        // console.log('元素节点：',child);
        this.compileElement(child);
      } else {
        // 文本节点，编译文本节点
        // console.log('文本节点：',child);
        this.compileText(child);
      }

      if (child.childNodes && child.childNodes.length) {
        this.compile(child)
      }
    })
  }

  compileElement(node) {
    const attributes = node.attributes;
    [...attributes].forEach(attr => {
      const { name, value } = attr;
      // 指令 v-text, v-html, v-mode, v-on:cick
      if (this.isDirective(name)) {
        // text, html, model, on:click
        const [, directive] = name.split('-');
        const [dirName, eventName] = directive.split(':');
        // 更新数据 数据驱动视图
        compileUtil[dirName](node, value, this.vm, eventName);

        // 删除有指令的标签上的属性
        node.removeAttribute('v-' + directive);
      } else if (this.isEventSimple(name)) { // @click="handleClick"
        let [, eventName] = name.split('@');
        compileUtil['on'](node, value, this.vm, eventName);
      }
    })
  }

  compileText(node) {
    const content = node.textContent;
    if (/\{\{(.+?)\}\}/.test(content)) {
      compileUtil['text'](node, content, this.vm);
    }
  }

  isDirective(attrName) {
    return attrName.startsWith('v-');
  }

  isEventSimple(attrName) {
    return attrName.startsWith('@');
  }

  node2Fragment(el) {
    const f = document.createDocumentFragment();
    let firstChild;
    while (firstChild = el.firstChild) {
      f.appendChild(firstChild);
    }
    return f;
  }

  isElementNode(node) {
    return node.nodeType === 1;
  }
}

class Mue {
  constructor(options) {
    this.$options = options;
    this.$el = options.el;
    this.$data = options.data;
    this.$computed = options.computed;

    if (this.$el) {
      // 1.实现一个数据观察者
      new Observer(this.$data);

      // 将 this.$data 代理到 this 上
      this.proxyData(this.$data);
      // this.initComputed();

      // 2.实现一个指令解析器
      new Compile(this.$el, this);
    }
  }

  // initComputed() {
  //   const vm = this;
  //   const $computed = vm.$options.computed;
  //   Object.keys($computed).forEach(key => {
  //     Object.defineProperty(vm, key, {
  //       enumerable: true,
  //       get: (typeof $computed[key] === 'function')
  //             ? $computed[key]
  //             : $computed[key].get
  //     })
  //   })
  // }

  proxyData(data) {
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        Object.defineProperty(this, key, {
          get() {
            return data[key]
          },
          set(newVal) {
            data[key] = newVal;
          }
        })
      }
    }
  }
}


// export default Mue;