// let myObject = {};
// myObject[true] = 'foo';
// myObject[3] = 'bar';
// myObject[myObject] = 'baz';

// console.log(myObject); // { '3': 'bar', true: 'foo', '[object Object]': 'baz' }
// console.log(myObject[myObject]); // baz
// console.log(myObject['myObject']); // undefined
// console.log(myObject['[object Object]']); // baz

// console.log('=============================');

// console.log(
//   Boolean.prototype.toString.call(true), // 'true'
//   Object.prototype.toString.call(true), // '[object Boolean]'
//   Object.prototype.toString.call({}), // '[object Object]'
//   Number.prototype.toString.call(3), // '3'
// );


// const a = { a: 1 };
// const b = { b: 2 };
// const obj = {
//   [a]: 'valueA',
//   [b]: 'valueB'
// }

// console.log(obj); // { '[object Object]': 'valueB' }


// const person = {
//   sayName() {
//     console.log('hello');
//   }
// }

// console.log(person.sayName.name); // sayName


/**************  Object的属性和方法 ************ */
// const obj = { a: 1 };

// console.log(Object.getOwnPropertyDescriptor(obj, 'a'));
// {
//   configurable: true, (可配置)
//   enumerable: true, （可枚举）
//   writable: true, （可写）
//   value: 1
// }

// let obj = {};
// Object.defineProperty(obj, 'a', {
//   configurable: true, // 如果为false，则下方不可重新配置改属性，报错
//   enumerable: true,
//   writable: true,
//   value: 2
// })

// Object.defineProperty(obj, 'a', {
//   configurable: true,
//   enumerable: true,
//   writable: true,
//   value: 2
// }) // TypeError: Cannot redefine property: a

// console.log(obj); // { a: 2 }
// console.log(Object.getOwnPropertyDescriptor(obj, 'a')); // { a: 2 }

// 以下两种情况均和configurable有关，且configurable优先级更高
// configurable： false; 不可删除，不可修改
// configurable： true; 取决于 writable

// obj.a = 3;
// console.log(obj); // 静默失败， { a: 2 }；如果是严格模式，则 TypeError: Cannot assign to read only property 'a' of object '#<Object>'

// delete obj.a;
// console.log(obj);

/**************  END ************ */


/**************  getter setter ************ */

// let obj = { a: 1 };

// obj.a; // [[Get]] 默认操作；查找当前属性，如果没有，查找原型

// obj.a = 3; // 赋值操作 [[Put]], [[Put]]默认操作


// let obj = {
//   log: ['example', 'test'],
//   get latest() {
//     if (this.log.length === 0) {
//       return undefined;
//     }
//     return this.log[this.log.length - 1];
//   }
// }

// obj.log.push('last');
// console.log(obj.latest);

// var myObject = {
//   get a() {
//     return 2;
//   }
// }

// // 如果一个描述符不具有 value、writable、get 和 set 中的任意一个键，那么它将被认为是一个数据描述符
// // 如果一个描述符同时拥有 value 或 writable 和 get 或 set 键，则会产生一个异常
// Object.defineProperty(myObject, 'b', {
//   // configurable: true,
//   enumerable: true,
//   // writable: true,
//   // value: 3,
//   get: function () {
//     return this.a * 2;
//   }
// })

// console.log(myObject.a);
// console.log(myObject.b);
