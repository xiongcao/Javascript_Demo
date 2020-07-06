console.log('=========== Generator 让 遍历停下来 ==============')

function * loop () {
  for (let i = 0; i < 5; i++) {
    // yield console.log(i)
    
  }
}

// const l = loop()
// l.next()
// l.next()
// l.next()
// l.next()
// l.next()

console.log('=========== Generator 探讨 ==============')

// function * gen () {
//   let val
//   // val = yield 1
//   val = yield [1, 2, 3]
//   console.log(val)
// }

// const l = gen()
// l.next()
// l.next() // undefined

// function * gen () {
//   let val
//   val = yield * [1, 2, 3]
//   console.log(val)
// }

// const l = gen()
// console.log(l.next()) //{value: Array(3), done: false}
// console.log(l.next()) // {value: undefined, done: true}

// yield 没有返回值
// yield 后面加 “*” 号，则表明是 可迭代 的对象; value: 可遍历的对象， done： 是否结束


// function * gen () {
//   let val
//   val = yield [1, 2, 3]
//   console.log(val)
// }

// const l = gen()
// // {value: Array(3), done: false}, 20, {value: undefined, done: true}
// console.log(l.next(10))
// console.log(l.return(100)) // {value: 100, done: true}
// console.log(l.next(20))

// next 传入的参数 为 yidle 表达式的 值， 不传为 undefined 

console.log('=========== 使用场景一：抽奖 ==============')

// function draw (first = 1, second = 3, third = 5) {
//   let firstPrize = ['1A', '1B', '1C', '1D', '1E']
//   let secondPrize = ['2A', '2B', '2C', '2D', '2E', '2F', '2G', '2H']
//   let thirdPrize = ['3A', '3B', '3C', '3D', '3E', '3F', '3G', '3K', '3O']
//   let result = []
//   let random
//   // 抽一等奖
//   for (let i = 0; i < first; i++) {
//     random = Math.floor(Math.random() * firstPrize.length)
//     result = result.concat(firstPrize.splice(random, 1))
//   }

//   // 抽二等奖
//   for (let i = 0; i < second; i++) {
//     random = Math.floor(Math.random() * secondPrize.length)
//     result = result.concat(secondPrize.splice(random, 1))
//   }

//   // 抽三等奖
//   for (let i = 0; i < third; i++) {
//     random = Math.floor(Math.random() * thirdPrize.length)
//     result = result.concat(thirdPrize.splice(random, 1))
//   }
//   return result
// }

// let t = draw()
// for (const value of t) {
//   console.log(value)
// }


function * draw (first = 1, second = 3, third = 5) {
  let firstPrize = ['1A', '1B', '1C', '1D', '1E']
  let secondPrize = ['2A', '2B', '2C', '2D', '2E', '2F', '2G', '2H']
  let thirdPrize = ['3A', '3B', '3C', '3D', '3E', '3F', '3G', '3K', '3O']
  let count = 0
  let random
  while (1) {
    if (count < first) {
      random = Math.floor(Math.random() * firstPrize.length)
      yield firstPrize[random]
      count++
      firstPrize.splice(random, 1)
    } else if (count < first + second) {
      random = Math.floor(Math.random() * secondPrize.length)
      yield secondPrize[random]
      count++
      secondPrize.splice(random, 1)
    }  else if (count < first + second + third) {
      random = Math.floor(Math.random() * thirdPrize.length)
      yield thirdPrize[random]
      count++
      thirdPrize.splice(random, 1)
    } else {
      return false;
    }
  }
}

let d = draw()
console.log(d.next().value)
console.log(d.next().value)
console.log(d.next().value)
console.log(d.next().value)
console.log(d.next().value)
console.log(d.next().value)
console.log(d.next().value)
console.log(d.next().value)
console.log(d.next().value)


console.log('=========== 使用场景二：游戏，数到某一个数的倍数就喝酒 ==============')
function * count (x = 1) {
  while (1) {
    if (x % 3 === 0) {
      yield x
    }
    x++
  }
}
let num = count()
console.log(num.next().value)
console.log(num.next().value)
console.log(num.next().value)
console.log(num.next().value)
console.log(num.next().value)
console.log(num.next().value)