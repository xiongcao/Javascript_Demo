console.log('*************** 数组解构 ****************');

// 本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。

// 只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值
// let [x, y, z] = new Set(['a', 'b', 'c']);
// x // "a"

// 允许指定默认值
// let [foo = true] = [];
// foo // true

// let [x, y = 'b'] = ['a']; // x='a', y='b'
// let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'

// ES6 内部使用严格相等运算符（===），判断一个位置是否有值。
// 所以，只有当一个数组成员严格等于undefined，默认值才会生效
// let [x = 1] = [undefined];
// x // 1

// let [x = 1] = [null];
// x // null

// 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值

// function f() {
//   console.log('aaa');
// }

// let [x = f()] = [1]; // 因为x能取到值，所以函数f根本不会执行

console.log('*************** 对象解构 ****************');

// 对象解构没有次序
// let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
// foo // "aaa"
// bar // "bbb"

// 解构对象的方法
// 例一
// let { log, sin, cos } = Math;
// console.log(log(10));

// // 例二
// const { error } = console;
// error('hello') // hello

// 取别名
// let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
// baz // "aaa"

// 默认值： 默认值生效的条件是，对象的属性值严格等于undefined。

// var {x: y = 3} = {x: 5};
// y // 5

// var { message: msg = 'Something went wrong' } = {};
// msg // "Something went wrong"


// var {x = 3} = {x: undefined};
// x // 3

// var {x = 3} = {x: null};
// x // null

// 注意点
// 1.将一个已经声明的变量用于解构赋值
// let x;
// {x} = {x: 1}; // SyntaxError: syntax error（js 引擎会将{x}理解成一个代码块）
// ({x} = {x: 1}); // 正确

// 2.允许等号左边的模式之中，不放置任何变量名
// ({} = [true, false]);
// ({} = 'abc');
// ({} = []);

// 3. 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构

// let arr = [1, 2, 3];
// let { 0: first, [arr.length - 1]: last } = arr;
// first // 1
// last // 3


console.log('*************** 字符串解构 ****************');

// 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

// const [a, b, c, d, e] = 'hello';
// a // "h"
// b // "e"
// c // "l"
// d // "l"
// e // "o"

// 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
// let {length : len} = 'hello';
// len // 5

console.log('*************** 数字和布尔值解构 ****************');

// 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象

// let { toString: s } = 123;
// s === Number.prototype.toString // true

// let { toString: s } = true;
// s === Boolean.prototype.toString // true

// 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。

// 由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错

// let { prop: x } = undefined; // TypeError
// let { prop: y } = null; // TypeError


console.log('*************** 函数参数解构 ****************');


// function add([x, y]) {
//   return x + y;
// }

// add([1, 2]); // 3

// [[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]

// 函数参数的解构也可以使用默认值。

// function move({x = 0, y = 0} = {}) {
//   return [x, y];
// }

// move({x: 3, y: 8}); // [3, 8]
// move({x: 3}); // [3, 0]
// move({}); // [0, 0]
// move(); // [0, 0]


console.log('*************** 圆括号问题 ****************');

// 不能使用圆括号的情况
// 1. 变量声明语句

// 全部报错
// let [(a)] = [1];

// let {x: (c)} = {};
// let ({x: c}) = {};
// let {(x: c)} = {};
// let {(x): c} = {};

// let { o: ({ p: p }) } = { o: { p: 2 } };

// 2. 函数参数： 函数参数也属于变量声明，因此不能带有圆括号。
// 报错
// function f([(z)]) { return z; }
// // 报错
// function f([z,(x)]) { return x; }

// 3.赋值语句的模式
// 全部报错
// ({ p: a }) = { p: 42 };
// ([a]) = [5];

// 可以使用圆括号的情况： 只有一种：赋值语句的非模式部分，可以使用圆括号
// [(b)] = [3]; // 正确
// ({ p: (d) } = {}); // 正确
// [(parseInt.prop)] = [3]; // 正确


console.log('*************** 用途 ****************');

// 1. 交换变量的值
// let x = 1;
// let y = 2;

// [x, y] = [y, x];

// 2. 从函数返回多个值

// 返回一个数组

// function example() {
//   return [1, 2, 3];
// }
// let [a, b, c] = example();

// 返回一个对象

// function example() {
//   return {
//     foo: 1,
//     bar: 2
//   };
// }
// let { foo, bar } = example();

// 3. 函数参数的定义

// 参数是一组有次序的值
// function f([x, y, z]) { ... }
// f([1, 2, 3]);

// // 参数是一组无次序的值
// function f({x, y, z}) { ... }
// f({z: 3, y: 2, x: 1});

// 4. 提取 JSON 数据
// let jsonData = {
//   id: 42,
//   status: "OK",
//   data: [867, 5309]
// };

// let { id, status, data: number } = jsonData;

// console.log(id, status, number);
// // 42, "OK", [867, 5309]

// 5. 函数参数的默认值
// function test({
//   complete = function () { },
//   crossDomain = false,
//   // ... more config
// } = {}) {
//   // ... do stuff
// };

// 6. 遍历 Map 结构

// const map = new Map();
// map.set('first', 'hello');
// map.set('second', 'world');

// console.log(map);

// for (let [key, value] of map) {
//   console.log(key + " is " + value);
// }
// // first is hello
// // second is world

// // 获取键名
// for (let [key] of map) {
//   // ...
// }

// // 获取键值
// for (let [,value] of map) {
//   // ...
// }

// 7. 输入模块的指定方法
// const { SourceMapConsumer, SourceNode } = require("source-map");