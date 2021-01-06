var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6

console.log('*************** 分割 ****************');

// 小括号内是父级作用域，大括号内是子作用域
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}

console.log('*************** 分割 ****************');

// 1.不存在变量提升
// console.log(bar); // 报错ReferenceError
// let bar = 2;

// 2.暂时性死区(temporal dead zone，简称 TDZ)： 
// 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响
// var tmp = 123;
// {
//   // tmp = 'abc'; // ReferenceError
//   let tmp;
// }

// “暂时性死区”也意味着typeof不再是一个百分之百安全的操作。
// typeof x; // ReferenceError
// let x;

// 3.不允许重复声明

// 3.1 let不允许在相同作用域内，重复声明同一个变量
// SyntaxError: Identifier 'a' has already been declared
// function func() {
//   let a = 10;
//   var a = 1;
// }

// 3.2 不能在函数内部重新声明参数
// SyntaxError: Identifier 'a' has already been declared
// function func(a) {
//  let a = 1;
// }

console.log('*************** 块级作用域 ****************');

var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world'; // 变量提升到函数作用域顶端
  }
}
console.log(tmp); // 2021-01-06T06:40:06.308Z
f(); // undefined

var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5

// ES6 允许块级作用域的任意嵌套。
// 块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了。
// IIFE 写法
(function () {
  let tmp = 123
}());

// 块级作用域写法
{
  let tmp = 123
}

console.log('*************** 分割 ****************');

// ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用

// ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域
// 第一种写法，报错
// if (true) let x = 1;

// 第二种写法，不报错
if (true) {
  let x = 1;
}

console.log('*************** const ****************');

// 1.一旦声明，常量的值就不能改变。
// const PI = 3.1415;
// PI = 3; // TypeError: Assignment to constant variable.

// 2.一旦声明变量，就必须立即初始化，不能留到以后赋值
// const foo;
// SyntaxError: Missing initializer in const declaration

// 3.和let一样
// 3.1 有块级作用域
// 3.2 不存在变量提升、存在暂时性死区
// 3.3 不可重复声明

// const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
// foo = {}; // TypeError: "foo" is read-only

// 常量foo储存的是一个地址，这个地址指向一个对象
// 不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性

// globalThis 对象
// 浏览器： window, this, selef
// Node: global, this
// Web Worker： selef

// ES2020 在语言标准的层面，引入globalThis作为顶层对象。
// 也就是说，任何环境下，globalThis都是存在的，都可以从它拿到顶层对象，指向全局环境下的this。
console.log(globalThis);