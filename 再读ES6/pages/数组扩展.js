console.log('************ 扩展运算符 ************');

// 1.替代函数的apply方法

// ES5 的写法
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f.apply(null, args);

// ES6的写法
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f(...args);

// 应用Math.max方法，简化求出一个数组最大元素的写法。
// ES5 的写法
Math.max.apply(null, [14, 3, 77])

// ES6 的写法
Math.max(...[14, 3, 77])

// 等同于
Math.max(14, 3, 77);


// 2.扩展运算符的运用
// 2.1 复制数组

// ES5 只能用变通方法来复制数组。
var a1 = [1, 2];
var a2 = a1.concat();

a2[0] = 2;
a1 // [1, 2]

// 写法一
var a2 = [...a1];
// 写法二
var [...a2] = a1;


// 2.2 合并数组
var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

// ES5 的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]

// 两种方法都是浅拷贝，使用的时候需要注意。
var a1 = [{ foo: 1 }];
var a2 = [{ bar: 2 }];

var a3 = a1.concat(a2);
var a4 = [...a1, ...a2];

a3[0] === a1[0] // true
a4[0] === a1[0] // true

// 2.3 与解构赋值结合
// ES5
// a = list[0], rest = list.slice(1)
// ES6
// [a, ...rest] = list


// 2.4 字符串
// 扩展运算符还可以将字符串转为真正的数组。

var a = [...'hello']
// [ "h", "e", "l", "l", "o" ]

// 2.5 实现了 Iterator 接口的对象
// 任何定义了遍历器（Iterator）接口的对象,都可以用扩展运算符转为真正的数组。

var nodeList = document.querySelectorAll('div');
var array = [...nodeList];


// 2.6 Map 和 Set 结构，Generator 函数
// 只要具有 Iterator 接口的对象，都可以使用扩展运算符


console.log('************ Array.from() ************');
// 1. Array.from方法用于将两类对象转为真正的数组
// 1.1 类似数组的对象（array-like object）
// 1.2 可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

var arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
// ES6的写法
var arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

// 1.1.1 常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的arguments对象

// NodeList对象
var ps = document.querySelectorAll('p');
Array.from(ps).filter(p => {
  return p.textContent.length > 100;
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}

// 1.2.1 字符串和 Set 结构都具有 Iterator 接口
Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']

var namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']

// 1.3 如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组。
Array.from([1, 2, 3])
// [1, 2, 3]


// 1.4 扩展运算符（...）也可以将某些数据结构转为数组
// arguments对象
function foo() {
  const args = [...arguments];
}

// NodeList对象
[...document.querySelectorAll('div')]


// 2 Array.from 还可以接受第二个参数，用来对每个元素进行处理，将处理后的值放入返回的数组。
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]

var spans = document.querySelectorAll('span.name');

// map()
var names1 = Array.prototype.map.call(spans, s => s.textContent);

// Array.from()
var names2 = Array.from(spans, s => s.textContent)


// 3.将字符串转为数组，然后返回字符串的长度
function countSymbols(string) {
  return Array.from(string).length;
}


console.log('************ Array.of() ************');
// 1.Array.of方法用于将一组值，转换为数组。
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1

// 1.1 目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]

// 1.2 Array.of总是返回参数值组成的数组。如果没有参数，就返回一个空数组。
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]


console.log('************ 数组实例的 copyWithin() ************');
// 1.将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。(使用这个方法，会修改当前数组。)
// Array.prototype.copyWithin(target, start = 0, end = this.length)
// target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
// start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
// end（可选）：到该位置 前 停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。

[1, 2, 3, 4, 5].copyWithin(0, 3);
// [4, 5, 3, 4, 5]
// 从 3 号位直到数组结束的成员（4 和 5）
// 复制到
// 从 0 号位开始的位置、结果覆盖了原来的 1 和 2。

// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4);
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1);
// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({ length: 5, 3: 1 }, 0, 3)
// [undefined, undefined, undefined, 1, undefined]
// {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
let i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]


console.log('********* 数组实例的 find(), findIndex() *********');

// 1.find()：找出第一个符合条件的数组成员
// 1.1 参数是一个回调函数，所有数组成员依次执行该回调函数
// 1.2 直到找出第一个返回值为true的成员，然后返回 该成员。如果没有符合条件的成员，则返回 undefined。

[1, 4, -5, 10].find((n) => n < 0);
// -5

[1, 5, 10, 15].find(function (value, index, arr) {
  return value > 9;
}); // 10

// 2.findIndex()：找出第一个符合条件的数组成员
// 2.1 参数是一个回调函数，所有数组成员依次执行该回调函数
// 2.2 返回第一个符合条件的数组成员的 位置，如果所有成员都不符合条件，则返回 -1。

[1, 5, 10, 15].findIndex(function (value, index, arr) {
  return value > 9;
}) // 2

// 3.两个方法都可以接受第二个参数，用来绑定回调函数的this对象。
function f(v) {
  return v > this.age;
}
let person = { name: 'John', age: 20 };
[10, 12, 26, 15].find(f, person);    // 26

// 4. 两个方法都可以发现NaN，弥补了数组的indexOf方法的不足。
[NaN].indexOf(NaN); // indexOf方法无法识别数组的NaN成员
// -1

[NaN].findIndex(y => Object.is(NaN, y)); // findIndex方法可以借助Object.is方法做到
// 0


console.log('********* 数组实例的 fill() *********');
// 1.fill方法使用给定值，填充一个数组。
['a', 'b', 'c'].fill(7);
// [7, 7, 7]

new Array(3).fill(7);
// [7, 7, 7]

// 2.可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']

// 3.如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。
var arr = new Array(3).fill({ name: "Mike" });
arr[0].name = "Ben";
arr
// [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

var arr = new Array(3).fill([]);
arr[0].push(5);
arr
// [[5], [5], [5]]



console.log('********* 数组实例的 entries(),keys(),values() *********');

// 1.三个方法都用于 遍历数组，返回一个遍历器对象
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"

// 如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。
var letter = ['a', 'b', 'c'];
var entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']



console.log('********* 数组实例的 includes() *********');
// 1.返回一个布尔值，表示某个数组是否包含给定的值
[1, 2, 3].includes(2);    // true
[1, 2, 3].includes(4);   // false
[1, 2, NaN].includes(NaN); // true

// 2.方法的第二个参数表示搜索的起始位置，默认为0。如果为负数，则表示倒数的位置
// 如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true

// 2.没有该方法之前，我们通常使用数组的indexOf方法，检查是否包含某个值。
// if (arr.indexOf(el) !== -1) {
//   // ...
// }


// 2.1 indexOf方法有两个缺点，
// 2.1.1 不够语义化。它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观
// 2.1.2 它内部使用严格相等运算符（===）进行判断，这会导致对NaN的误判
[NaN].indexOf(NaN);
// -1

// 2.1.3 includes使用的是不一样的判断算法，就没有这个问题。
[NaN].includes(NaN);
// true



console.log('********* 数组实例的 flat()，flatMap() *********');
// 1.flat()：将嵌套的数组“拉平”，变成一维的数组。
// 该方法返回一个新数组，对原数据没有影响。
[1, 2, [3, 4]].flat();
// [1, 2, 3, 4]

// 1.1 flat()默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，
// 可以将flat()方法的参数写成一个整数，表示想要拉平的层数，默认为1。
[1, 2, [3, [4, 5]]].flat();
// [1, 2, 3, [4, 5]]

[1, 2, [3, [4, 5]]].flat(2);
// [1, 2, 3, 4, 5]

// 1.2 如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数。
[1, [2, [3]]].flat(Infinity);
// [1, 2, 3]

// 1.3 如果原数组有空位，flat()方法会跳过空位。
// [1, 2, , 4, 5].flat()
// [1, 2, 4, 5]

// 2.flatMap()：对原数组的每个成员执行一个函数，然后对返回值组成的数组执行flat()方法
// 该方法返回一个新数组，不改变原数组。

// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2]);
// [2, 4, 3, 6, 4, 8]

// 2.1 flatMap()只能展开一层数组。
// 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
[1, 2, 3, 4].flatMap(x => [[x * 2]]);
// [[2], [4], [6], [8]]

// 2.2 flatMap()方法还可以有第二个参数，用来绑定遍历函数里面的this。


console.log('********* 数组空位 *********');
// 1.数组的空位指，数组的某一个位置没有任何值
Array(3); // [, , ,]

// 1.1 ，空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值
0 in [undefined, undefined, undefined] // true
0 in [, , ,]; // false

// 2 ES5 对空位的处理，大多数情况下会忽略空位。

// forEach(), filter(), reduce(), every() 和some()都会跳过空位。
// map() 会跳过空位，但会保留这个值
// join() 和 toString() 会将空位视为 undefined，而 undefined 和 null 会被处理成空字符串。

// forEach方法
[,'a'].forEach((x,i) => console.log(i)); // 1

// filter方法
['a',,'b'].filter(x => true); // ['a','b']

// every方法
[,'a'].every(x => x==='a'); // true

// reduce方法
[1,,2].reduce((x,y) => x+y); // 3

// some方法
[,'a'].some(x => x !== 'a'); // false

// map方法
[,'a'].map(x => 1); // [,1]

// join方法
[,'a',undefined,null].join('#'); // "#a##"

// toString方法
[,'a',undefined,null].toString(); // ",a,,"

// 3.ES6 则是明确将空位转为undefined。

Array.from(['a',,'b']);
// [ "a", undefined, "b" ]

[...['a',,'b']];
// [ "a", undefined, "b" ]

[,'a','b',,].copyWithin(2,0); // [,"a",,"a"]

new Array(3).fill('a'); // ["a","a","a"]

var arr = [, ,];
for (let i of arr) {
  console.log(1);
}
// 1
// 1

// entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。

// entries()
[...[,'a'].entries()]; // [[0,undefined], [1,"a"]]

// keys()
[...[,'a'].keys()]; // [0,1]

// values()
[...[,'a'].values()]; // [undefined,"a"]

// find()
[,'a'].find(x => true); // undefined



console.log('********* sort 排序稳定性 *********');

// 1.排序稳定性（stable sorting）是排序算法的重要属性，
// 指的是排序关键字相同的项目，排序前后的顺序不变。

var arr = [
  'peach',
  'straw',
  'apple',
  'spork'
];

var stableSorting = (s1, s2) => {
  if (s1[0] < s2[0]) return -1;
  return 1;
};

arr.sort(stableSorting)
// ["apple", "peach", "straw", "spork"]

// 2.1 常见的排序算法之中，插入排序、合并排序、冒泡排序等都是稳定的
// 2.2 堆排序、快速排序等是不稳定的
// 2.3 不稳定排序的主要缺点是，多重排序时可能会产生问题

// 3.1 早先的 ECMAScript 没有规定，Array.prototype.sort()的默认排序算法是否稳定，
// 留给浏览器自己决定，这导致某些实现是不稳定的
// 3.2 ES2019 明确规定，Array.prototype.sort()的默认排序算法必须稳定。
// 这个规定已经做到了，现在 JavaScript 各个主要实现的默认排序算法都是稳定的。