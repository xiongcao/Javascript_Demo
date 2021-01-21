console.log('********* 简介 ***********')

// Class 可以通过extends关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。
class Point {
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}

// 通过extends关键字，继承了Point类的所有属性和方法。
// super关键字，表示父类的构造函数，用来新建父类的this对象。

// 子类必须在 constructor 方法中调用super方法，否则新建实例时会报错。
// 这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，
// 然后再对其进行加工，加上子类自己的实例属性和方法。
// 如果不调用super方法，子类就得不到this对象。

// ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
// ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），
// 然后再用子类的构造函数修改this。

// 如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。

class ColorPoint1 extends Point {}
// 等同于
class ColorPoint2 extends Point {
  constructor(...args) {
    super(...args);
  }
}

// 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。
// 这是因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例。

// 父类的静态方法，也会被子类继承。
class A {
  static hello() {
    console.log('hello world');
  }
}

class B extends A {}

B.hello()  // hello world



console.log('********* Object.getPrototypeOf ***********')

// Object.getPrototypeOf方法可以用来从子类上获取父类

Object.getPrototypeOf(ColorPoint) === Point
// true

// 因此，可以使用这个方法判断，一个类是否继承了另一个类。




console.log('********* super 关键字 ***********')

/**
 * 总结
 * 1.super这个关键字，既可以当作函数使用，也可以当作对象使用。
 * 2.super作为函数调用时，代表父类的构造函数。
 *  - 2.1 super 内部的this指的是 子类 的实例
 * 3.super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
 */

// super这个关键字，既可以当作函数使用，也可以当作对象使用。

// 在这两种情况下，它的用法完全不同。

// 第一种情况，super作为函数调用时，代表父类的构造函数。
// ES6 要求，子类的构造函数必须执行一次super函数。
class A1 {}

class B1 extends A1 {
  constructor() {
    super();
  }
}
// super 虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B的实例，
// 因此 super() 在这里相当于 A.prototype.constructor.call(this)。

class A2 {
  constructor() {
    console.log(new.target.name);
  }
}
class B2 extends A2 {
  constructor() {
    super();
  }
}
new A2() // A2
new B2() // B2
// 上面代码中，new.target指向当前正在执行的函数。
// 可以看到，在super()执行时，它指向的是子类B的构造函数，而不是父类A的构造函数。
// 也就是说，super()内部的this指向的是B。

// 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。
// class A {}

// class B extends A {
//   m() {
//     super(); // 报错
//   }
// }

// 第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
class A3 {
  p() {
    return 2;
  }
}

class B3 extends A3 {
  constructor() {
    super();
    console.log(super.p()); // 2
  }
}

let b = new B3();

// 由于 super 指向父类的"原型对象"，所以定义在父类实例上的方法或属性，是无法通过super调用的。
class A4 {
  constructor() {
    this.p = 2;
  }
}

class B4 extends A4 {
  get m() {
    return super.p;
  }
}

let b4 = new B4();
b4.m // undefined

// 如果属性定义在父类的原型对象上，super就可以取到。
class A5 {}
A5.prototype.x = 2;

class B5 extends A5 {
  constructor() {
    super();
    console.log(super.x) // 2
  }
}
let b5 = new B5();

// ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。
class A6 {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x, 'print'); // this指向当前的子类实例
  }
}

class B7 extends A6 {
  constructor() {
    super();
    this.x = 2;
  }

  m() {
    // super.print();
    // => 等同于
    this.print()
    console.log(super.valueOf() === this, this); // true
  }
}

let b7 = new B7();
b7.m() // 2

// 由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。
class A8 {
  constructor() {
    this.x = 1;
  }
}

class B8 extends A8 {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;
    console.log(super.x); // undefined
    console.log(this.x); // 3
  }
}

new B8();

// 如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象。

class Parent {
  static myMethod(msg) {
    console.log('static', msg);
  }

  myMethod(msg) {
    console.log('instance', msg);
  }
}

class Child extends Parent {
  // 静态方法中，super指向父类
  static myMethod(msg) {
    super.myMethod(msg);
  }
  // 普通方法中，super指向父类的原型
  myMethod(msg) {
    super.myMethod(msg);
  }
}

Child.myMethod(1); // static 1

var child = new Child();
child.myMethod(2); // instance 2

// 上面代码中，super在静态方法之中指向父类，在普通方法之中指向父类的原型对象。

// 在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例。
class A9 {
  constructor() {
    this.x = 1;
  }
  static print() {
    console.log(this.x); // this指向当前的子类
  }
}

class B9 extends A9 {
  constructor() {
    super();
    this.x = 2;
  }
  static m() {
    super.print();
  }
}

B9.x = 3;
B9.m() // 3

// 注意，使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。

// 最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。
var obj = {
  toString() {
    return "MyObject: " + super.toString();
  }
};

obj.toString(); // MyObject: [object Object]



console.log('****** 类的 prototype 属性和 __proto__ 属性 ******');

// 大多数浏览器的 ES5 实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。
// Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。

//（1）子类的__proto__属性，表示构造函数的继承，总是指向父类。
//（2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
class D {
}

class F extends D {
}

F.__proto__ === D // true
F.prototype.__proto__ === D.prototype // true

// 这样的结果是因为，类的继承是按照下面的模式实现的
class D1 {
}

class F1 {
}

// F1 的实例继承 D1 的实例
Object.setPrototypeOf(F1.prototype, D1.prototype);

// F1 继承 D1 的静态属性
Object.setPrototypeOf(F1, D1);

const f1 = new F1();


// 这两条继承链，可以这样理解：
// 作为一个对象，子类（B）的原型（__proto__属性）是父类（A）；
// 作为一个构造函数，子类（B）的原型对象（prototype属性）是父类的原型对象（prototype属性）的实例。

F1.prototype = Object.create(D1.prototype);
// 等同于
F1.prototype.__proto__ = D1.prototype;

// 下面，讨论两种情况。
// 第一种，子类继承Object类。
class D2 extends Object {
}

D2.__proto__ === Object // true
D2.prototype.__proto__ === Object.prototype // true
// 这种情况下，D2其实就是构造函数Object的复制，D2的实例就是Object的实例。

// 第二种情况，不存在任何继承。
class D3 {
}

D3.__proto__ === Function.prototype // true
D3.prototype.__proto__ === Object.prototype // true

// D3作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承Function.prototype。
// 但是，A调用后返回一个空对象（即Object实例），所以A.prototype.__proto__指向构造函数（Object）的prototype属性。

// 2.实例的 __proto__ 属性

// 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。
// 也就是说，子类的原型的原型，是父类的原型。

// 因此，通过子类实例的__proto__.__proto__属性，可以修改父类实例的行为。
// p2.__proto__.__proto__.printName = function () {
//   console.log('Ha');
// };

// p1.printName() // "Ha"



console.log('******** 原生构造函数的继承 **********');

// 原生构造函数是指语言内置的构造函数，通常用来生成数据结构。
// ECMAScript 的原生构造函数大致有下面这些：
Boolean()
Number()
String()
Array()
Date()
Function()
RegExp()
Error()
Object()

// 以前，这些原生构造函数是无法继承的，比如，不能自己定义一个Array的子类。
function MyArray() {
  Array.apply(this, arguments);
}

MyArray.prototype = Object.create(Array.prototype, {
  constructor: {
    value: MyArray,
    writable: true,
    configurable: true,
    enumerable: true
  }
});

// 上面代码定义了一个继承 Array 的MyArray类。但是，这个类的行为与Array完全不一致。

var colors = new MyArray();
colors[0] = "red";
colors.length  // 0

colors.length = 0;
colors[0]  // "red"

// 之所以会发生这种情况，是因为子类无法获得原生构造函数的内部属性，通过Array.apply()或者分配给原型对象都不行。
// 原生构造函数会忽略apply方法传入的this，也就是说，原生构造函数的this无法绑定，导致拿不到内部属性。

// ES5 是先新建子类的实例对象this，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。
// 比如，Array构造函数有一个内部属性[[DefineOwnProperty]]，用来定义新属性时，更新length属性，
// 这个内部属性无法在子类获取，导致子类的length属性行为不正常。

// 下面的例子中，我们想让一个普通对象继承Error对象。
var e = {};
Object.getOwnPropertyNames(Error.call(e))
// [ 'stack' ]

Object.getOwnPropertyNames(e)
// []

// 上面代码中，我们想通过Error.call(e)这种写法，让普通对象e具有Error对象的实例属性。
// 但是，Error.call()完全忽略传入的第一个参数，而是返回一个新对象，e本身没有任何变化。
// 这证明了Error.call(e)这种写法，无法继承原生构造函数。

// ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承。

// 下面是一个继承Array的例子。
class MyArray2 extends Array {
  constructor(...args) {
    super(...args);
  }
}

var arr = new MyArray2();
arr[0] = 12;
arr.length // 1

arr.length = 0;
arr[0] // undefined

// 上面代码定义了一个MyArray类，继承了Array构造函数，因此就可以从MyArray生成数组的实例。
// 这意味着，ES6 可以自定义原生数据结构（比如Array、String等）的子类，这是 ES5 无法做到的。

// 上面这个例子也说明，extends关键字不仅可以用来继承类，还可以用来继承原生的构造函数。
// 因此可以在原生数据结构的基础上，定义自己的数据结构。下面就是定义了一个带版本功能的数组。

class VersionedArray extends Array {
  constructor() {
    super();
    this.history = [[]];
  }
  commit() {
    this.history.push(this.slice());
  }
  revert() {
    this.splice(0, this.length, ...this.history[this.history.length - 1]);
  }
}

var x = new VersionedArray();

x.push(1);
x.push(2);
x // [1, 2]
x.history // [[]]

x.commit();
x.history // [[], [1, 2]]

x.push(3);
x // [1, 2, 3]
x.history // [[], [1, 2]]

x.revert();
x // [1, 2]


// 下面是一个自定义Error子类的例子，可以用来定制报错时的行为。
class ExtendableError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.stack = (new Error()).stack;
    this.name = this.constructor.name;
  }
}

class MyError extends ExtendableError {
  constructor(m) {
    super(m);
  }
}

var myerror = new MyError('ll');
myerror.message // "ll"
myerror instanceof Error // true
myerror.name // "MyError"
// myerror.stack
// Error
//     at MyError.ExtendableError
//     ...

// 注意，继承Object的子类，有一个行为差异。
class NewObj extends Object{
  constructor(){
    super(...arguments);
  }
}
var o = new NewObj({attr: true});
o.attr === true  // false

// 上面代码中，NewObj继承了Object，但是无法通过super方法向父类Object传参。
// 这是因为 ES6 改变了Object构造函数的行为，一旦发现Object方法不是通过new Object()这种形式调用，
// ES6 规定Object构造函数会忽略参数。



console.log('******** Mixin 模式的实现 *******');

// Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。它的最简单实现如下。
const g = {
  g: 'g'
};
const h = {
  h: 'h'
};
const c = {...g, ...h}; // {g: 'g', h: 'h'}

// 上面代码中，c对象是a对象和b对象的合成，具有两者的接口。

// 下面是一个更完备的实现，将多个类的接口“混入”（mix in）另一个类。
function mix(...mixins) {
  class Mix {
    constructor() {
      for (let mixin of mixins) {
        copyProperties(this, new mixin()); // 拷贝实例属性
      }
    }
  }

  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== 'constructor'
      && key !== 'prototype'
      && key !== 'name'
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}

// 上面代码的mix函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。
class DistributedEdit extends mix(Loggable, Serializable) {
  // ...
}


