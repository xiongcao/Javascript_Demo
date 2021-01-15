console.log('********** 概述 **********')

// 1. ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。
// 1.1 是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

// 1.2 Symbol 值通过Symbol函数生成
var s = Symbol();
typeof s
// "symbol"

// 1.3 Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述
var s1 = Symbol('foo');
var s2 = Symbol('bar');
s1 // Symbol(foo)
s2 // Symbol(bar)
s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"

// 1.4 如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串
var obj = {
  toString() {
    return 'abc';
  }
};
var sym = Symbol(obj);
sym // Symbol(abc)

// 1.5 Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。
// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();
s1 === s2 // false

// 有参数的情况
var s1 = Symbol('foo');
var s2 = Symbol('foo');
s1 === s2 // false

// 1.6 Symbol 值不能与其他类型的值进行运算，会报错。
var sym = Symbol('My symbol');
// "your symbol is " + sym;
// TypeError: can't convert symbol to string
// `your symbol is ${sym}`
// TypeError: can't convert symbol to string

// 1.7 Symbol 值可以显式转为字符串。
var sym = Symbol('My symbol');
String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'

// 1.8 Symbol 值也可以转为布尔值，但是不能转为数值。
var sym = Symbol();
Boolean(sym) // true
!sym  // false

if (sym) {
  // ...
}

// Number(sym) // TypeError
// sym + 2 // TypeError


console.log('********** Symbol.prototype.description **********')
// 1.创建 Symbol 的时候，可以添加一个描述。
var sym = Symbol('foo'); // sym的描述就是字符串foo。

// 2.读取描述（ES2019）
var sym = Symbol('foo');
sym.description // "foo"



console.log('********** 作为属性名的 Symbol **********')
// 1. Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性
var mySymbol = Symbol();

// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
var a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"


// 2. Symbol 值作为对象属性名时，不能用点运算符。
var mySymbol = Symbol();
var a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"

// 3. 对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。
var s = Symbol();

var obj = {
  [s]: function (arg) { }
};

obj[s](123);

// 4. Symbol 值作为属性名时，该属性还是公开属性，不是私有属性



console.log('********** 实例：消除魔术字符串 **********')
// 1.魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值
// 2.风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替
function getArea(shape, options) {
  let area = 0;

  switch (shape) {
    case 'Triangle': // 魔术字符串
      area = .5 * options.width * options.height;
      break;
    /* ... more code ... */
  }

  return area;
}

getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串 'Triangle'

// 常用的消除魔术字符串的方法，就是把它写成一个变量。
var shapeType = {
  triangle: Symbol()
};
function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType?.triangle:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });



console.log('********** 属性名的遍历 **********')

// 1.Symbol 作为属性名，遍历对象的时候，该属性不会出现在for...in、for...of循环中，
// 也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回

// 2.Object.getOwnPropertySymbols()方法，可以获取指定对象的所有 Symbol 属性名
// 方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
var obj = {};
var a = Symbol('a');
var b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

var objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols
// [Symbol(a), Symbol(b)]


// 3.Object.getOwnPropertySymbols()方法与for...in循环、Object.getOwnPropertyNames方法进行对比的例子。
var obj = {};
var foo = Symbol('foo');

obj[foo] = 'bar';

for (let i in obj) {
  console.log(i); // 无输出
}
Object.getOwnPropertyNames(obj) // []
Object.getOwnPropertySymbols(obj) // [Symbol(foo)]

// 4.Reflect.ownKeys()方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
var obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};

Reflect.ownKeys(obj)
//  ["enum", "nonEnum", Symbol(my_key)]

// 5.可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。
var size = Symbol('size');

class Collection {
  constructor() {
    this[size] = 0;
  }

  add(item) {
    this[this[size]] = item;
    this[size]++;
  }

  static sizeOf(instance) {
    return instance[size];
  }
}

var x = new Collection();
Collection.sizeOf(x) // 0

x.add('foo');
Collection.sizeOf(x) // 1

Object.keys(x) // ['0']
Object.getOwnPropertyNames(x) // ['0']
Object.getOwnPropertySymbols(x) // [Symbol(size)]

// Object.keys(x)、Object.getOwnPropertyNames(x)都无法获取它。这就造成了一种非私有的内部方法的效果。



console.log('********** Symbol.for(), Symbol.keyFor() **********')
// 1.Symbol.for()方法可以做到重新使用同一个 Symbol 值
var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');

s1 === s2 // true

// 它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。
// 如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。

// 2. Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的key。
var s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

var s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined s2属于未登记的 Symbol 值

// 3.Symbol.for()为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。
function foo() {
  return Symbol.for('bar');
}

// var x = foo();
// var y = Symbol.for('bar');
// console.log(x === y); // true

// 4.这个全局登记特性，可以用在不同的 iframe 或 service worker 中取到同一个值。
// var iframe = document.cbol.for('foo') === Symbol.for('foo');
// true



console.log('********** 实例：模块的 Singleton 模式 **********')
// 1.Singleton 模式指的是调用一个类，任何时候返回的都是同一个实例。

// mod.js
// var FOO_KEY = Symbol.for('foo');

// function A() {
//   this.foo = 'hello';
// }

// if (!global[FOO_KEY]) {
//   global[FOO_KEY] = new A();
// }

// module.exports = global[FOO_KEY];


// global[Symbol.for('foo')] = { foo: 'world' };

// var a = require('./mod.js');



console.log('********** 内置的 Symbol 值 **********')

// 11个
// 1.Symbol.hasInstance，指向一个内部方法








