console.log('=========== Reflect 反射机制 ============')

// 通俗理解：java的反射机制是 在编译阶段不知道是哪个类被加载，而是在运行的时候才加载、执行

// call、apply、bind 用法与区别

// 第一个参数都是 this 的指向对象
// 第二个参数：
// call: 以逗号隔开
// apply: 所有参数都必须放在一个数组里面
// bind: 返回是函数以外，它 的参数和 call 一样

// ES5 的 做法
Math.floor.apply(null, [1.72]) // 1

// ES6 的 做法
Reflect.apply(Math.floor, null, [1.72]) // 1

// 场景： 购物，金额大于100，向下取整， 小于100 向上取整

let price = 101.5

// ES5 的 做法

if (price > 100) {
  price = Math.floor.apply(null, [price])
} else {
  price = Math.ceil.apply(null, [price])
}

// ES6 的 做法
price = Reflect.apply(price > 100 ? Math.floor : Math.ceil, null, [price])


console.log('=========== 通过 Reflect 实例化 类 的对象 ============')

let d = Reflect.construct(Date, [])
console.log(d.getTime(), d instanceof Date)


console.log('=========== 通过 Reflect 定义对象属性 ============')

// w3c 规定，之前部署在Object上的方法 都会迁移到 Reflect上

// 添加属性
const student = {}
const r1 = Object.defineProperty(student, 'name', { value: 'Mike' }) // {name: "Mike"}
const r2 = Reflect .defineProperty(student, 'name', { value: 'Mike' }) // true

Reflect.set(student, 'age', 18)

console.log(student, r1, r2)

// 删除属性
const obj = { x: 1, y: 2 }
Reflect.deleteProperty(obj, 'x')
console.log(obj) // {y: 2}

// 读取属性
Reflect.get(obj, 'y') // 2

Reflect.get([1, 2, 3], 1) // 2

let obj2 = { x: 1, y: 2 }
const r4 = Reflect.getOwnPropertyDescriptor(obj2, 'x')
console.log(r4) // {value: 1, writable: true, enumerable: true, configurable: true}


console.log('======= 通过 Reflect 查找 对象原型链 的 方法 =======')

let d1 = new Date()
const r5 = Reflect.getPrototypeOf(d);
console.log(r5)

// has 是 Reflect 特有的方法， Ojbect 没有

Reflect.has(obj2, 'x') // true

Reflect.has(obj2, 'z') // false

// isExtensible 判断对象是否 可扩展

console.log(Reflect.isExtensible(obj2)) // true

// 冻结对象，阻止扩展
Object.freeze(obj2) 
// Reflect.preventExtensions(obj2)

obj2.z = 3

console.log(Reflect.isExtensible(obj2)) // false

console.log(obj2) // {x: 1, y: 2}

// 获取 对象 自身 的属性，过滤 原型链 上的 属性
console.log(Reflect.ownKeys(obj2)) // ["x", "y"]
console.log(Reflect.ownKeys([1, 2])) // ["0", "1", "length"]

console.log('======= 通过 Reflect 修改 对象 的 原型 =======')

const arr = ['xxx', 'yyy']

Reflect.setPrototypeOf(arr, String.prototype)

console.log(Reflect.getPrototypeOf(arr))