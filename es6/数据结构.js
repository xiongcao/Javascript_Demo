/** ************ Set 过滤重复数据 *************** */

let s = new Set()

// 增
s.add('hello').add('goodbye').add('hello') // Set(2) {"hello", "goodbye"}

// 删
// s.delete('hello') // Set(1) {"goodbye"}

// s.clear() // 清空

// console.log(s.has('hello'), s.size) // true 2

s.keys() // SetIterator {"hello", "goodbye"}
s.values() // SetIterator {"hello", "goodbye"}
s.entries() // SetIterator {"hello" => "hello", "goodbye" => "goodbye"}

s.forEach(item => {
  // console.log(item) // hello, goodbye
})

for (const item of s) {
  // console.log(item) // hello, goodbye
}

/** ************ Map 可遍历对象 *************** */
// let map = new Map([[1, 2], [3,4]]) [key, value]
let map = new Map()

map.set(1, 2) // Map(1) {1 => 2}
map.set(3, 4) // Map(2) {1 => 2, 3 => 4}
map.set(1, 3) // Map(2) {1 => 3, 3 => 4}

// map.delete(1) // Map(1) {3 => 4}
// map.clear() // Map(0) {}

// console.log(map.size, map.has(2)) // 2 false

map.keys() // MapIterator {1, 3}
map.values() // // MapIterator {3, 4}

map.forEach((val, key) => {
  console.log(val, key) // 3 1, 4, 3
})

for (const [key, value] of map) {
  console.log(key, value) // 3 1, 4, 3
}
