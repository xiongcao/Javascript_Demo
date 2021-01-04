// 1.this指向由外层函数作用域来决定
// 2.=> 不能作为构造函数来使用
// 3. 没有arguments 对象，用rest（拓展运算符）代替
// 4.yield 命令不能生效，在generator函数中
// 5.不适合使用箭头函数的情况：函数声明、执行语句较多、递归、需要引用函数名、事件绑定与解绑


// this指向由外层函数作用域来决定

// function foo() {
//   console.log(this); // { a: 2 }
//   return (a) => {
//     console.log(this.a); // 2
//   }
// }

// let obj1 = { a: 2 };
// let obj2 = { a: 3 };
// let bar = foo.call(obj1);
// bar.call(obj2);


// const person = {
//   name: 'xiaoming',
//   eat() {
//     console.log(this); // => person对象
//   },
//   drind: () => {
//     console.log(this); // {} or window
//   }
// }

// person.eat();
// person.drind();

// this 指向是固化的，箭头函数的内部是没有自己的this的，只能通过父级作用域来获取到this,闭包的this;
// 不能作为构造函数来使用： bind(), apply(), call()

// function foo() {
//   console.log(this); // { id: 1 }
//   return () => {
//     console.log(this); // { id: 1 }
//     return () => {
//       console.log('id: ', this.id); // id: 1
//     }
//   }
// }

// let f = foo.call({ id: 1 });
// let f1 = f.call({ id: 2 })();
// let f2 = f().call({ id: 3 });


// 没有arguments 对象，用rest（拓展运算符）代替

// const test = () => {
//   console.log(arguments); // ncaught ReferenceError: arguments is not defined
// }
// test();

// function foo () {
//   console.log(arguments); // Arguments [callee: ƒ, Symbol(Symbol.iterator): ƒ]

//   setTimeout(() => {
//     console.log(arguments); // 引用的父级函数的arguments
//   });
// }
// foo();