
// function Foo(name) {
//   this.name = name;
// }

// Foo.prototype.myName = function () {
//   return this.name;
// }

// Foo.prototype.myName2 = function () {
//   return this.name;
// }

// function Bar(name, label) {
//   // Foo.call(this, name);
//   this.label = label;
// }

// Foo.prototype = Bar.prototype;

// // Bar.prototype.myLabel = function () {
// //   return this.label
// // }

// // Bar.prototype.myLabel2 = function () {
// //   return this.label
// // }

// let f = new Foo('b')

// // var a = new Bar('a', 'obj a')
// // a.myName();
// // a.myLabel();
// // console.log(Bar.prototype, Foo.prototype)

// // var Foo = {};
// // var a1 = Object.create(Foo);
// // console.log(a1); // Object {} 
// // Object.defineProperty(Foo, "constructor", {
// //   enumerable: false,
// //   value: function Gotcha() { }
// // });
// // console.log(a1); // Gotcha {}


// var a = [1, 2]


// console.log(typeof a[1] === 'undefined')

// a.forEach(item => {
//   console.log(item, 1)
// })

// a['foobar'] = 2
// console.log(a.foobar)
// console.log(a)

// console.log(a.slice())
// a.reverse()
// function output (a) {
//   console.log(a)
// }

// output(
//   typeof (
//     function () {
//       output('hello world')
//     }
//   )()
// )

// Math.max(1, 2, 12)

// var a = Array(3)
// var a = [undefined, 1, 2]
// a.forEach((item ,i) => {
//   console.log(item, i)
// })

// for (let index = 0; index < a.length; index++) {
//   const element = a[index];
//   console.log(element, index)
// }

// for (const key in a) {
//   if (a.hasOwnProperty(key)) {
//     const element = a[key];
//     console.log(element, key)
//   }
// }

// for (const iterator of a) {
//   console.log(iterator)
// }

// a.filter(item => {
//   console.log(item)
// })

// a.reduce((x, y) => {
//   console.log(x, y)
//   return x
// })

// var a = {
//   b: 42,
//   c: "42",
//   d: [1,2,3]
// }

// var b = JSON.stringify(a, (k, v) => {
//   return v
// }, '++')

// console.log(b)

// function bindThis(f, oTarget) {
//   return function () {
//     return f.apply(oTarget, arguments);
//   }
// }

// let obj = {
//   a: 1,
//   b: 's'
// }
// bindThis(function () {
//   console.log(this.a, this.b)
// }, obj)()


// var a = 42;
// do {
//  // ..
//  a = 0;
// } while (a);
// a;
// console.log(a)

// console.log(getUrlParam('http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe'))

// function getUrlParam(sUrl, sKey) {
//   let searchStr = sUrl.substring(sUrl.indexOf('?') + 1, sUrl.lastIndexOf('#'))
//   const params = searchStr.split('&')
//   const result = []
//   const obj = {}
//   const arr = []
//   const list = params.map((p) => {
//     let index = p.indexOf('=')
//     let key = p.substring(0, index)
//     let val = p.substring(index + 1)
//     sKey == key && result.push(val)
//     if (Object.keys(obj).findIndex(key)) { // 已存在
//       arr.push(key)
//     } else {
//       obj.key = []
//       arr = []
//     }
//     arr.push(val)
//     return { key, val }
//   })
//   console.log(Object.keys(list))
//   if (result.length !== 0) {
//     if(result.length === 1) {
//       return result.toString()
//     }
//     return result
//   } else {
//     if (sKey) {
//       return ''
//     }
//     return list
//   }
// }

// function getUrlParam(sUrl, sKey) {
//   var param = sUrl.split('#')[0].split('?')[1];
//   if (sKey){//指定参数名称
//       var strs = param.split('&');
//       var arrs = new Array();//如果存在多个同名参数，则返回数组
//       for(var i = 0, len = strs.length; i < len; i++){
//           var tmp = strs[i].split('=');
//           if(tmp[0] == sKey){
//               arrs.push(tmp[1]);
//           }
//       }
//       if (arrs.length == 1){//返回该参数的值或者空字符串
//           return arrs[0];
//       } else if (arrs.length == 0){
//           return "";
//       } else {
//           return arrs;
//       }
//   } else {//不指定参数名称，返回全部的参数对象 或者 {}
//       if(param == undefined || param == ""){
//           return {};
//       } else {
//           var strs = param.split('&');
//           var arrObj = new Object();
//           for(var i = 0, len = strs.length; i < len; i++){
//               var tmp = strs[i].split('=');
//               if (!(tmp[0] in arrObj)) {
//                   arrObj[tmp[0]] = [];
//               }
//               arrObj[tmp[0]].push(tmp[1]);               
//           }
//           return arrObj;
//       }
//   }
// }

// ;(function () {
//   function fn() {
//     alert(2)
//   }
//   setTimeout('fn()', 1000); // 全局变量 打印1
//   setTimeout(fn, 1000); // 局部变量 打印2
// })()

// function fn(){
//   alert(1)
// }

// function fn1(fn) {
//   var max = 100
//   fn(max)
// }

// fn1(function(max) {
//   max+=1
//   console.log(max)
// })


// for (let index = 0; index < 1000000; index++) {
//   console.log(index)
// }
// document.write('王鑫是sd')

// setTimeout(() => {
//   console.log(1111)
// }, 1005);

// setTimeout(() => {
//   console.log(2222)
// }, 1000);

// var p3 = new Promise(function (resolve, reject) {
//   console.log(111)
//   resolve("B");
// });
// var p1 = new Promise(function (resolve, reject) {
//   console.log(222)
//   resolve(p3); // p3 => B
// });
// var p2 = new Promise(function (resolve, reject) {
//   console.log(333)
//   resolve("A");
// });
// p1.then(function (v) {
//   console.log(444)
//   console.log(v);
// });

// p2.then(function (v) {
//   console.log(555)
//   console.log(v);
// });

// var p = Promise.resolve(42);
// p.then(
//   // function fulfilled(msg) {
//   //   // 数字没有string函数，所以会抛出错误
//   //   console.log(msg.toLowerCase());
//   // }
// ).then((res) => {
//   console.log(res)
//   msg.toLowerCase()
// }, (err) => {
//   console.log(err)
// }).then(null, (err) => {
//   console.log(err)
// })


// function* foo(x) {
//   var y = x * (yield);
//   return y;
// }
// var it = foo(6);
// // 启动foo(..) 
// var res0 = it.next();
// console.log(res0.value) // undefined
// var res = it.next(7);
// console.log(res.value); // 42


// var a = 1;
// var b = 2;
// function* foo() {
//   a++;
//   yield;
//   b = b * a;
//   a = (yield b) + 3;
// }
// function* bar() {
//   b--;
//   yield;
//   a = (yield 8) + b;
//   console.log(a)
//   b = a * (yield 2);
// }

// function step(gen) {
//   var it = gen();
//   var last;
//   return function () {
//     // 不管yield出来的是什么，下一次都把它原样传回去！
//     last = it.next(last).value;
//   };
// }

// // 确保重新设置a和b 
// a = 1; 
// b = 2; 
// var s1 = step( foo ); 
// var s2 = step( bar ); 

// /*************** 顺序执行 *************** */
// // 首次运行*foo()
// // s1(); // a = 2, b = 2, last = undefined
// // s1(); // a = 2, b = 4, last = 4
// // s1(); // a = 7, b = 4, last = undefined

// // // 现在运行*bar() 
// // s2(); // a = 7, b = 3, last = undefined
// // s2(); // a = 7, b = 3, last = 8
// // s2(); // a = 11, b = 3, last = 2
// // s2(); // a = 11, b = 22, last = 2


// /*************** 交替执行 *************** */
// s2(); // a = 1, b = 1, last = undefined ---yeild
// s2(); // a = 1, b = 1, last = 8 ---yeild 8
// s1(); // a = 2, b = 1, last = undefined ---yeild
// s2(); // a = 9, b = 1, last = 2 ---yeild 2 （此时a=9被暂停了）
// s1(); // a = 9, b = 9, last = 9 ---yeild b
// s1(); // a = 12, b = 9, last = undefined
// s2(); // a = 12, b = 18, last = undefined
// console.log(a, b)


// function* foo() {
//   console.log("inside *foo():", yield "B");
//   console.log("inside *foo():", yield "C");
//   return "D";
// }
// function* bar() {
//   console.log("inside *bar():", yield "A");
//   // yield委托！
//   console.log("inside *bar():", yield* foo());
//   console.log("inside *bar():", yield "E");
//   return "F";
// }
// var it = bar();
// console.log("outside:", it.next().value);
// // outside: A 
// console.log("outside:", it.next(1).value);
// // inside *bar(): 1 
// // outside: B 
// console.log("outside:", it.next(2).value);
// // inside *foo(): 2 
// // outside: C 
// console.log("outside:", it.next(3).value);
// // inside *foo(): 3 
// // inside *bar(): D 
// // outside: E 
// console.log("outside:", it.next(4).value);
//  // inside *bar(): 4
//  // outside: F


// var w1 = new Worker('./js/worker.js');

// w1.addEventListener( "message", function(evt){ 
//   console.log(evt.data)
//  } );


// let n = 0
// let str = '1'

// setTimeout(() => {
//   for (; n < 10000000; n++) {
//     str += n
//   }
//   console.log(n)
// }, 100);

// var obj = { a: 0 }

// var fn = function () {
//   this.a = 1;
//   console.log(this)
// }
// fn.call(obj, 11)

// function bar(val) {
//   console.log("bar called!");
//   return y + val;
// }
// function foo(x = y + 3, z = bar(x)) {
//   console.log(x, z);
// }
// var y = 5;
// foo(); // "bar called" 
// // 8 13 
// foo(10); // "bar called" 
// // 10 15 
// y = 6;
// foo(undefined, 10); // 9 10


// for (var i = 1; i <= 5; i++) {
//   (function () {
//     var j = i;
//     console.log(i, j)
//     setTimeout(function timer() {
//       console.log(j);
//     }, j * 1000);
//   })();
// }

// var i = 1;
// (function () { 
//   var j = i;
//   setTimeout(function timer() { console.log(j); }, j * 1000);
//  })();
// i++;
// (function () { 
//   var j = i;
//   setTimeout(function timer() { console.log(j); }, j * 1000);
//  })();
// i++;
// (function () { 
//   var j = i;
//   setTimeout(function timer() { console.log(j); }, j * 1000);
//  })();
// i++;
// (function () { 
//   var j = i;
//   setTimeout(function timer() { console.log(j); }, j * 1000);
//  })();
// i++;
// (function () { 
//   var j = i;
//   setTimeout(function timer() { console.log(j); }, j * 1000);
//  })();


// for (var i = 1; i <= 5; i++) {
//   let j = i; // 是的，闭包的块作用域！ 
//   setTimeout(function timer() { console.log(j); }, j * 1000);
// }

// function foo() {
//   console.log(a); // 2
// }
// function bar() { var a = 3; foo(); }
// var a = 2;
// bar();


// var obj = {
//   count: 0,
//   cool: function coolFn() {
//     var self = this;
//     if (self.count < 1) {
//       setTimeout(function() {
//         console.log(this)
//         self.count++;
//         console.log("awesome?");
//       }, 100);
//     }
//   }
// };
// obj.cool(); // 酷吧?


// function foo() { 
//   console.log(this, '111')
//   var a = 2; this.bar();
//  }
// function bar() { 
//   console.log(this, '2222');
//   console.log(this.a); 
// }
// foo();


// var myObject = { a: 2 };
// myObject.a = 3;
// console.log(myObject.a)
// Object.defineProperty(myObject, "a", {
//   value: 4,
//   writable: true,
//   configurable: false, // 不可配置！
//   enumerable: true
// });
// console.log(myObject.a)
// delete myObject.a;
// console.log(myObject.a);

// var myObject = { a: 2 };
// Object.preventExtensions(myObject);
//  myObject.a = 3;
// console.log(myObject)
// // myObject.b;


// function Foo(who) { this.me = who; }
// Foo.prototype.identify = function () { return "I am " + this.me; };
// function Bar(who) { Foo.call(this, who); }
// Bar.prototype = Object.create(Foo.prototype);
// Bar.prototype.speak = function () { console.log("Hello, " + this.identify() + "."); };
// var b1 = new Bar("b1");
// var b2 = new Bar("b2");
// b1.speak();
// b2.speak();


// var a = "foo";
// var b = ["f","o","o"]

// var c = a.concat( "bar" );
// var d = b.concat( ["b","a","r"] );

// console.log(a, c)
// console.log(b, d)

// var obj1 = {
//   name: 'Alice',
//   sex: Symbol('woman'),
//   age: undefined,
//   eat: function() {
//     console.log(111)
//   }
// }

// var obj2 = JSON.parse(JSON.stringify(obj1))
// console.log(obj2)

function swap(array, m, n) {
  const temp = array[m];
  array[m] = array[n]
  array[n] = temp;
}

// 冒泡排序
function bubbleSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1)
      }
    }
  }
}

// 选择排序
function selectionSort(array) {

  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[minIndex] > array[j]) {
        minIndex = j;
      }
    }
    swap(array, i, minIndex)
  }
}

// 插入排序
// 2, 13, 52, 18, 35, 4
// 2, 13, 18, 52, 35, 4
// 2, 13, 18, 52 j-1, 35 j, 4 // c: 35
// 2, 13, 18, 52 j-1, 52 j, 4 
// 2, 13, 18 j-1, 52 j, 52, 4 
function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let j = i;
    let current = array[i];
    while (current < array[j - 1] && j - 1 > -1) {
      array[j] = array[j - 1]
      j--;
    }
    array[j] = current;
  }
}

// 希尔排序
function shellSort(array) {
  // 1.获取数组长度
  const len = array.length;

  // 2.初始化增量
  let gap = Math.floor(len / 2);

  // 3.while循环，gap不断减小至1
  while (gap >= 1) {

    // 4.以gap作为间隙，进行分组，对分组进行插入排序
    for (let i = gap; i < len; i++) {

      let j = i;
      let current = array[i];

      while (current < array[j - gap] && j - gap > -1) {
        array[j] = array[j - gap]
        j -= gap;
      }

      // 5.将j位置元素赋值 current
      array[j] = current;
    }

    // 6.增量变化
    gap = Math.floor(gap / 2);
  }
}

function median(array, left, right) {
  let center = Math.floor((left + right) / 2);
  if (array[left] > array[center]) swap(array, left, center);
  if (array[center] > array[right]) swap(array, right, center);
  if (array[left] > array[right]) swap(array, right, left);

  swap(array, center, right);
  return array[right];
}

// 快速排序
function quickSort(array) {
  const len = array.length;

  quick(0, len - 1);
  function quick(left, right) {
    if (left >= right) return;
    // let pivotIndex = Math.floor((left + right) / 2);
    // swap(array, pivotIndex, right);
    // let pivot = array[right];

    let pivot = median(array, left, right);

    let i = left;
    let j = right - 1;

    while (i <= j) {
      while (array[i] < pivot) { i++ }
      while (array[j] > pivot) { j-- }

      if (i <= j) {
        swap(array, i, j);
      }
    }

    swap(array, i, right);
    quick(left, i - 1)
    quick(i + 1, right);

  }
}

const array = [2, 13, 18, 52, 35, 4];
// bubbleSort(array);
// selectionSort(array);
// insertionSort(array);
// shellSort(array);
quickSort(array);
// console.log(array)

// function change(arr) {
//   return arr.reduce((pre, { key, value }) => {
//     pre[key] = value;
//     return pre
//   }, {})
// }

// let a = change([{ key: 'a', value: '1' }, { key: 'b', value: '2' }])
// console.log(a)

