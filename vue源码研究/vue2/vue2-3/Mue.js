class Mue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    this.$options = options;

    if(this.$el) {
      // 1.实现一个数据的观察者
      new Observer(this.$data)
      // 2.实现一个compile 编译器
      new Compile(this.$el, this)
      // 3.将data代理到 当前实例
      this.proxyData()
    }
  }

  proxyData() {
    for (const key in this.$data) {
      Object.defineProperty(this, key, {
        get() {
          return this.$data[key]
        },
        set(newValue) {
          this.$data[key] = newValue;
        }
      })
    }
  }
}

class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    this.oldValue = this.getOldVal(vm, expr);
  }

  getOldVal(vm, expr) {
    // 将最新的 观察者 绑定到 订阅者上
    Dep.target = this;
    const value = compileUtils.getVal(vm, expr);
    // 清除 上一个 观察者
    Dep.target = null;
    return value
  }

  update() {
    // 获取最新的值
    const newValue = compileUtils.getVal(this.vm, this.expr);

    if (newValue !== this.oldValue) {
      this.cb(newValue);
    }
  }
}

class Dep {

  constructor() {
    this.subs = [];
  }

  // 订阅观察者
  addSubs(watcher) {
    this.subs.push(watcher)
  }

  // 通知观察者
  notify() {
    console.log('通知了观察者', this.subs);
    this.subs.forEach(w => w.update())
  }
}

class Observer {
  constructor(data) {
    this.observer(data);
  }

  observer(data) {
    if (data && typeof data === 'object') {
      Object.keys(data).forEach(key => {
        this.defindReactive(data, key, data[key]);
      })
    }
  }

  // 将数据变成响应式
  defindReactive(data, key, value) {
    // 递归遍历
    this.observer(value);

    const dep = new Dep();

    // 劫持属性，添加get，set方法
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get() {
        // 订阅数据变化，往Dep中添加观察者
        Dep.target && dep.addSubs(Dep.target)
        return value;
      },
      set: (newValue) => {
        if (newValue !== value) {
          value = newValue;
          this.observer(value)
          // 通知观察者，改变视图
          dep.notify()
        }
      }
    })
  }
}

class Compile {
  constructor(el, vm) {
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;

    // 创建文档碎片，将元素都放入内存中，可以减少页面的重绘和回流
    const fragment = this.createElementFragment(this.$el);

    // 编译元素
    this.compile(fragment);

    // 将文档碎片添加到根节点中
    this.$el.appendChild(fragment)
  }

  compile(node) {

    node.childNodes.forEach(child => {

      // 元素节点
      if (this.isElementNode(child)) {
        this.compileElementNode(child);
      } else if (this.isTextNode(child)) { // 文本节点
        this.compileTextNode(child);
      }

      if (child.childNodes && child.childNodes.length !== 0) {
        this.compile(child)
      }
    })

  }

  compileElementNode(node) {
    // 获取元素属性
    const attributes = node.attributes;
    [...attributes].forEach(attr => {
      // 获取属性名，值
      let { name, value } = attr;
      if (this.isDirective(name)) { // v-text v-html v-model v-bind: v-on:click
        // 获取指令名称
        let [, directive] = name.split('v-'); // text html model bind: on:click

        let [directiveName, eventName] = directive.split(':') // text html model on bind, click

        // 将指令 编译成 对应的数据
        compileUtils[directiveName](node, value, this.vm, eventName);

      } else if (this.isEventDirective(name)) { // @click, @change
        const eventName = name.slice(1);
        // 将指令 编译成 对应的数据
        compileUtils['on'](node, value, this.vm, eventName);
        
      } else if (this.isAttrDirective(name)) { // :src, :href, :class, :style
        const attrName = name.slice(1);
        compileUtils['bind'](node, value, this.vm, attrName);
      }

      // 将标签上的 指令 删除
      if (
          name.startsWith('v-text') ||
          name.startsWith('v-html') ||
          name.startsWith('v-model') ||
          name.startsWith('v-bind:') ||
          name.startsWith('v-on:click') ||
          name.startsWith(':') ||
          name.startsWith('@')
        ) {
        node.removeAttribute(name)
      }
    })
  }

  compileTextNode(node) {
    const content = node.textContent;
    if (/\{\{(.+?)\}\}/g.test(content)) {
      compileUtils['text'](node, content, this.vm);
    }
  }

  isDirective(name) {
    return name.startsWith('v-')
  }

  isAttrDirective(name) {
    return name.startsWith(':')
  }

  isEventDirective(name) {
    return name.startsWith('@')
  }

  createElementFragment(el) {
    const frgament = document.createDocumentFragment();
    let firstChild;

    while(firstChild = el.firstChild) {
      frgament.appendChild(firstChild)
    }

    return frgament;
  }

  isElementNode(node) {
    return node.nodeType === 1
  }

  isTextNode(node) {
    return node.nodeType === 3
  }
}

const compileUtils = {
  getVal(vm, expr) {
    return expr.split('.').reduce((data, currentVal) => { // [person, age]
      return data[currentVal]
    }, vm.$data)
  },
  setVal(vm, expr, inputVal) {
    expr.split('.').reduce((data, currentVal) => {
      console.log(data[currentVal]);
      if (typeof data[currentVal] === 'object') return data[currentVal];
      data[currentVal] = inputVal;
    }, vm.$data)
  },
  getContent(vm, expr) {
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(vm, args[1].trim())
    })
  },
  text(node, expr, vm) {

    let value;

    // 文本内容
    if (expr.indexOf('{{') !== -1) { // {{person.name}} -- {{person.age}}
      value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
        new Watcher(vm, args[1].trim(), (newValue) => {
          this.updater.text(node, this.getContent(vm, expr))
        })

        return this.getVal(vm, args[1].trim())
      })
    } else { // 指令内容 v-text
      value = this.getVal(vm, expr);
      new Watcher(vm, expr, (newValue) => {
        this.updater.text(node, newValue)
      })
    }

    this.updater.text(node, value)
  },
  html(node, expr, vm) {
    const value = this.getVal(vm, expr);
    new Watcher(vm, expr, (newValue) => {
      this.updater.html(node, newValue)
    })
    this.updater.html(node, value)
  },
  model(node, expr, vm) {
    const value = this.getVal(vm, expr);
    // 数据驱动视图
    new Watcher(vm, expr, (newValue) => {
      this.updater.model(node, newValue)
    })

    // 视图 => 数据 => 视图
    // 为当前有v-model 的元素，添加input事件
    node.addEventListener('input', (e) => {
      this.setVal(vm, expr, e.target.value)
    }, false);

    this.updater.model(node, value)
  },
  on(node, expr, vm, eventName) {
    const fn = vm.$options.methods[expr]
    node.addEventListener(eventName, fn.bind(vm), false);
  },
  bind(node, expr, vm, attr) {
    let value
    if (expr.indexOf("'") !== -1 || expr.indexOf('"') !== -1) {
      value = expr;
    } else {
      value = this.getVal(vm, expr);
    }
    new Watcher(vm, expr, (newValue) => {
      this.updater.bind(node, attr, newValue)
    })
    this.updater.bind(node, attr, value)
  },
  updater: {
    text(node, value) {
      node.textContent = value;
    },
    html(node, value) {
      node.innerHTML = value;
    },
    model(node, value) {
      node.value = value;
    },
    bind(node, attr, value) {
      node.setAttribute(attr, value);
    }
  }
}
