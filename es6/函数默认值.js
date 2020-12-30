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