// 函数括号内相当于函数作用域的顶端作用域（相当于let x = 1）【官网手册上讲的是一个单独的作用域】
// function foo(x = 1) {
//   let x = 2; // SyntaxError: Identifier 'x' has already been declared
//   console.log(x);
// }

// let x = 1
// function foo(x = x) { // ReferenceError: Cannot access 'x' before initialization
//   console.log(x);
// }

// foo()

/**
 * 1. foo(x, y)函数，括号内形成一个单独作用域，相当于 foo(let x, let y);
 * 2. 函数 y() 是函数foo()的闭包，函数y中的x引用的是foo(let, x)中的x，
 * 3. foo(){} 中的var x = 3;也形成一个单独的作用域
 */
let x = 1;
function foo(x, y = function () {
  x = 2;
  console.log(x);
}) {
  var x = 3;
  y();
  console.log(x);
}
foo();
console.log(x);


/*************** 函数参数长度 ***************/
// function test(a, b) { };
// test(1);
// console.log(test.length); // 2

// function test(c = 1, a, b) { };
// test(1);
// console.log(test.length); // 0

// function test(a, b, c = 1, d, e) { };
// test(1);
// console.log(test.length); // 2

/*************** arguments  ***************/

// function test(a, b, c, d, e) {
//   console.log(arguments); // { '0': 1, '1': 2, '2': 3 }
// }
// test(1, 2, 3);
// console.log(test.length); // 5

// 实参和形参一一对应
// function test(a, b, c, d, e) {
//   b = 7; // or
//   // arguments[1] = 7;
//   console.log(arguments); // { '0': 1, '1': 7, '2': 3 }
// }
// test(1, 2, 3);

// 实参和形参不对应了，一旦形参给了默认值，映射关系将被打破
// function test(a, b, c = 3, d, e) {
//   arguments[1] = 7;
//   console.log(b); // 2 没有被改变
//   console.log(arguments); // { '0': 1, '1': 7, '2': 3 }
// }
// test(1, 2, 3);
