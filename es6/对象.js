/** **************** ES6 **************** */
console.log('============ 对象浅拷贝 =============')
let x = 1; let y = 2
let obj = {
  x,
  [x + y]: 3,
  hello () {
    console.log('hello')
  }
}
obj.hello()

// 对象浅拷贝
let target = {
  // a: 11,
  // c: 33,
  // d: {
  //   d1: 44,
  //   d2: 55
  // }
}
let source = {
  a: 1,
  b: 2,
  d: {
    d3: 33
  }
}
Object.assign(target, source)
console.log(target)
// source.d.d3 = 3
// console.log(target)

// let { d } = { ...source }
// source.d.d3 = 3
// console.log(d)

console.log('============ 对象 可迭代 =============')

let grade = {
  'lilei': 96,
  'hanmeimei': 99
}

for (const key in grade) {
  if (grade.hasOwnProperty(key)) {
    const element = grade[key];
    console.log(element, '====')
  }
}

console.log(Object.keys(grade).filter(item => item === 'lilei'))
console.log(Object.values(grade).filter(item => item > 96))

for (const [k, v] of Object.entries(grade)) {
  console.log(k, v)
}

console.log('============ 对象 描述符 =============')
const data = {
  PortLand: '78',
  Dublin: '88',
  Lima: '58'
}

Object.defineProperty(data, 'Lima', {
  enumerable: false, // 不可枚举
  writable: false // 不可写，只读
})

console.log(Object.keys(data)) // ["PortLand", "Dublin"]
console.log(Object.getOwnPropertyDescriptors(data)) // {PortLand: {…}, Dublin: {…}, Lima: {…}}
console.log(Object.getOwnPropertyDescriptor(data, 'Lima')) // {value: "58", writable: false, enumerable: false, configurable: true}
data.Lima = 60
console.log(data.Lima) // 58