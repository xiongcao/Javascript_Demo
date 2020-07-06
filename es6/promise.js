// 异步加载javscript
function loadScript(src, callback) {
  let script = document.createElement('script')
  script.src = src
  script.onload = () => {
    callback(src)
  }
  document.head.append(script)
}

function test(name) {
  console.log(name)
}

// 回调地狱
// loadScript('./js/1.js', function (script) {
//   console.log(script)
//   loadScript('./js/2.js', function (script) {
//     console.log(script)
//     loadScript('./js/3.js', function (script) {
//       console.log(script)
//     })
//   })
// })

// Promise 救世主
function loadScript1(src) {
  // pending => undefined
  return new Promise((resovle, reject) => {
    let script = document.createElement('script')
    script.src = src
    script.onload = () => { // fulfilled => result
      resovle(src)
    }
    script.onerror = (err) => { // rejected => error
      reject(err)
    }
    document.head.append(script)
  })
}

console.log('================= 分割线 ================')

// loadScript1('./js/1.js')
//   .then(loadScript1('./js/2.js'))
//   .then(loadScript1('./js/3.js'))


console.log('=========== Promise then 原理 ============')

// 1. then 是 Promise 原型上的方法
// 2. then 的两个参数为函数类型，第一个必选，第二个可选
// 3. then 的两个参数如果为空函数，会返回一个新的 promise 实例，即可连续使用then
// promise.then(onFulfilled, onRejected)

// loadScript1('./js/1.js')
//   .then(() => {
//     return loadScript1('./js/4.js')
//   }, (err) => {
//     console.log(err)
//   })
//   .then(() => {
//     loadScript1('./js/3.js')
//   }, (err) => {
//     console.log(err)
//   })

console.log('=========== 基本类型转换为 Promise 类型 ============')

function handleType(flag) {
  if (flag) {
    return new Promise()
  } else {
    return Promise.resolve(10)
  }
}

console.log('=========== Promise catch ============')
// 1. catch 是 Promise 原型上的 实例 方法
// 2. 需要使用 reject 方法触发错误，而不是 throw new Error

// loadScript1('./js/1.js')
//   .then(() => {
//     return loadScript1('./js/2.js')
//   })
//   .then(() => {
//     return loadScript1('./js/3.js')
//   })
//   .catch(err => {
//     console.log(err)
//   })


console.log('=========== Promise 并行 ============')

const p1 = Promise.resolve(1)
const p2 = Promise.resolve(2)
const p3 = Promise.resolve(3)

// 不知道哪一个先结束，只是把三个接口的数据整合一下，注意，有一个失败就全挂了
Promise.all([p1, p2, p3]).then((value) => {
  // console.log(value) // [1, 2, 3]
})

console.log('=========== Promise 先到先得 ============')

const pm1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 500)
  })
}

const pm2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2)
    }, 10)
  })
}

Promise.race([pm1(), pm2()]).then((value) => {
  console.log(value)
})