/** **************** ES5 **************** */

// 参数默认值
function fn1 (x, y, z) {
  if (y === undefined) {
    y = 2
  }
  if (z === undefined) {
    z = 3
  }
  console.log(arguments) // 实参个数
  return x + y + z
}
console.log(fn1(1))

/** **************** ES6 **************** */

function fn2 (x, y = 2, z = x + y) {
  // console.log(fn2.length) // 无默认值的参数个数，es6不让使用arguments
  return x * y * z
}
console.log(fn2(2))

function sum () {
  let num = 0
  // Array.prototype.forEach.call(arguments, item => { num += item }) // es5 的方式

  Array.from(arguments).forEach(item => { num += item }) // es6 的方法
  console.log(num) //
  return num
}
console.log(sum(1, 2, 3))

function sum2 (base, ...nums) {
  let num = 0
  nums.forEach(item => { num += item })
  return base * 2 + num
}

console.log(sum2(1, 2, 3))
