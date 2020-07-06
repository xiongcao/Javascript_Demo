console.log('=========== Proxy 代理 ============')

let o = {
  name: 'xiaoming',
  price: 190
}

// let d = new Proxy(o, {

//   /**
//    * 
//    * @param {*} target 代理的对象
//    * @param {*} key 
//    */
//   get(target, key) {
//     if (key === 'price') {
//       return target[key] + 20
//     }
//     return target[key]
//   }
// })


let d = new Proxy(o, {

  get(target, key) {
    if (key === 'price') {
      return target[key]
    }
  },
  set(target, key, value) {
    return false
  }
})

d.price = 300

console.log(d.price, d.name)

console.log('=========== Proxy ES5 的实现 ============')

for (const [key] of Object.entries(o)) {
  Object.defineProperty(o, key, {
    writable: false
  })
}
o.price = 300

console.log(o.name, o.price)

console.log('=========== 场景实现 校验 ============')

let obj = {
  name: 'xiaoming',
  price: 190
}

let validator = (target, key, value) => {
  if (Reflect.has(target, key)) {
    if (key === 'price') {
      if (value > 300) {
        throw new TypeError('price exceed 300!')
        // return false
      } else {
        target[key] = value
      }
    } else {
      target[key] = value
    }
  } else {
    return false
  }
}

let p = new Proxy(obj, {
  get(target, key) {
    return target[key] || ''
  },
  set: validator
})

// window.addEventListener('error',(e) => {
//   console.log(e.message)
// }, true)

try {
  p.price = 310
} catch (error) {
  console.log(error.message)
}
p.name = 'xiaokeai'
p.age = 18

console.log(p.price, p.name, p.age) // 190 "xiaokeai" ""


console.log('=========== 场景实现 为组件赋值 ID ============')

// 为 组件 生成 唯一 且 只读 的 ID

class Component {
  constructor () {
    this.Proxy = new Proxy({
      id: Math.random().toString(36).slice(-8)
    }, {})
  }

  get id () {
    return this.Proxy.id
  }
}

let com = new Component()
let com2 = new Component()

for (let i = 0; i < 10; i++) {
  console.log(com.id, com2.id)
}
com.id = 'abcd'
console.log(com.id, com2.id)

console.log('=========== 撤销代理 ============')

let m = {
  name: 'xiaoming',
  price: 190
}

let n = Proxy.revocable(m, {
  get(target, key) {
    if (key === 'price') {
      return target[key] + 20
    } else {
      return target[key]
    }
  }
})

console.log(n.proxy.price, n)

setTimeout(() => {
  n.revoke()
  setTimeout(() => {
    console.log(n.proxy.price)
  })
})