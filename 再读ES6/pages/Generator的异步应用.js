console.log('************ 传统方法 **************')

// ES6 诞生以前，异步编程的方法，大概有下面四种。

// - 回调函数
// - 事件监听
// - 发布/订阅
// - Promise 对象

// Generator 函数将 JavaScript 异步编程带入了一个全新的阶段。


console.log('************ 基本概念 **************')

// 1.异步

// 所谓"异步"，简单说就是一个任务不是连续完成的，可以理解成该任务被人为分成两段，
// 先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段。


// 2.回调函数

// JavaScript 语言对异步编程的实现，就是回调函数。
// 所谓回调函数，就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数。

// 一个有趣的问题是，为什么 Node 约定，回调函数的第一个参数，必须是错误对象err（如果没有错误，该参数就是null）？
// 原因是执行分成两段，第一段执行完以后，任务所在的上下文环境就已经结束了。
// 在这以后抛出的错误，原来的上下文环境已经无法捕捉，只能当作参数，传入第二段。


// 3.Promise;

// 它不是新的语法功能，而是一种新的写法，允许将回调函数的嵌套，改成链式调用。
// Promise 提供then方法加载回调函数，catch方法捕捉执行过程中抛出的错误。

// Promise 的写法只是回调函数的改进，使用then方法以后，异步任务的两段执行看得更清楚了，除此以外，并无新意。

// Promise 的最大问题是代码冗余，原来的任务被 Promise 包装了一下，不管什么操作，一眼看去都是一堆then，原来的语义变得很不清楚。


// 3.Generator 函数

// 3.1 协程

// 传统的编程语言，早有异步编程的解决方案（其实是多任务的解决方案）。
// 其中有一种叫做"协程"（coroutine），意思是多个线程互相协作，完成异步任务。

// 协程有点像函数，又有点像线程。它的运行流程大致如下。

// - 第一步，协程A开始执行。
// - 第二步，协程A执行到一半，进入暂停，执行权转移到协程B。
// - 第三步，（一段时间后）协程B交还执行权。
// - 第四步，协程A恢复执行。

// 举例来说，读取文件的协程写法如下。
function* asyncJob() {
  // ...其他代码
  // var f = yield readFile(fileA);
  // ...其他代码
}

// 上面代码的函数asyncJob是一个协程，它的奥妙就在其中的yield命令。
// 它表示执行到此处，执行权将交给其他协程。也就是说，yield命令是异步两个阶段的分界线。

// 协程遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。
// 它的最大优点，就是代码的写法非常像同步操作，如果去除yield命令，简直一模一样。

// 3.2 协程的 Generator 函数实现 

// Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。

// 整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。
// 异步操作需要暂停的地方，都用yield语句注明。

// Generator 函数的执行方法如下。
function* gen(x) {
  var y = yield x + 2;
  return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }


// 3.3 Generator 函数的数据交换和错误处理

// Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。

// 除此之外，它还有两个特性，使它可以作为异步编程的完整解决方案：
// 函数体 "内外" 的数据交换 和 错误处理机制。

// next返回值的 value 属性，是 Generator 函数向外输出数据；
// next方法还可以接受参数，向 Generator 函数体内输入数据。

function* gen(x){
  var y = yield x + 2;
  return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next(2) // { value: 2, done: true }

// Generator 函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。
function* gen(x){
  try {
    var y = yield x + 2;
  } catch (e){
    console.log(e);
  }
  return y;
}

var g = gen(1);
console.log(
  g.next(),
  // g.throw('出错了')
);
// 出错了

// 上面代码的最后一行，Generator 函数体外，使用指针对象的throw方法抛出的错误，可以被函数体内的try...catch代码块捕获
// 这意味着，出错的代码与处理错误的代码，实现了时间和空间上的分离，这对于异步编程无疑是很重要的。

// 3.4 异步任务的封装

// 使用 Generator 函数，执行一个真实的异步任务。

// function* gen(){
//   var url = 'https://api.github.com/users/github';
//   var result = yield fetch(url);
//   console.log(result);
// }

// var g = gen();
// var result = g.next();

// result.value.then(function(data){
//   return data.json();
// }).then(function(data){
//   g.next(data);
// });

// 虽然 Generator 函数将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段、何时执行第二阶段）。

console.log('************* Thunk 函数 ****************');

// 4.Thunk 函数

// Thunk 函数是自动执行 Generator 函数的一种方法。

// 4.1 参数的求值策略

var x = 1;

function f(m) {
  return m * 2;
}

// "传值调用"，即在进入函数体之前，就计算x + 5的值（等于 6），再将这个值传入函数f
f(x + 5);
// 传值调用时，等同于
f(6);

// “传名调用”，即直接将表达式x + 5传入函数体，只在用到它的时候求值。
f(x + 5);
// 传名调用时，等同于
(x + 5) * 2;

// 传值调用比较简单，但是对参数求值的时候，实际上还没用到这个参数，有可能造成性能损失。

function f(a, b){
  return b;
}

f(3 * x * x - 2 * x - 1, x);
// 上面代码中，函数f的第一个参数是一个复杂的表达式，但是函数体内根本没用到。
// 对这个参数求值，实际上是不必要的。因此，有一些计算机学家倾向于"传名调用"，即只在执行时求值。

// 4.2 Thunk 函数的含义

// 编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。
// 这个临时函数就叫做 Thunk 函数。
function f(m) {
  return m * 2;
}

f(x + 5);

// 等同于

var thunk = function () {
  return x + 5;
};

// function f(thunk) {
//   return thunk() * 2;
// }


// 4.3 JavaScript 语言的Thunk 函数

// JavaScript 语言是传值调用，它的 Thunk 函数含义有所不同。
// 在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数。

// 正常版本的readFile（多参数版本）
// fs.readFile(fileName, callback);

// // Thunk版本的readFile（单参数版本）
// var Thunk = function (fileName) {
//   return function (callback) {
//     return fs.readFile(fileName, callback);
//   };
// };

// var readFileThunk = Thunk(fileName);
// readFileThunk(callback);

// 上面代码中，fs模块的readFile方法是一个多参数函数，两个参数分别为文件名和回调函数。
// 经过转换器处理，它变成了一个单参数函数，只接受回调函数作为参数。这个单参数版本，就叫做 Thunk 函数。

// 任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式。

// 下面是一个简单的 Thunk 函数转换器。

// ES5版本
var Thunk = function(fn){
  return function (){
    var args = Array.prototype.slice.call(arguments);
    return function (callback){
      args.push(callback);
      return fn.apply(this, args);
    }
  };
};

// ES6版本
var Thunk1 = function(fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    }
  };
};

// var readFileThunk = Thunk(fs.readFile);
// readFileThunk(fileA)(callback);

// 下面是另一个完整的例子。
// function f(a, cb) {
//   cb(a);
// }
// var ft = Thunk(f);

// ft(1)(console.log) // 1

// 4.4 Thunkify 模块


// var thunkify = require('thunkify');
// var fs = require('fs');

// var read = thunkify(fs.readFile);
// read('package.json')(function(err, str){
//   // ...
// });

// 4.5 Generator 函数的流程管理

// Thunk 函数现在可以用于 Generator 函数的自动流程管理。

// Generator 函数可以自动执行。

function* gen() {}

var g = gen();
var res = g.next();

while(!res.done){
  console.log(res.value);
  res = g.next();
}

// 上面代码中，Generator 函数gen会自动执行完所有步骤。但是，这不适合异步操作。
// 如果必须保证前一步执行完，才能执行后一步，上面的自动执行就不可行。

// var fs = require('fs');
// var thunkify = require('thunkify');
// var readFileThunk = thunkify(fs.readFile);

// var gen = function* (){
//   var r1 = yield readFileThunk('/etc/fstab');
//   console.log(r1.toString());
//   var r2 = yield readFileThunk('/etc/shells');
//   console.log(r2.toString());
// };


// 4.6 Generator 函数的自动流程管理

// Thunk 函数真正的威力，在于可以自动执行 Generator 函数
// 下面就是一个基于 Thunk 函数的 Generator 执行器。


console.log('************* co 模块 ****************');

// 1.基本用法

// co 模块，用于 Generator 函数的自动执行。

// 下面是一个 Generator 函数，用于依次读取两个文件。
var gen = function* () {
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

// co 模块可以让你不用编写 Generator 函数的执行器。
// var co = require('co');
// co(gen);

// 上面代码中，Generator 函数只要传入co函数，就会自动执行。

// co函数返回一个Promise对象，因此可以用then方法添加回调函数。
// co(gen).then(function (){
//   console.log('Generator 函数执行完成');
// });

// 2.co 模块原理

// 3. 基于Promise 对象的自动执行


