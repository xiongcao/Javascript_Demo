console.log('********* Set **********')

// 1.基本用法

// 1.1 ES6 新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

// 1.2 Set本身是一个构造函数，用来生成 Set 数据结构。

var s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x)); // 不会添加重复的值
for (let i of s) {
  console.log(i);
}
// 2 3 5 4

// 1.3 Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。
// 例一
var set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 例二
var items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size; // 5

// 例三
// var set = new Set(document.querySelectorAll('div'));
// set.size; // 56

// 1.4 数组、字符串 去重
[...new Set(array)];

[...new Set('ababbc')].join('');
// "abc"

// 1.5 向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。
// 向 Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身。

var set = new Set();
var a = NaN;
var b = NaN;
set.add(a);
set.add(b); // 只会加入一个NaN。表明，在 Set 内部，两个NaN是相等的。
set // Set {NaN}

// 1.6 两个对象总是不相等的。
var set = new Set();

set.add({});
set.size // 1

set.add({});
set.size // 2


// 2.Set 实例的属性和方法

// 2.1 实例属性：
// Set.prototype.constructor：构造函数，默认就是Set函数。
// Set.prototype.size：返回Set实例的成员总数。


// 2.2 实例方法：

// 2.2.1 用于操作数据：
// Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
// Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。

// 2.2.2 用于遍历成员
// Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
// Set.prototype.clear()：清除所有成员，没有返回值。

var s = new Set();

s.add(1).add(2).add(2);
// 注意2被加入了两次

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false

// 2.3. Array.from方法可以将 Set 结构转为数组。
var items = new Set([1, 2, 3, 4, 5, 5]);
var array = Array.from(items);


// 3 遍历操作

// 3.1 Set的遍历顺序就是插入顺序
// Set.prototype.keys()：返回键名的遍历器
// Set.prototype.values()：返回键值的遍历器
// Set.prototype.entries()：返回键值对的遍历器
// Set.prototype.forEach()：使用回调函数遍历每个成员

// 3.2 由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），
// 所以keys方法和values方法的行为完全一致。
var set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

// 3.3.Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
Set.prototype[Symbol.iterator] === Set.prototype.values
// true

// 这意味着，可以省略values方法，直接用for...of循环遍历 Set。
for (let x of set) {
  console.log(x);
}
// red
// green
// blue

// 3.4 forEach(键值、键名、集合本身)
var set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9

// 3.5 遍历的应用

// 3.5.1 扩展运算符（...）内部使用for...of循环，所以也可以用于 Set 结构。
var set = new Set(['red', 'green', 'blue']);
var arr = [...set];
// ['red', 'green', 'blue']

// 3.5.2 使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。
var a = new Set([1, 2, 3]);
var b = new Set([4, 3, 2]);

// 并集
var union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}



console.log('********* WeakSet **********')

// 1.WeakSet 结构与 Set 类似，也是不重复的值的集合

// 2.区别：
// 2.1 WeakSet 的成员只能是对象，而不能是其他类型的值
var ws = new WeakSet();
// ws.add(1);
// TypeError: Invalid value used in weak set
// ws.add(Symbol());
// TypeError: invalid value used in weak set

// 2.2 WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用
// 也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

// 2.3 ES6 规定 WeakSet 不可遍历。

// 3.语法 
// 3.1 WeakSet 是一个构造函数，可以使用new命令，创建 WeakSet 数据结构。
var ws = new WeakSet();

// 3.2 是a数组的成员成为 WeakSet 的成员，而不是a数组本身
var a = [[1, 2], [3, 4]];
var ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}

// 3.3数组b的成员不是对象，加入 WeakSet 就会报错。
var b = [3, 4];
// var ws = new WeakSet(b);
// Uncaught TypeError: Invalid value used in weak set(…)

// 4. WeakSet 结构有以下三个方法。
// WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
// WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
// WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。
var ws = new WeakSet();
var obj = {};
var foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo);    // false

ws.delete(window);
ws.has(window);    // false

// 4.1 WeakSet 没有size属性，没有办法遍历它的成员。
// WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，
// 遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了
ws.size // undefined
ws.forEach // undefined

// ws.forEach(function(item){ console.log('WeakSet has ' + item)})
// TypeError: undefined is not a function

// 用处：储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。
var foos = new WeakSet()
class Foo {
  constructor() {
    foos.add(this)
  }
  method() {
    if (!foos.has(this)) {
      throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！');
    }
  }
}



console.log('********* Map **********')

// 1.含义和基本用法
// 1.1 JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键
// 1.2 ES6 的 Map 数据结构，类似于对象，也是键值对的集合，“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键

// Object =》 “字符串—值”
// Map =》 “值—值”

var m = new Map();
var o = { p: 'Hello World' };

m.set(o, 'content');
m.get(o); // "content"

m.has(o); // true
m.delete(o); // true
m.has(o); // false

// 1.3 作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
var map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"

// 1.4 不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构 都可以当作Map构造函数的参数
// Set和Map都可以用来生成新的 Map。
var set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
var m1 = new Map(set);
m1.get('foo') // 1

var m2 = new Map([['baz', 3]]);
var m3 = new Map(m2);
m3.get('baz') // 3

// 1.5 对同一个键多次赋值，后面的值将覆盖前面的值。
var map = new Map();
map
  .set(1, 'aaa')
  .set(1, 'bbb');
map.get(1) // "bbb"

// 1.6 读取一个未知的键，则返回undefined。
new Map().get('asfddfsasadf')
// undefined

// 1.7 只有对同一个对象的引用，Map 结构才将其视为同一个键
var map = new Map();
var arr = ['a'];
map.set(arr, 555);
map.get(arr) // 555
map.get(['a']) // undefined

// 1.8 如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键
// 1.8.1: 0 和 -0就是一个键
// 1.8.2: 布尔值true 和 字符串true 是两个不同的键
// 1.8.3: undefined 和 null 也是两个不同的键
// 1.8.4: 虽然NaN不严格相等于自身，但 Map 将其视为同一个键。

var map = new Map();

map.set(-0, 123);
map.get(+0) // 123

map.set(true, 1);
map.set('true', 2);
map.get(true) // 1

map.set(undefined, 3);
map.set(null, 4);
map.get(undefined) // 3

map.set(NaN, 123);
map.get(NaN) // 123

// 2.实例的属性和操作方法

// 2.1 size属性
// size属性返回 Map 结构的成员总数。
var map = new Map();
map.set('foo', true);
map.set('bar', false);
map.size // 2

// 2.2 Map.prototype.set(key, value);
// 2.2.1 set方法设置键名key对应的键值为value，然后返回整个 Map 结构
// 2.2.2 如果key已经有值，则键值会被更新，否则就新生成该键。
var m = new Map();

m.set('edition', 6)        // 键是字符串
m.set(262, 'standard')     // 键是数值
m.set(undefined, 'nah')    // 键是 undefined

// 2.2.3 set方法返回的是当前的Map对象，因此可以采用链式写法。
var map = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

// 2.3 Map.prototype.get(key)
// get方法读取key对应的键值，如果找不到key，返回undefined。
var m = new Map();
var hello = function () { console.log('hello'); };
m.set(hello, 'Hello ES6!') // 键是函数

m.get(hello)  // Hello ES6!

// 2.4 Map.prototype.has(key)
// has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
var m = new Map();

m.set('edition', 6);
m.set(262, 'standard');
m.set(undefined, 'nah');

m.has('edition')     // true
m.has('years')       // false
m.has(262)           // true
m.has(undefined)     // true

// 2.5 Map.prototype.delete(key)
// delete方法删除某个键，返回true。如果删除失败，返回false。
var m = new Map();
m.set(undefined, 'nah');
m.has(undefined)     // true

m.delete(undefined)
m.has(undefined)       // false

// 2.6 Map.prototype.clear()
// clear方法清除所有成员，没有返回值。
var map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
map.clear()
map.size // 0

// 3.遍历方法

// 3.1 Map 结构原生提供三个遍历器生成函数和一个遍历方法。
// Map.prototype.keys()：返回键名的遍历器。
// Map.prototype.values()：返回键值的遍历器。
// Map.prototype.entries()：返回所有成员的遍历器。
// Map.prototype.forEach()：遍历 Map 的所有成员。

// Map 的遍历顺序就是插入顺序。
var map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 上面代码最后的那个例子，Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。
map[Symbol.iterator] === map.entries;
// true

// 3.2 Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）。
var map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()];
// [1, 2, 3]

[...map.values()];
// ['one', 'two', 'three']

[...map.entries()];
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map];
// [[1,'one'], [2, 'two'], [3, 'three']]

// 3.3 Map 本身没有map和filter方法
var map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

var map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)
);
// 产生 Map 结构 {1 => 'a', 2 => 'b'}

var map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}

// 3.4 Map 还有一个forEach方法，与数组的forEach方法类似，也可以实现遍历。
map.forEach(function(value, key, map) {
  console.log("Key: %s, Value: %s", key, value);
});

// 3.4.1 forEach方法还可以接受第二个参数，用来绑定this。
var reporter = {
  report: function(key, value) {
    console.log("Key: %s, Value: %s", key, value);
  }
};

map.forEach(function(value, key, map) {
  this.report(key, value);
}, reporter);

// forEach方法的回调函数的this，就指向reporter。

// 4. 与其他数据结构的互相转换
// 4.1 Map 转为数组

var myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]

// 4.2 数组 转为 Map
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }

// 4.3 Map 转为对象
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

var myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }

// 4.4 对象转为 Map
var obj = {"a":1, "b":2};
var map = new Map(Object.entries(obj));

// 4.5 Map 转为 JSON
// 4.5.1 Map 的键名都是字符串，这时可以选择转为对象 JSON。
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

var myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'

// 4.5.2 Map 的键名有非字符串，这时可以选择转为数组 JSON。
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

var myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'

// 4.6 JSON 转为 Map
// 4.6.1 JSON 转为 Map，正常情况下，所有键名都是字符串
function jsonToStrMap(jsonStr) {
  // return objToStrMap(JSON.parse(jsonStr));
  return new Map(Object.entries(JSON.parse(jsonStr)));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}

// 4.6.2 特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}



console.log('********* WeakMap **********')

// 1.含义

// 1.1 区别
// 1.1.1 WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
// 1.1.1 WeakMap的键名所指向的对象，不计入垃圾回收机制。

// const map = new WeakMap();
// map.set(1, 2)
// TypeError: 1 is not an object!
// map.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
// map.set(null, 2)
// TypeError: Invalid value used as weak map key


// 2.语法
// 2.1 WeakMap 与 Map 在 API 上的区别：
// 2.1.1 没有遍历操作（即没有keys()、values()和entries()方法），也没有size属性
// 2.1.2 无法清空，即不支持clear方法

// 2.2 WeakMap只有四个方法可用：get()、set()、has()、delete()。
var wm = new WeakMap();

// size、forEach、clear 方法都不存在
wm.size // undefined
wm.forEach // undefined
wm.clear // undefined


