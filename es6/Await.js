console.log('=========== Async ==============')

// 1. async 函数的返回值是 Promise 对象

async function firstAsync () {
  return 27
}

// 上面代码相当于
// function firstAsync () {
//   return Promise.resolve(27)
// }

console.log(firstAsync()) // Promise {<resolved>: 27}

firstAsync().then(val => {
  console.log(val) // 27
})

console.log('=========== Await ==============')

async function secondAsync () {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('now it is done')
    }, 1000)
  })

  console.log(await promise)
  console.log(await Promise.resolve(40))
  console.log(2)
  return 3
}

secondAsync().then(val => {
  console.log(val)
})