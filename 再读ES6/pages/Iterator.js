console.log('************ 遍历器的 概念 **************')

// 1.JavaScript 原有的表示“集合”的数据结构，主要是数组（Array）和对象（Object），ES6 又添加了Map和Set。
// 可以组合使用它们，定义自己的数据结构。这样就需要一种统一的接口机制，来处理所有不同的数据结构。

// 遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。
// 任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

// Iterator 的作用有三个：
// ①一是为各种数据结构，提供一个统一的、简便的访问接口；
// ②二是使得数据结构的成员能够按某种次序排列；
// ③三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。


// Iterator 的遍历过程：
// （1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
// （2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
// （3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
// （4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。


console.log('************ 默认的 Iterator 接口 **************')
// Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环。
// 当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。

// 一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。
// 一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。
// Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。
var obj = {
  b: 2,
  d: 'd',
  a: 1,
  c: 'c',
  [Symbol.iterator]: function () {
    return {
      next: function () {
        return {
          value: 1,
          done: true
        };
      }
    };
  }
};

// 原生具备 Iterator 接口的数据结构如下。

// Array
// Map
// Set
// String
// TypedArray
// 函数的 arguments 对象
// NodeList 对象


// 下面的例子是数组的Symbol.iterator属性。
var arr = ['a', 'b', 'c'];
var iter = arr[Symbol.iterator]();
iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }


// 对象（Object）之所以没有默认部署 Iterator 接口，
// 是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。

// 对象部署遍历器接口并不是很必要，因为这时对象实际上被当作 Map 结构使用，ES5 没有 Map 结构，而 ES6 原生提供了。

// 对于类似数组的对象（存在数值键名和length属性），部署 Iterator 接口，
// 有一个简便方法，就是Symbol.iterator方法直接引用数组的 Iterator 接口。
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
// 或者
NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];

[...document.querySelectorAll('div')] // 可以执行了

// NodeList 对象是类似数组的对象，本来就具有遍历接口，可以直接遍历。
// 上面代码中，我们将它的遍历接口改成数组的Symbol.iterator属性，可以看到没有任何影响。

// 注意，普通对象部署数组的Symbol.iterator方法，并无效果。
var iterable = {
  a: 'a',
  b: 'b',
  c: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // undefined, undefined, undefined
}


// 如果Symbol.iterator方法对应的不是遍历器生成函数（即会返回一个遍历器对象），解释引擎将会报错。
var obj = {};

obj[Symbol.iterator] = () => 1;
// obj[Symbol.iterator] = () => {
//   return {
//     next() {
//       return {
//         value: 1,
//         done: false
//       }
//     }
//   }
// };

// [...obj] // TypeError: [] is not a function


// 有了遍历器接口，数据结构就可以用for...of循环遍历（详见下文），也可以使用while循环遍历。
// var $iterator = ITERABLE[Symbol.iterator]();
// var $result = $iterator.next();
// while (!$result.done) {
//   var x = $result.value;
//   // ...
//   $result = $iterator.next();
// }



console.log('************ 调用 Iterator 接口的场合 **************')
// 1.解构赋值
// 对数组和 Set 结构进行解构赋值时，会默认调用Symbol.iterator方法。
var set = new Set().add('a').add('b').add('c');

var [x, y] = set;
// x='a'; y='b'

var [first, ...rest] = set;
// first='a'; rest=['b','c'];

// 2.扩展运算符
// 例一
var str = 'hello';
[...str] //  ['h','e','l','l','o']

// 例二
var arr = ['b', 'c'];
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']


// 将任何部署了 Iterator 接口的数据结构，转为数组。
// 只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组。
// var arr = [...iterable];

// 3.yield*
// yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
var generator = function* () {
  yield 1;
  yield* [2, 3, 4];
  yield 5;
};

var iterator = generator();

iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
iterator.next() // { value: undefined, done: true }


// 4.其他场合
// 由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。
// for...of
// Array.from()
// Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
// Promise.all()
// Promise.race()



console.log('*********** 字符串的Iterator 接口 ************');

// 字符串是一个类似数组的对象，也原生具有 Iterator 接口。
var someString = "hi";
typeof someString[Symbol.iterator]
// "function"

var iterator = someString[Symbol.iterator]();

iterator.next()  // { value: "h", done: false }
iterator.next()  // { value: "i", done: false }
iterator.next()  // { value: undefined, done: true }

// 可以覆盖原生的Symbol.iterator方法，达到修改遍历器行为的目的。
var str = new String("hi");

[...str] // ["h", "i"]

str[Symbol.iterator] = function () {
  return {
    next: function () {
      if (this._first) {
        this._first = false;
        return { value: "bye", done: false };
      } else {
        return { done: true };
      }
    },
    _first: true
  };
};

[...str] // ["bye"]
str // "hi"



console.log('*********** Iterator 接口与 Generator 函数 ************');
// Symbol.iterator()方法的最简单实现，还是使用下一章要介绍的 Generator 函数。
var myIterable = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  }
};
[...myIterable] // [1, 2, 3]

// 或者采用下面的简洁写法

var obj = {
  *[Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  }
};

for (let x of obj) {
  console.log(x);
}
// "hello"
// "world"



console.log('*********** 遍历器对象的 return(),throw() ************');
// 遍历器对象除了具有next()方法，还可以具有return()方法和throw()方法。
// 如果你自己写遍历器对象生成函数，那么next()方法是必须部署的，return()方法和throw()方法是否部署是可选的。

// return()方法的使用场合是，如果for...of循环提前退出（通常是因为出错，或者有break语句），就会调用return()方法。
// 如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return()方法。
function readLinesSync(file) {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          return { done: false };
        },
        return() {
          file.close();
          return { done: true };
        }
      };
    },
  };
}

// 下面的两种情况，都会触发执行return()方法。
// 情况一
// for (let line of readLinesSync(fileName)) {
//   console.log(line);
//   break;
// }

// 情况二
// for (let line of readLinesSync(fileName)) {
//   console.log(line);
//   throw new Error();
// }

// 注意，return()方法必须返回一个对象，这是 Generator 语法决定的。
// throw()方法主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法。




console.log('*********** for...of 循环 ************');

// for...of循环可以使用的范围
// 数组、
// Set 和 Map 结构、
// 类似数组的对象（比如arguments对象、DOM NodeList 对象）、
// Generator 对象，
// 以字符串。

// 1.数组
var arr = ['red', 'green', 'blue'];

for (let v of arr) {
  console.log(v); // red green blue
}

var obj = {};
obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);

for (let v of obj) {
  console.log(v); // red green blue
}


var arr = ['a', 'b', 'c', 'd'];

for (let [k, v] of arr.entries()) {
  console.log(k, v); // a b c d
}

// 2.Set 和 Map 结构
var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
  console.log(e);
}
// Gecko
// Trident
// Webkit

var es6 = new Map();
es6.set("edition", 6);
es6.set("committee", "TC39");
es6.set("standard", "ECMA-262");
for (var [name, value] of es6) {
  console.log(name + ": " + value);
}
// edition: 6
// committee: TC39
// standard: ECMA-262


// 3.计算生成的数据结构

// 有些数据结构是在现有数据结构的基础上，计算生成的。
// 比如，ES6 的数组、Set、Map 都部署了以下三个方法，调用后都返回遍历器对象。

// entries() 返回一个遍历器对象，用来遍历[键名, 键值]组成的数组。
// 对于数组，键名就是索引值；
// 对于 Set，键名与键值相同。Map 结构的 Iterator 接口，默认就是调用entries方法。

// keys() 返回一个遍历器对象，用来遍历所有的键名。
// values() 返回一个遍历器对象，用来遍历所有的键值。

var arr = ['a', 'b', 'c'];
for (let pair of arr.entries()) {
  console.log(pair);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']


// 4.类数组对象

// 字符串
var str = "hello";

for (let s of str) {
  console.log(s); // h e l l o
}

// DOM NodeList对象
var paras = document.querySelectorAll("p");

for (let p of paras) {
  p.classList.add("test");
}

// arguments对象
function printArgs() {
  for (let x of arguments) {
    console.log(x);
  }
}
printArgs('a', 'b');
// 'a'
// 'b'

console.log('==========');
// 并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用Array.from方法将其转为数组。
var arrayLike = { length: 2, 0: 'a', 1: 'b' };

// 报错
// for (let x of arrayLike) {
//   console.log(x);
// }

// 正确
for (let x of Array.from(arrayLike)) {
  console.log(x);
}

console.log('==========');
// 5.对象
// 对于普通的对象，for...of结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。
// 但是，这样情况下，for...in循环依然可以用来遍历键名。
var es6 = {
  edition: 6,
  committee: "TC39",
  standard: "ECMA-262"
};

for (let e in es6) {
  console.log(e);
}

// edition
// committee
// standard

// for (let e of es6) {
  //   console.log(e);
  // }
  // TypeError: es6[Symbol.iterator] is not a function
  
console.log('==========');
// 一种解决方法是，使用Object.keys方法将对象的键名生成一个数组，然后遍历这个数组。
for (var key of Object.keys(es6)) {
  console.log(key + ': ' + es6[key]);
}

// 另一个方法是使用 Generator 函数将对象重新包装一下。
function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

for (let [key, value] of entries(obj)) {
  console.log(key, '->', value);
}
// a -> 1
// b -> 2
// c -> 3



console.log('************ 与其他遍历语法的比较 ************');

// 1. 以数组为例，JavaScript 提供多种遍历语法。最原始的写法就是for循环。

// 2. 这种写法比较麻烦，因此数组提供内置的forEach方法。
// 这种写法的问题在于，无法中途跳出forEach循环，break命令或return命令都不能奏效。

// 3. for...in循环可以遍历数组的键名。
// 3.1 for...in循环有几个缺点:
// (1) 数组的键名是数字，但是for...in循环是以字符串作为键名“0”、“1”、“2”等等。
// (2) for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
// (3) 某些情况下，for...in循环会以任意顺序遍历键名。

// 3.2 总之，for...in循环主要是为遍历对象而设计的，不适用于遍历数组。

// 4. for...of循环相比上面几种做法，有一些显著的优点。
// (1) 有着同for...in一样的简洁语法，但是没有for...in那些缺点。
// (2) 不同于forEach方法，它可以与break、continue和return配合使用。
// (3) 提供了遍历所有数据结构的统一操作接口。



