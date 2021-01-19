console.log('*********** 简介 ************')

// 1.基本概念

// Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

// Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。

// 执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。
// 返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

// 形式上，Generator 函数是一个普通函数，但是有两个特征。
// 一是，function关键字与函数名之间有一个星号；
// 二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();

// 调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象(遍历器)

// 下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。
// 每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。
// 换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }


// ES6 没有规定，function关键字与函数名之间的星号，写在哪个位置。
// 这导致下面的写法都能通过。
function* foo(x, y) { }
function* foo(x, y) { }
function* foo(x, y) { }
function* foo(x, y) { }


// 2.yield 表达式

// 2.1 yield表达式就是暂停标志。

// 2.2 遍历器对象的next方法的运行逻辑如下。
// （1）遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。

// （2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。

// （3）如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，
// 并将return语句后面的表达式的值，作为返回的对象的value属性值。

// （4）如果该函数没有return语句，则返回的对象的value属性值为undefined。

// 2.3 yield表达式与return语句

// 2.3.1 相同点
// - 都能返回紧跟在语句后面的那个表达式的值。

// 2.3.2 不同点
// - 每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能。
// - 一个函数里面，只能执行一次（或者说一个）return语句，但是可以执行多次（或者说多个）yield表达式。
// - 正常函数只能返回一个值，因为只能执行一次return；Generator 函数可以返回一系列的值，因为可以有任意多个yield。

// 2.4 Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数。
function* f() {
  console.log('执行了！')
}

var generator = f();
generator.next()


var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a) {
  var length = a.length;
  for (var i = 0; i < length; i++) {
    var item = a[i];
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  }
};

for (var f of flat(arr)) {
  console.log(f);
}
// 1, 2, 3, 4, 5, 6


// 2.5 yield表达式如果用在另一个表达式之中，必须放在圆括号里面。
function* demo() {
  // console.log('Hello' + yield); // SyntaxError
  // console.log('Hello' + yield 123); // SyntaxError

  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK
}

var d = demo();
console.log(d.next());
console.log(d.next());

// 2.6 yield表达式用作函数参数 或 放在赋值表达式的右边，可以不加括号。
function* demo2() {
  foo(yield 'a', yield 'b'); // OK
  let input = yield; // OK
}
function foo(){}


// 3.与Iterator 接口的关系

// 由于 Generator 函数就是遍历器生成函数，
// 因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。

var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]


// Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身。

function* gen(){
  // some code
}

var g = gen();

g[Symbol.iterator]() === g;



console.log('*********** next 方法的参数 ************')

// yield表达式本身没有返回值，或者说总是返回undefined。
// next方法可以带一个参数，该参数就会被当作 "上一个" yield表达式 的返回值。

function* fn() {
  for(var i = 0; true; i++) {
    var reset = yield i;
    if(reset) { i = -1; }
  }
}
var g = fn();
g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }


function* foo(x) {
  var y = 2 * (yield (x + 1)); // y: NaN, 24
  var z = yield (y / 3); // z:NaN, 8
  return (x + y + z); // NaN, 5 + 24 + 13 = 42
}
var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}
var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }


function* dataConsumer() {
  console.log('Started');
  console.log(`1. ${yield}`);
  console.log(`2. ${yield}`);
  return 'result';
}

var genObj = dataConsumer();
genObj.next();
// Started
genObj.next('a')
// 1. a
genObj.next('b')
// 2. b

// 如果想要第一次调用next方法时，就能够输入值，可以在 Generator 函数外面再包一层。
function wrapper(generatorFunction) {
  return function (...args) {
    let generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  };
}

const wrapped = wrapper(function* () {
  console.log(`First input: ${yield}`);
  return 'DONE';
});

wrapped().next('hello!')
// First input: hello!



console.log('*********** for...of ************')
// for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法。
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}
// 一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象
// 所以return语句返回的6，不包括在for...of循环之中。

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
console.log('=====================');

// 下面是一个利用 Generator 函数和for...of循环，实现斐波那契数列的例子。
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}

// 利用for...of循环，可以写出遍历任意对象（object）的方法。
// 原生的 JavaScript 对象没有遍历接口，无法使用for...of循环，通过 Generator 函数为它加上这个接口，就可以用了。
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

var jane = { first: 'Jane', last: 'Doe' };

for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe

// 除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口。
// 这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}

// 扩展运算符
[...numbers()] // [1, 2]

// Array.from 方法
Array.from(numbers()) // [1, 2]

// 解构赋值
var [x, y] = numbers();
x // 1
y // 2

// for...of 循环
for (let n of numbers()) {
  console.log(n)
}
// 1
// 2




console.log('*********** Generator.prototype.throw() ************')

// Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b

// 上面代码中，遍历器对象i连续抛出两个错误。
// 第一个错误被 Generator 函数体内的catch语句捕获。
// i第二次抛出错误，由于 Generator 函数内部的catch语句已经执行过了，不会再捕捉到这个错误了，
// 所以这个错误就被抛出了 Generator 函数体，被函数体外的catch语句捕获。

// throw方法可以接受一个参数，该参数会被catch语句接收，建议抛出Error对象的实例。
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.error(e);
  }
};

var i = g();
i.next();
i.throw(new Error('出错了！(自定义错误)'));
// Error: 出错了！(…)



console.log('*********** Generator.prototype.return() ************')

// Generator 函数返回的遍历器对象，还有一个return()方法，可以返回给定的值，并且终结遍历 Generator 函数。
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }

// 如果return()方法调用时，不提供参数，则返回值的value属性为undefined。
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return() // { value: undefined, done: true }


// 如果 Generator 函数内部有try...finally代码块，且正在执行try代码块，
// 那么return()方法会导致 "立刻" 进入finally代码块，"执行完以后"，整个函数才会结束。
function* numbers () {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}
var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false }
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }



console.log('**** next()、throw()、return() 的共同点 ****')

// 相同点：
// - 这三个方法本质上是同一件事
// - 作用都是让 Generator 函数恢复执行，并且使用不同的语句替换yield表达式。

// 不同点：
// - next()是将yield表达式替换成一个值。
// - throw()是将yield表达式替换成一个throw语句。
// - return()是将yield表达式替换成一个return语句。

var g1 = function* (x, y) {
  let result = yield x + y;
  return result;
};

var gen = g1(1, 2);
gen.next(); // Object {value: 3, done: false}

gen.next(1); // Object {value: 1, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = 1;


// gen.throw(new Error('出错了')); // Uncaught Error: 出错了
// 相当于将 let result = yield x + y
// 替换成 let result = throw(new Error('出错了'));


gen.return(2); // Object {value: 2, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = return 2;



console.log('**** yield* 表达式 ****')
// 如果在 Generator 函数内部，调用另一个 Generator 函数。需要在前者的函数体内部，自己手动完成遍历。
function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  // 手动遍历 foo()
  for (let i of foo()) {
    console.log(i);
  }
  yield 'y';
}
for (let v of bar()){
  console.log(v);
}
// x
// a
// b
// y

// 如果有多个 Generator 函数嵌套，写起来就非常麻烦。
// ES6 提供了yield*表达式，作为解决办法，用来在一个 Generator 函数里面执行另一个 Generator 函数。
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"

// 再来看一个对比的例子。
function* inner() {
  yield 'hello!';
}

function* outer1() {
  yield 'open';
  yield inner();
  yield 'close';
}

var gen = outer1()
gen.next().value // "open"
gen.next().value // 返回一个遍历器对象
gen.next().value // "close"

function* outer2() {
  yield 'open'
  yield* inner()
  yield 'close'
}

var gen = outer2()
gen.next().value // "open"
gen.next().value // "hello!"
gen.next().value // "close"


// 从语法角度看，如果yield表达式后面跟的是一个遍历器对象，需要在yield表达式后面加上星号
// 表明它返回的是一个遍历器对象。这被称为yield*表达式。
var delegatedIterator = (function* () {
  yield 'Hello!';
  yield 'Bye!';
}());

var delegatingIterator = (function* () {
  yield 'Greetings!';
  yield* delegatedIterator;
  yield 'Ok, bye.';
}());

for(let value of delegatingIterator) {
  console.log(value);
}
// "Greetings!
// "Hello!"
// "Bye!"
// "Ok, bye."

// yield*后面的 Generator 函数（没有return语句时），等同于在 Generator 函数内部，部署一个for...of循环。
function* concat(iter1, iter2) {
  yield* iter1;
  yield* iter2;
}
// 等同于
function* concat(iter1, iter2) {
  for (var value of iter1) {
    yield value;
  }
  for (var value of iter2) {
    yield value;
  }
}


// 如果yield*后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员。
function* gen1(){
  yield* ["a", "b", "c"];
}

gen1().next() // { value:"a", done:false }

// 任何数据结构只要有 Iterator 接口，就可以被yield*遍历。
var read = (function* () {
  yield 'hello';
  yield* 'hello';
})();

read.next().value // "hello"
read.next().value // "h"

// 如果被代理的 Generator 函数有return语句，那么就可以向代理它的 Generator 函数返回数据。
function* foo() {
  yield 2;
  yield 3;
  return "foo";
}

function* bar() {
  yield 1;
  var v = yield* foo(); // 函数foo的return语句，向函数bar提供了返回值。
  console.log("v: " + v);
  yield 4;
}

var it = bar();

it.next()
// {value: 1, done: false}
it.next()
// {value: 2, done: false}
it.next()
// {value: 3, done: false}
it.next();
// "v: foo"
// {value: 4, done: false}
it.next()
// {value: undefined, done: true}

// 再看一个例子。
function* genFuncWithReturn() {
  yield 'a';
  yield 'b';
  return 'The result';
}
function* logReturned(genObj) {
  let result = yield* genObj;
  console.log(result);
}

[...logReturned(genFuncWithReturn())]
// The result
// 值为 [ 'a', 'b' ]

// yield*命令可以很方便地取出嵌套数组的所有成员。
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for(let i=0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}

var tree = [ 'a', ['b', 'c'], ['d', 'e'] ];

for(let x of iterTree(tree)) {
  console.log(x);
}
// a
// b
// c
// d
// e

[...iterTree(tree)] // ["a", "b", "c", "d", "e"]


// 下面是一个稍微复杂的例子，使用yield*语句遍历完全二叉树。
// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
  if (t) {
    yield* inorder(t.left);
    yield t.label;
    yield* inorder(t.right);
  }
}

// 下面生成二叉树
function make(array) {
  // 判断是否为叶节点
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
}
var tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

// 遍历二叉树
var result = [];
for (let node of inorder(tree)) {
  result.push(node);
}

result
// ['a', 'b', 'c', 'd', 'e', 'f', 'g']




console.log('**** 作为对象属性的 Generator 函数 ****')

// 如果一个对象的属性是 Generator 函数，可以简写成下面的形式。
var obj = {
  * myGeneratorMethod() {
  }
};
// 它的完整形式如下，与上面的写法是等价的。
var obj = {
  myGeneratorMethod: function* () {
    // ···
  }
};



console.log('**** Generator 函数的this ****')

// Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，
// 也继承了 Generator 函数的prototype对象上的方法。

function* g2() {}

g2.prototype.hello = function () {
  return 'hi!';
};

var obj = g2();

obj instanceof g2 // true
obj.hello() // 'hi!'

// 如果把g当作普通的构造函数，并不会生效，因为g返回的总是遍历器对象，而不是this对象。
function* g3() {
  this.a = 11;
}

var obj = g3();
obj.next();
obj.a // undefined

// Generator 函数也不能跟new命令一起用，会报错。
function* F() {
  yield this.x = 2;
  yield this.y = 3;
}

// new F()
// TypeError: F is not a constructor

// 让 Generator 函数返回一个正常的对象实例，既可以用next方法，又可以获得正常的this
// 首先，生成一个空对象，使用call方法绑定 Generator 函数内部的this。
// 这样，构造函数调用以后，这个空对象就是 Generator 函数的实例对象了。

function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var obj = {};
var f = F.call(obj);

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

obj.a // 1
obj.b // 2
obj.c // 3

// 上面代码中，执行的是遍历器对象f，但是生成的对象实例是obj，有没有办法将这两个对象统一呢？
// 一个办法就是将obj换成F.prototype。
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var f = F.call(F.prototype);

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3

// 再将F改成构造函数，就可以对它执行new命令了。
function* gen2() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

function F2() {
  return gen2.call(gen2.prototype);
}

var f = new F2();

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3



console.log('************ 含义 ************')

// 1.Generator 与状态机
// Generator 是实现状态机的最佳结构。比如，下面的clock函数就是一个状态机。
var ticking = true;
var clock = function() {
  if (ticking)
    console.log('Tick!');
  else
    console.log('Tock!');
  ticking = !ticking;
}

// 这个函数如果用 Generator 实现，就是下面这样。
var clock = function* () {
  while (true) {
    console.log('Tick!');
    yield;
    console.log('Tock!');
    yield;
  }
};

// 上面的 Generator 实现与 ES5 实现对比，可以看到少了用来保存状态的外部变量ticking，这样就更简洁，
// 更安全（状态不会被非法篡改）、更符合函数式编程的思想，在写法上也更优雅。
// Generator 之所以可以不用外部变量保存状态，是因为它本身就包含了一个状态信息，即目前是否处于暂停态。


// 2.Generator 与上下文

// Generator 函数不是这样，它执行产生的上下文环境，一旦遇到yield命令，就会暂时退出堆栈，但是并不消失，
// 里面的所有变量和对象会冻结在当前状态。等到对它执行next命令时，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行。

function* gen3() {
  yield 1;
  return 2;
}

var g3 = gen3();

console.log(
  g3.next().value,
  g3.next().value,
);



console.log('************ 应用 ************')

// 1.异步操作的同步化表达

// Generator 函数的暂停执行的效果，意味着可以把异步操作写在yield表达式里面，等到调用next方法时再往后执行。
// 这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在yield表达式下面，反正要等到调用next方法时再执行。
// 所以，Generator 函数的一个重要实际意义就是用来处理异步操作，改写回调函数。

// function* loadUI() {
//   showLoadingScreen();
//   yield loadUIDataAsynchronously();
//   hideLoadingScreen();
// }
// var loader = loadUI();
// // 加载UI
// loader.next()

// // 卸载UI
// loader.next()


// Ajax 是典型的异步操作，通过 Generator 函数部署 Ajax 操作，可以用同步的方式表达。
// function* main() {
//   var result = yield request("http://some.url");
//   var resp = JSON.parse(result);
//     console.log(resp.value);
// }

// function request(url) {
//   makeAjaxCall(url, function(response){
//     it.next(response);
//   });
// }

// var it = main();
// it.next();

// 2.控制流管理
// 如果有一个多步操作非常耗时，采用回调函数，可能会写成下面这样。
// step1(function (value1) {
//   step2(value1, function(value2) {
//     step3(value2, function(value3) {
//       step4(value3, function(value4) {
//         // Do something with value4
//       });
//     });
//   });
// });

// 采用 Promise 改写上面的代码。
// Promise.resolve(step1)
//   .then(step2)
//   .then(step3)
//   .then(step4)
//   .then(function (value4) {
//     // Do something with value4
//   }, function (error) {
//     // Handle any error from step1 through step4
//   })
//   .done();

// Generator 函数可以进一步改善代码运行流程。

// function* longRunningTask(value1) {
//   try {
//     var value2 = yield step1(value1);
//     var value3 = yield step2(value2);
//     var value4 = yield step3(value3);
//     var value5 = yield step4(value4);
//     // Do something with value4
//   } catch (e) {
//     // Handle any error from step1 through step4
//   }
// }

// scheduler(longRunningTask(initialValue));

// function scheduler(task) {
//   var taskObj = task.next(task.value);
//   // 如果Generator函数未结束，就继续调用
//   if (!taskObj.done) {
//     task.value = taskObj.value
//     scheduler(task);
//   }
// }


// 利用for...of循环会自动依次执行yield命令的特性，提供一种更一般的控制流管理的方法。
// var steps = [step1Func, step2Func, step3Func];

// function* iterateSteps(steps){
//   for (var i=0; i< steps.length; i++){
//     var step = steps[i];
//     yield step();
//   }
// }

// 3.部署 Iterator 接口
// 利用 Generator 函数，可以在任意对象上部署 Iterator 接口。
function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i=0; i < keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
}

var myObj = { foo: 3, bar: 7 };

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);
}

// foo 3
// bar 7

// 下面是一个对数组部署 Iterator 接口的例子，尽管数组原生具有这个接口。
function* makeSimpleGenerator(array){
  var nextIndex = 0;

  while(nextIndex < array.length){
    yield array[nextIndex++];
  }
}

var gen = makeSimpleGenerator(['yo', 'ya']);

gen.next().value // 'yo'
gen.next().value // 'ya'
gen.next().done  // true


// 4.作为数据结构

// Generator 可以看作是数据结构，更确切地说，可以看作是一个数组结构
// 因为 Generator 函数可以返回一系列的值，这意味着它可以对任意表达式，提供类似数组的接口。

// function* doStuff() {
//   yield fs.readFile.bind(null, 'hello.txt');
//   yield fs.readFile.bind(null, 'world.txt');
//   yield fs.readFile.bind(null, 'and-such.txt');
// }

// for (task of doStuff()) {
//   // task是一个函数，可以像回调函数那样使用它
// }




