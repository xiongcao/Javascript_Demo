console.log('********** 参数默认值 **********');

// ES5的方式
function log(x, y) {
  if (typeof y === 'undefined') {
    y = 'World';
  }
  console.log(x, y);
}

// ES6的方式
function log(x, y = 'World') {
  console.log(x, y);
}

// 1.参数变量x是默认声明的，在函数体中，不能用let或const再次声明，否则会报错。
function foo(x = 5) {
  // let x = 1; // error
  // const x = 2; // error
}

// 2.使用参数默认值时，函数不能有同名参数
// 不报错
function foo(x, x, y) {
  // ...
  console.log(x, x, y); // 2, 2, 3
}

foo(2, 2, 3);

// 报错
// function foo(x, x, y = 1) {
//   // ...
// }
// SyntaxError: Duplicate parameter name not allowed in this context


// 3.参数默认值是惰性求值的。每次都重新计算默认值表达式的值
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo() // 100

x = 100;
foo() // 101

console.log('******* 参数默认值 与 解构赋值 结合使用 *******');

function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined

function foo({x, y = 5} = {}) {
  console.log(x, y);
}

foo() // undefined 5

function fetch(url, { body = '', method = 'GET', headers = {} }) {
  console.log(method);
}

fetch('http://example.com', {}) // "GET"


// fetch('http://example.com') // 报错


function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
  console.log(method);
}

fetch('http://example.com') // "GET"



console.log('******* 参数默认值的 位置 *******');

// 如果非尾部的参数设置默认值，实际上这个参数是没法省略的。
// 例一
function f(x = 1, y) {
  return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined]
// f(, 1) // 报错
f(undefined, 1) // [1, 1]

// 例二
function f(x, y = 5, z) {
  return [x, y, z];
}

f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
// f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]

// 如果传入undefined，将触发该参数等于默认值，null则没有这个效果。

function foo(x = 5, y = 6) {
  console.log(x, y);
}

foo(undefined, null)
// 5 null


console.log('******* 函数的 length 属性 *******');

// 函数的length属性，将返回没有指定默认值的参数个数。
// 也就是说，指定了默认值后，length属性将失真。
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2


console.log('******* 作用域 *******');

// 1.一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）
// var x = 1;

// function f(x, y = x) {
//   console.log(y);
// }

// f(2) // 2

// function f(y = x) {
//   let x = 2;
//   console.log(y);
// }

// f() // ReferenceError: x is not defined

// var x = 1;

// function foo(x = x) {
//   // ...
// }

// foo() // ReferenceError: x is not defined

let foo = 'outer';

function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}

bar(); // outer

function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}

bar() // ReferenceError: foo is not defined

function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}

bar() // ReferenceError: foo is not defined


var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
x // 1

function throwIfMissing() {
  throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}

foo()
// Error: Missing parameter


console.log('******* rest 参数 *******');

// 1.用于获取函数的多余参数，代替arguments变量
// rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();

// 2.rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错

// 报错
// function f(a, ...b, c) {
//   // ...
// }

// 3.函数的length属性，不包括 rest 参数。
(function(a) {}).length  // 1
(function(...a) {}).length  // 0
(function(a, ...b) {}).length  // 1


console.log('******* 严格模式 *******');

// 从 ES5 开始，函数内部可以设定为严格模式。
// ES2016 规定 只要函数参数使用了默认值、解构赋值、或者扩展运算符，
//            那么函数内部就不能显式设定为严格模式，否则会报错。

// 规避方法：
// 1.设定全局性的严格模式
// 'use strict';

function doSomething(a, b = a) {
  // code
}

// 2.把函数包在一个无参数的立即执行函数里面

const doSomething = (function () {
  'use strict';
  return function(value = 42) {
    return value;
  };
}());


console.log('******* name 属性 *******');

// 1.函数的name属性，返回该函数的函数名。
function foo() {}
foo.name // "foo"

// 2.ES5中，将一个匿名函数赋值给一个变量，会返回空字符串
//   ES6中，会返回实际的函数名。
var f = function () {};
// ES5
f.name // ""
// ES6
f.name // "f"

// 2.如果将一个具名函数赋值给一个变量，则 ES5 和 ES6 的name属性都返回这个具名函数原本的名字。
const bar = function baz() {};
// ES5
bar.name // "baz"
// ES6
bar.name // "baz"

// 3.Function构造函数返回的函数实例，name属性的值为anonymous。
(new Function).name // "anonymous"

// 4.bind返回的函数，name属性值会加上bound前缀。
function foo() {};
foo.bind({}).name // "bound foo"

(function(){}).bind({}).name // "bound "


console.log('******* 箭头函数 *******');

// 1.箭头函数有几个使用注意点
// （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
// （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
// （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
// （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000); // this 指向被定义时的对象，即Timer
  // 普通函数
  setInterval(function () {
    // this 指向调用时的对象 window
    this.s2++;
  }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1: 3
// s2: 0

// 2.箭头函数可以让this指向固定化。（箭头函数没有自己的this，引用的是它外部的this）

var handler = {
  id: '123456',

  init: function() {
    document.addEventListener('click',
      event => this.doSomething(event.type), false);

    // document.addEventListener('click',
    //   function (e) {
    //     console.log(this); // this 指向 当前点击的document对象
    //   }, false);

    // document.addEventListener('click',
    //   () => {
    //     console.log(this); // this 指向 handler
    //   }, false);
  },

  doSomething: function(type) {
    console.log('Handling ' + type  + ' for ' + this.id);
  }
};

// 3.箭头函数没有自己的this，所以call/apply/bind方法无效
function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1

// 4.除了this，arguments、super、new.target在箭头函数之中也是不存在的，都指向外层函数的对应变量

function foo() {
  setTimeout(() => {
    console.log('args:', arguments);
  }, 100);
}

foo(2, 4, 6, 8)
// args: [2, 4, 6, 8]


// 5.不适用 箭头函数 的场合
// - 定义对象的方法，且该方法内部包括this
// - 需要动态this的时候，也不应使用箭头函数

globalThis.s = 21;
const obj = {
  s: 42,
  m: () => console.log(this.s)
};
obj.m() // 21

var button = document.getElementById('press');
button.addEventListener('click', () => {
  this.classList.toggle('on');
});



console.log('******* 尾调用 优化 *******');

// 1.尾调用： 某个函数的最后一步是调用另一个函数

// 以下场景不属于尾调用

// 调用函数g之后，还有赋值操作
function f(x){
  let y = g(x);
  return y;
}

// 调用函数g之后，还有运算操作
function f(x){
  return g(x) + 1;
}

// 调用函数g之后，还有return操作
function f(x){
  g(x);
  // 此处默认有 return undefined
}


console.log('******* Function.prototype.toString() *******');

// toString()方法返回函数代码本身，以前会省略注释和空格
// es2019 对函数实例的toString()方法做出了修改，明确要求返回一模一样的原始代码

function /* foo comment */ foo () {}

foo.toString()
// 之前：function foo() {}
// 之后："function /* foo comment */ foo () {}"


console.log('******* catch *******');

// 以前明确要求catch命令后面必须跟参数
// ES2019 做出了改变，允许catch语句省略参数。

try {
  // ...
} catch (err) {
  // 处理错误
}
