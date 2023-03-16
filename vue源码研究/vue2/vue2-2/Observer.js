class Observer {
  constructor(data) {
    this.observer(data);
  }

  observer(data) {
    if (data && typeof data === 'object') {
      Object.keys(data).forEach(key => {
        this.defineReactive(data, key, data[key])
      })
    }
  }

  // watcher 订阅者
  // Dep 订阅器

  defineReactive(obj, key, value) {
    // 递归 遍历属性
    this.observer(value);
    const dep = new Dep();
    // 劫持并监听所有的属性
    Object.defineProperty(obj, key, {
      enumerable: true,
      get() {
        // 订阅数据变化时，往 Dep 中添加观察者
        // 往Dep中收集依赖（属性/观察者），一个属性对应一个观察者
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set: newVal => {
        this.observer(newVal);
        if (newVal !== value) {
          value = newVal;
        }
        // 告诉Dep，通知变化
        dep.notify();
      }
    })
  }
}

class Dep {
  constructor() {
    this.subs = [];
  }

  // 收集观察者
  addSub(watcher) {
    this.subs.push(watcher);
  }

  // 通知观察者去更新
  notify() {
    console.log('通知了观察者', this.subs);
    this.subs.forEach(w => {
      w.update()
    })
  }

}

class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    // 保存旧值
    this.oldVal = this.getOldVal();
  }

  getOldVal() {
    Dep.target = this;
    const oldVal = compileUtil.getVal(this.expr, this.vm);
    Dep.target = null;
    return oldVal;
  }

  update() {
    const newVal = compileUtil.getVal(this.expr, this.vm);
    if(newVal !== this.oldVal) {
      this.cb(newVal)
    }
  }
}

// export default Observer;