// 模式匹配（结构化赋值）

/******************** 对象解构 ****************/
// let { a, b, c } = { a: 1, b: 2, c: 3 };
// console.log(a, b, c); // 1 2 3

// let { a: a1, b: b1, c: c1 } = { a: 1, b: 2, c: 3 };
// console.log(a1, b1, c1); // 1 2 3

// let { a = 2, b } = { b: 3 }
// console.log(a, b); // 2 3

// let { a, b, c } = { b: 3 }
// console.log(a, b, c); // undefined 3 undefined

// let person = {
//   name: 'zhangsan',
//   age: 50,
//   son: {
//     name: 'lisi',
//     age: 30,
//     son: {
//       name: 'wangwu',
//       age: 10
//     }
//   }
// }

// let { son: { son: { name } } } = person;
// console.log(name);

// let a = [1, 2, 3];
// let obj = {};

// [obj.a, obj.b, obj.c] = a;
// console.log(obj.a, obj.b, obj.c); // 1 2 3


/******************** 数组解构 ****************/
// let [a, b, c] = [1, 2, 3];
// console.log(a, b, c); // 1 2 3

// let [a, [b, c], [d, [e]]] = [1, [2, 3], [4, [5]]];
// console.log(a, b, c, d, e); //1 2 3 4 5

// 解构失败: 1.变量多了； 2：值多了
// let [a, b, c] = [1, , 3];
// console.log(a, b, c); // 1 undefined 3

// 结构默认值
// let [a = 6] = [1];
// console.log(a); // 1

// let [a = 6] = [];
// console.log(a); // 6

// let [x = 1, y = x] = [];
// console.log(x, y); // 1, 1

// let x = 1
// let [x = 1, y = x] = [];
// console.log(x, y); // SyntaxError: Identifier 'x' has already been declared

// let [x = y, y = 1] = [];
// console.log(x, y); // ReferenceError: Cannot access 'y' before initialization


/******************** 特殊解构 ****************/

// 数组也是特殊的对象，也能进行解构赋值
// let arr = [1, 2, 3];
// let { 0: first, [arr.length - 1]: last } = arr;
// console.log(first, last); // 1 3

// [(b)] = [3];
// console.log(b); // 3

// 模式不匹配，括号里面相当于表达式
// ([b]) = [3];
// console.log(b); // SyntaxError: Invalid left-hand side in assignment

// ({ a: (b) = {} }); // 本身没有匹配
// console.log(b); // {}

// let { a: x, a: y } = { a: 1 };
// console.log(x, y); // 1 1

// const [a, b, c, d, e] = 'hello';
// console.log(a, b, c, d, e); // h e l l o

/******************** 特殊解构-隐式转换 ****************/

// 1.字符串、数字、布尔值都可以进行隐式转换
// 2.undefined， null 不能进行隐式转换

// let { length: len } = 'hello';  // 类数组
// console.log(len); // 5

// let { toString: s } = 123;
// console.log(s === Number.prototype.toString);

// let { toString: s } = false;
// console.log(s === Boolean.prototype.toString);


/******************** 函数参数解构 ****************/