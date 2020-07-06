/** **************** ES5 **************** */
let arr = [1, 2, 3, 4]
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 2) {
    continue
  } else {
    break
  }
}

arr.forEach((item, i) => {
  // 无法使用 continue、break ,报错
})

arr.every((item) => {
  if (item === 2) { // 无法使用 continue、break
    return true
  } else {
    return false
  }
})

// for in 主要用于遍历对象， 虽然能遍历数组，但是有缺陷
arr.a = 8
for (const index in arr) {
  if (index === '2') {
    continue
  }
  // console.log(index, arr[index])
}

// 转换类数组
// [].splice.call(arguments)
// [].splice.call(document.querySelectorAll('img'))

// 查找所有符合条件的数组元素
[1, 2, 3, 4].filter((item) => item > 2) // [3,4]

/** **************** ES6 **************** */

// for of 可用于遍历类数组、伪数组
// for (const item of arr) {
//   console.log(item)
// }

// 转换类数组
// Array.from(arguments)
// Array.from(document.querySelectorAll('img'))

// 初始化填充默认值
Array.from({
  length: 3
}, () => 1) // [1,1,1]

Array.of(1, 2, 3) // [1,2,3]

// Array(lenght).fill(value [, start, end])
Array(3).fill(1); // [1,1,1]

// 替换数组成员
[1, 2, 3].fill(8, 1, 2); // [1,8,3]

// 查找符合条件的 第一个 数组元素
[1, 2, 3, 4].find((item) => item > 2); // 3

// 查找符合条件的 第一个 数组元素 所在的 index
[1, 2, 3, 4].findIndex((item) => item > 2) // 2

/** ************** ES6 结构赋值 ************** */

let lists = [1, 2, 3, 4, 5]
let str = 'abcde'
let set = new Set([1, 2, 3, 4, 5])

// let [first,, third] = lists
// console.log(first, third) // 1 3

// let [first,, third] = str
// console.log(first, third) // a c

// let [first,, third] = set
// console.log(first, third) // 1 3

// 总结： 左边是数组，右边是可遍历的数据

let user = {
  name: 's',
  surname: 't'
};
// [user.name, user.surname] = [1, 2]
// console.log(user) // {name: 1, surname: 2}

for (let [key, val] of Object.entries(user)) {
  // console.log(key, val) // name s, surname t
}
