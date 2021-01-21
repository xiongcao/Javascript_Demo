console.log('************** 简介 *****************')

// 1.类的由来

// JavaScript 语言中，生成实例对象的传统方法是通过构造函数。下面是一个例子。
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);

// ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，
// 新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

// 上面的代码用 ES6 的class改写，就是下面这样。
class Point1 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

// 可以看到里面有一个constructor()方法，这就是构造方法，而this关键字则代表实例对象。
// 定义toString()方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。
// 另外，方法与方法之间不需要逗号分隔，加了会报错。

// ES6 的类，完全可以看作构造函数的另一种写法。

typeof Point1 // "function"
Point1 === Point1.prototype.constructor // true

// 上面代码表明，类的数据类型就是函数，类本身就指向构造函数。

// 使用的时候，也是直接对类使用new命令，跟构造函数的用法完全一致。

var p1 = new Point1(1, 2);

// 事实上，类的所有方法都定义在类的prototype属性上面。
class Point2 {
  constructor() { }

  toString() { }

  toValue() { }
}

// 等同于
Point2.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};

// 因此，在类的实例上面调用方法，其实就是调用原型上的方法。
class B {}
const b = new B();

b.constructor === B.prototype.constructor // true

// 由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。
// Object.assign()方法可以很方便地一次向类添加多个方法。
class Point3 {
  constructor(){
    // ...
  }
}

Object.assign(Point3.prototype, {
  toString(){},
  toValue(){}
});

// prototype对象的constructor()属性，直接指向“类”的本身，这与 ES5 的行为是一致的。

// 另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。
class Point4 {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}

Object.keys(Point4.prototype)
// []
Object.getOwnPropertyNames(Point4.prototype)
// ["constructor","toString"]

// 上面代码中，toString()方法是Point类内部定义的方法，它是不可枚举的。这一点与 ES5 的行为不一致。
var Point5 = function (x, y) {
  // ...
};

Point5.prototype.toString = function () {
  // ...
};

Object.keys(Point5.prototype)
// ["toString"]
Object.getOwnPropertyNames(Point5.prototype)
// ["constructor","toString"]

// 上面代码采用 ES5 的写法，toString()方法就是可枚举的。


// 2.constructor
// constructor()方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。
// 一个类必须有constructor()方法，如果没有显式定义，一个空的constructor()方法会被默认添加。
class Point6 {
}

// 等同于
class Point61 {
  constructor() {}
}

// constructor()方法默认返回实例对象（即this），完全可以指定返回另外一个对象。
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo;
// false

// 上面代码中，constructor()函数返回一个全新的对象，结果导致实例对象不是Foo类的实例。

// 类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。


// 3.类的实例

// 生成类的实例的写法，与 ES5 完全一样，也是使用new命令。
// 如果忘记加上new，像函数那样调用Class，将会报错。

// 与 ES5 一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。
class Point7 {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

var point = new Point7(2, 3);

point.toString() // (2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true

// 与 ES5 一样，类的所有实例共享一个原型对象。
var p1 = new Point7(2,3);
var p2 = new Point7(3,2);

p1.__proto__ === p2.__proto__
//true
// 上面代码中，p1和p2都是Point的实例，它们的原型都是Point.prototype，所以__proto__属性是相等的。

// 这也意味着，可以通过实例的__proto__属性为“类”添加方法。

// __proto__ 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，
// 虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。
// 生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型，然后再来为原型添加方法/属性。
var p1 = new Point7(2,3);
var p2 = new Point7(3,2);

p1.__proto__.printName = function () { return 'Oops' };

p1.printName() // "Oops"
p2.printName() // "Oops"

var p3 = new Point7(4,2);
p3.printName() // "Oops"

// 上面代码在p1的原型上添加了一个printName()方法，由于p1的原型就是p2的原型，因此p2也可以调用这个方法。
// 而且，此后新建的实例p3也可以调用这个方法。
// 这意味着，使用实例的__proto__属性改写原型，必须相当谨慎，不推荐使用，
// 因为这会改变“类”的原始定义，影响到所有实例。


// 4.getter 和 setter

// 与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'

// 存值函数和取值函数是设置在属性的 Descriptor 对象上的。
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }
}

var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html"
);

"get" in descriptor  // true
"set" in descriptor  // true

// 上面代码中，存值函数和取值函数是定义在html属性的描述对象上面，这与 ES5 完全一致。


// 5.属性表达式

// 类的属性名，可以采用表达式。
var methodName = 'getArea';
class Square {
  constructor(length) {  }

  [methodName]() { }
}


// 6.Class 表达式

// 与函数一样，类也可以使用表达式的形式定义。
const MyClass1 = class Me {
  getClassName() {
    return Me.name;
  }
};

// 需要注意的是，这个类的名字是Me，但是Me只在 Class 的内部可用，指代当前类。
// 在 Class 外部，这个类只能用MyClass引用。
var inst1 = new MyClass1();
inst1.getClassName() // Me
// Me.name // ReferenceError: Me is not defined

// 如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式。
const MyClass2 = class { /* ... */ };

// 采用 Class 表达式，可以写出立即执行的 Class。
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"


// 7.注意点

// 7.1 严格模式
// 类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。
// 考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。

// 7.2 不存在提升
// 类不存在变量提升（hoist），这一点与 ES5 完全不同。

// new Foo(); // ReferenceError
// class Foo {}

// 如果存在提升，继承就会出问题

// 7.3 name属性
// 由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。

// class Point {}
// Point.name // "Point"

// 7.4 Generator 方法
// 如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数。
class Foo2 {
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo2('hello', 'world')) {
  console.log(x);
}
// hello
// world


// 7.5 this的指向

// 类的方法内部如果含有this，它默认指向类的实例
// 但是，必须非常小心，一旦单独使用该方法，很可能报错。
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
// const { printName } = logger;
// printName(); // TypeError: Cannot read property 'print' of undefined
// logger.printName()
// 上面代码中，printName方法中的this，默认指向Logger类的实例。
// 但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境
// （由于 class 内部是严格模式，所以 this 实际指向的是undefined），从而导致找不到print方法而报错。

// 一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。
class Logger1 {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  printName(name = 'there') {
    this.print(`Hello1 ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

// 另一种解决方法是使用箭头函数。
class Obj {
  constructor() {
    this.getThis = () => this;
  }
}

const myObj = new Obj();
myObj.getThis() === myObj // true

// 箭头函数内部的this总是指向定义时所在的对象。
// 上面代码中，箭头函数位于构造函数内部，它的定义生效的时候，是在构造函数执行的时候。
// 这时，箭头函数所在的运行环境，肯定是实例对象，所以this会总是指向实例对象。

// 还有一种解决方法是使用Proxy，获取方法的时候，自动绑定this。
function selfish (target) {
  const cache = new WeakMap();
  const handler = {
    get (target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}

const logger1 = selfish(new Logger());




console.log('************** 静态方法 *****************')
// 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。
// 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
class Foo3 {
  static classMethod() {
    return 'hello';
  }
}
Foo3.classMethod() // 'hello'
var foo3 = new Foo3();
// foo3.classMethod() // TypeError: foo3.classMethod is not a function

// 注意，如果静态方法包含this关键字，这个this指的是类，而不是实例。
class Foo4 {
  static bar() {
    this.baz();
  }
  static baz() {
    console.log('hello');
  }
  baz() {
    console.log('world');
  }
}

Foo4.bar() // hello

// 父类的静态方法，可以被子类继承。
class Foo5 {
  static classMethod() {
    return 'hello';
  }
}

class Bar2 extends Foo5 {
}

Bar2.classMethod() // 'hello'

// 静态方法也是可以从super对象上调用的。
class Foo6 {
  static classMethod() {
    return 'hello';
  }
}

class Bar3 extends Foo6 {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar3.classMethod() // "hello, too"



console.log('************** 实例属性的新写法 *****************')

// 实例属性除了定义在constructor()方法里面的this上面，也可以定义在类的最顶层。
class IncreasingCounter {
  constructor() {
    this._count = 0;
  }
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}
// 上面代码中，实例属性this._count定义在constructor()方法里面。
// 另一种写法是，这个属性也可以定义在类的最顶层，其他都不变。
class IncreasingCounter1 {
  _count = 0;
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}

// 实例属性_count与取值函数value()和increment()方法，处于同一个层级。这时，不需要在实例属性前面加上this。
// 这种新写法的好处是，所有实例对象自身的属性都定义在类的头部，
// 看上去比较整齐，一眼就能看出这个类有哪些实例属性。
class Foo7 {
  bar = 'hello';
  baz = 'world';

  constructor() { }
}



console.log('************** 静态属性 *****************')
// 静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。
class Foo8 {
}

Foo8.prop = 1;
Foo8.prop // 1

// 目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。
// 现在有一个提案提供了类的静态属性，写法是在实例属性的前面，加上static关键字。
class MyClass3 {
  static myStaticProp = 42;

  constructor() {
    console.log(MyClass.myStaticProp); // 42
  }
}
// 这个新写法大大方便了静态属性的表达。

// 老写法
class Foo9 { }
Foo.prop = 1;

// 新写法
class Foo10 {
  static prop = 1;
}



console.log('************** 私有方法和私有属性 *****************')

// 1.现有的解决方案
// 私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问。
// 这是常见需求，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现。

// 一种做法是在命名上加以区别。
class Widget {

  // 公有方法
  foo (baz) {
    this._bar(baz);
  }

  // 私有方法
  _bar(baz) {
    return this.snaf = baz;
  }

}

// 另一种方法就是索性将私有方法移出类，因为类内部的所有方法都是对外可见的。
class Widget1 {
  foo (baz) {
    bar.call(this, baz);
  }
}

function bar(baz) {
  return this.snaf = baz;
}

// 上面代码中，foo是公开方法，内部调用了bar.call(this, baz)。这使得bar()实际上成为了当前类的私有方法。

// 还有一种方法是利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值。

const bar3 = Symbol('bar');
const snaf = Symbol('snaf');

class myClass6{

  // 公有方法
  foo(baz) {
    this[bar3](baz);
  }

  // 私有方法
  [bar3](baz) {
    return this[snaf] = baz;
  }
};
// 上面代码中，bar和snaf都是Symbol值，一般情况下无法获取到它们，因此达到了私有方法和私有属性的效果。
// 但是也不是绝对不行，Reflect.ownKeys()依然可以拿到它们。
const inst3 = new myClass6();

Reflect.ownKeys(myClass6.prototype)
// [ 'constructor', 'foo', Symbol(bar) ]


// 2.私有属性的提案
// 目前，有一个提案，为class加了私有属性。方法是在属性名之前，使用#表示
class IncreasingCounter3 {
  #count = 0;
  get value() {
    console.log('Getting the current value!');
    return this.#count;
  }
  increment() {
    this.#count++;
  }
}
// #count就是私有属性，只能在类的内部使用（this.#count）。如果在类的外部使用，就会报错。
const counter3 = new IncreasingCounter3();
// counter3.#count // 报错
// counter3.#count = 42 // 报错

// 之所以要引入一个新的前缀#表示私有属性，而没有采用private关键字，
// 是因为 JavaScript 是一门动态语言，没有类型声明，使用独立的符号似乎是唯一的比较方便可靠的方法，能够准确地区分一种属性是否为私有属性。
// 另外，Ruby 语言使用@表示私有属性，ES6 没有用这个符号而使用#，是因为@已经被留给了 Decorator。

// 这种写法不仅可以写私有属性，还可以用来写私有方法。
class Foo11 {
  #a;
  #b;
  constructor(a, b) {
    this.#a = a;
    this.#b = b;
  }
  #sum() {
    return this.#a + this.#b;
  }
  printSum() {
    console.log(this.#sum());
  }
}

// 另外，私有属性也可以设置 getter 和 setter 方法。
class Counter6 {
  #xValue = 0;

  constructor() {
  }

  get #x() { return 123; }
  set #x(value) {
    this.#xValue = value;
  }
}

// 私有属性不限于从this引用，只要是在类的内部，实例也可以引用私有属性。
class Foo12 {
  #privateValue = 42;
  static getPrivateValue(foo) {
    return foo.#privateValue;
  }
}

Foo12.getPrivateValue(new Foo12()); // 42

// 私有属性和私有方法前面，也可以加上static关键字，表示这是一个静态的私有属性或私有方法。
class FakeMath {
  static PI = 22 / 7;
  static #totallyRandomNumber = 4;

  static #computeRandomNumber() {
    return FakeMath.#totallyRandomNumber;
  }

  static random() {
    console.log('I heard you like random numbers…')
    return FakeMath.#computeRandomNumber();
  }
}

FakeMath.PI // 3.142857142857143
FakeMath.random()
// I heard you like random numbers…
// 4
// FakeMath.#totallyRandomNumber // 报错
// FakeMath.#computeRandomNumber() // 报错



console.log('************** new.target 属性 *****************')

// new是从构造函数生成实例对象的命令。
// ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。
// 如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，
// 因此这个属性可以用来确定构造函数是怎么调用的。
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

var person3 = new Person('张三'); // 正确
// var notAPerson = Person.call(person3, '张三');  // 报错

// Class 内部调用new.target，返回当前 Class。

// 需要注意的是，子类继承父类时，new.target会返回子类。

class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    // ...
  }
}

class Square2 extends Rectangle {
  constructor(length, width) {
    super(length, width);
  }
}

var obj = new Square2(3); // 输出 false


// 利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle2 extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

// var x = new Shape();  // 报错
var y = new Rectangle2(3, 4);  // 正确

// 注意，在函数外部，使用new.target会报错。







