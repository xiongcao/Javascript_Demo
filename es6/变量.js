/** ************** let ************** */
// 1. 块级作用域
// 2. 变量无法提升，会产生一个暂时性死区(变量提升是提升到当前作用域环境的顶端)
// 3. 同一作用域下无法重复声明
// 4. 本质上就是为了给js增加一个块级作用域 {}
// 5. 需要先声明

// 暂时性死区:TDZ(temporal Dead Zone)

// 块级作用域
// let a = 10;
// function test() {
//   let a = 20;
//   console.log(a); // 20
// }

// 变量无法提升，会产生一个暂时性死区
// console.log(a) // Cannot access 'a' before initialization
// let a

// console.log(typeof a);
// let a;

// var a = a
// console.log(a);

// let b = b;
// console.log(b);

// function test(x = y, y = 2) {
//   console.log(x, y);
// }

// 同一作用域下无法重复声明
// function test(a) {
//     let a = 10;
//     console.log(a);
// }

//  改正 ==>
// function test(a) {
//   {
//     let a = 10;
//     console.log(a);
//   }
// }

// function test() {
//   var a = 1;
// }

// test();

// SyntaxError: Identifier 'i' has already been declared
// for (let i = 0; i < 2; i++) {
//   var i = 'a'; // 变量提升
//   console.log(i);
// }

// 改正 ==> ()与{}是父子级作用域的关系
// let本质上就是为了给js增加一个块级作用域
// for (let i = 0; i < 2; i++) {
//   let i = 'a';
//   console.log(i); // a, a
// }
// 相当于
// {
//   let i = 0;
//   {
//     let i = 'a';
//     console.log(i);
//   }
// }


// let a = 1;
// var a = 2;
// console.log(a);

// var arr = [];
// for (var i = 0; i < 5; i++) {
//   arr[i] = function () {
//     console.log(i);
//   }
// }

// i = 0
// arr[0]()
// i = 1
// arr[1]()


// (test = async () => {
//   var result = []
//   for (let i = 0; i < 5; i++) {
//     request(i).then(res => {
//       result.push(res);
//     })
//     // result.push(await request(i));
//     console.log(result);
//   }
//   // setTimeout(() => {
//   //   console.log(result);
//   // }, 1000);
// })()

// function request(i){
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(`第${i}个`)
//     }, 100);
//   })
// }

/** ************** const ************** */

// 基础类型存放在栈内存中，引用类型存放在堆内存中
// 1.一旦定义，必须赋值
// 2.有块级作用域，不能变量提升，有暂时性死区
// 3.无法重复声明

// 1.一旦定义，必须赋值
// const a; // SyntaxError: Missing initializer in const declaration

// 2.有块级作用域，不能变量提升，有暂时性死区
// {
//   console.log(a); // ReferenceError: Cannot access 'a' before initialization
//   const a = 1
// }
// console.log(a); //ReferenceError: a is not defined

// 3.无法重复声明
// const a = 1;
// var a = 1; // SyntaxError: Identifier 'a' has already been declared
