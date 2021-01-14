console.log('******** 属性的简洁表示 ********')

// 1.ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法
// 1.1 属性简写
var foo = 'bar';
var baz = { foo };
baz // {foo: "bar"}

// 等同于
var baz = { foo: foo };

// 1.2 方法简写
var o = {
  method() {
    return "Hello!";
  }
};

// 等同于

var o = {
  method: function () {
    return "Hello!";
  }
};

// 1.3 属性的赋值器（setter）和取值器（getter）
var cart = {
  _wheels: 4,

  get wheels() {
    return this._wheels;
  },

  set wheels(value) {
    if (value < this._wheels) {
      throw new Error('数值太小了！');
    }
    this._wheels = value;
  }
}

// 2.简写的对象方法不能用作构造函数，会报错。
var obj = {
  f() {
    this.foo = 'bar';
  }
};

// new obj.f() // 报错


console.log('******** 属性名表达式 ********')

var ojb = {};
obj['a' + 'bc'] = 123;

var propKey = 'foo';

var obj = {
  [propKey]: true,
  ['a' + 'bc']: 123,
  ['h' + 'ello']() {
    return 'hi';
  }
};

obj.hello() // hi

// 属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]
var keyA = { a: 1 };
var keyB = { b: 2 };

var myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
};

myObject // Object {[object Object]: "valueB"}



console.log('******** 属性名表达式 ********')

// 1.函数的name属性，返回函数名。对象方法也是函数，因此也有name属性。
var person = {
  sayName() {
    console.log('hello!');
  },
};

person.sayName.name   // "sayName"

// 2.如果对象的方法使用了取值函数（getter）和存值函数（setter），则name属性不是在该方法上面
// 而是该方法的属性的描述对象的get和set属性上面，返回值是方法名前加上get和set。
var obj = {
  get foo() { },
  set foo(x) { }
};

// obj.foo.name
// TypeError: Cannot read property 'name' of undefined

var descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');

// descriptor.get.name // "get foo"
// descriptor.set.name // "set foo"

// 3.2 bind方法创造的函数，name属性返回bound加上原函数的名字；
// 3.2 Function构造函数创造的函数，name属性返回anonymous。

(new Function()).name // "anonymous"

var doSomething = function () {
  // ...
};
doSomething.bind().name // "bound doSomething"

// 4.如果对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述。
var key1 = Symbol('description');
var key2 = Symbol();
var obj = {
  [key1]() { },
  [key2]() { },
};
obj[key1].name // "[description]"
obj[key2].name // ""



console.log('******** 属性的 可枚举和遍历 ********')

// 1.对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。
// 1.1 Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。

var obj = { foo: '123' };
Object.getOwnPropertyDescriptor(obj, 'foo', {
  value: 456,
  writable: true,
  enumerable: false
})
//  {
//    value: 123,
//    writable: true,
//    enumerable: true, // 可枚举性
//    configurable: true
//  }

// 1.2 目前，有四个操作会忽略enumerable为false的属性。

// for...in循环：只遍历对象自身的和继承的可枚举的属性。
// Object.keys()：返回对象自身的所有可枚举的属性的键名。
// JSON.stringify()：只串行化对象自身的可枚举的属性。
// Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。

// 1.3 最初目的:
// 1.3.1 让某些属性可以规避掉for...in操作，不然所有内部属性和方法都会被遍历到
// 1.3.2 比如，对象原型的toString方法，以及数组的length属性，就通过“可枚举性”，从而避免被for...in遍历到。

Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable
// false

Object.getOwnPropertyDescriptor([], 'length').enumerable
// false

// 1.3.3 ES6 规定，所有 Class 的原型的方法都是不可枚举的。
Object.getOwnPropertyDescriptor(class { foo() { } }.prototype, 'foo').enumerable
// false

// 2 属性的遍历： ES6 一共有 5 种方法可以遍历对象的属性。

// 2.1 for...in
// for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

// 2.2 Object.keys(obj)
// Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

// 2.3 Object.getOwnPropertyNames(obj)
// 返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

// 2.4 Object.getOwnPropertySymbols(obj)
// 返回一个数组，包含对象自身的所有 Symbol 属性的键名。

// 2.5 Reflect.ownKeys(obj)
// 回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

// 2.6 以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。
// 2.6.1 首先遍历所有数值键，按照数值升序排列。
// 2.6.2 其次遍历所有字符串键，按照加入时间升序排列。
// 2.6.3 最后遍历所有 Symbol 键，按照加入时间升序排列。
Reflect.ownKeys({ [Symbol()]: 0, b: 0, 10: 0, 2: 0, a: 0 })
// ['2', '10', 'b', 'a', Symbol()]



console.log('******** super 关键字 ********')
// 1.1 this关键字总是指向函数所在的当前对象
// 1.2 ES6 的关键字 super，指向当前对象的原型对象
var proto = {
  foo: 'hello'
};

var obj = {
  foo: 'world',
  find() {
    return super.foo; // super.foo引用了原型对象proto的foo属性。
  }
};

Object.setPrototypeOf(obj, proto);
obj.find() // "hello"


// 1.3 super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。
// 目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法。

// 报错
// var obj = {
//   foo: super.foo
// }

// // 报错
// var obj = {
//   foo: () => super.foo
// }

// // 报错
// var obj = {
//   foo: function () {
//     return super.foo
//   }
// }


console.log('******** 对象的 扩展运算符 ********')

// 1.解构赋值

// 1.1 从一个对象取值，相当于将目标对象自身的所有可遍历的属性，分配到指定的对象上面
// 所有的键和它们的值，都会拷贝到新对象上面。
var { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }

// 1.2 解构赋值要求等号右边是一个对象，如果是undefined或null，就会报错，因为它们无法转为对象。

// let { ...z } = null; // 运行时错误
// let { ...z } = undefined; // 运行时错误

// 1.3 解构赋值必须是最后一个参数，否则会报错。
// let { ...x, y, z } = someObject; // 句法错误
// let { x, ...y, ...z } = someObject; // 句法错误


// 1.4 解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、
// 那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。
var obj = { a: { b: 1 } };
var { ...x } = obj;
obj.a.b = 2;
x.a.b // 2

// 1.5 扩展运算符的解构赋值，不能复制 继承自 原型 对象的属性。
var o1 = { a: 1 };
var o2 = { b: 2 };
o2.__proto__ = o1;
var { ...o3 } = o2;
o3 // { b: 2 }
o3.a // undefined


var o = Object.create({ x: 1, y: 2 });
o.z = 3;
var { x, ...newObj } = o;
var { y, z } = newObj;
x // 1 变量x是单纯的解构赋值，所以可以读取对象o继承的属性
y // undefined  变量y和z是扩展运算符的解构赋值，只能读取对象o自身的属性
z; // 3

// 1.6 解构赋值，扩展运算符后面必须是一个变量名，而不能是一个解构赋值表达式
// var { x, ...{ y, z } } = o;
// SyntaxError: ... must be followed by an identifier in declaration contexts


// 2.扩展运算符
// 2.1 对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中
var z = { a: 3, b: 4 };
var n = { ...z };
n // { a: 3, b: 4 }

// 2.2 由于数组是特殊的对象，所以对象的扩展运算符也可以用于数组。
var foo = { ...['a', 'b', 'c'] };
foo;
// {0: "a", 1: "b", 2: "c"}

// 2.3 如果扩展运算符后面是一个空对象，则没有任何效果。
// {...{ }, a: 1 }
// { a: 1 }

// 2.4 如果扩展运算符后面不是对象，则会自动将其转为对象。
// 等同于 {...Object(1)}
// {...1} // {}

// 等同于 {...Object(true)}
// {...true} // {}

// 等同于 {...Object(undefined)}
// {...undefined} // {}

// 等同于 {...Object(null)}
// {...null} // {}

// 2.5 扩展运算符后面是字符串，它会自动转成一个类似数组的对象，因此返回的不是空对象。
// {...'hello'}
// {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}

// 2.6 对象的扩展运算符等同于使用Object.assign()方法。
var a = { foo: 1};
var b = { bar: 1};
var aClone = { ...a };
// 等同于
var aClone = Object.assign({}, a);

// 2.6 扩展运算符可以用于合并两个对象。
var ab = { ...a, ...b };
// 等同于
var ab = Object.assign({}, a, b);


console.log('******** 链判断 运算符 ********')
//  1.ES2020 引入了“链判断运算符”

// 以往的写法
var message = {};
var firstName = (message
  && message.body
  && message.body.user
  && message.body.user.firstName) || 'default';

// ES2020
var firstName = message?.body?.user?.firstName || 'default';
// var fooValue = myForm.querySelector('input[name=foo]')?.value;

// 1.1 判断对象方法是否存在，如果存在就立即执行的例子。
// iterator.return有定义，就调用该方法
// 否则iterator.return直接返回undefined，不再执行?.后面的部分。
// iterator.return?.();

// 1.2 对于那些可能没有实现的方法，这个运算符尤其有用。
// if (myForm.checkValidity?.() === false) {
//   // 表单校验失败
//   return;
// }

// 2.三种用法
// 2.1 obj?.prop // 对象属性
// 2.2 obj?.[expr] // 同上
// 2.3 func?.(...args) // 函数或对象方法的调用


// 3.注意点
// 3.1 短路机制：只要不满足条件，就不再往下执行。(返回undefined)
a?.[++x];
// 等同于
a == null ? undefined : a[++x];

// 3.2 delete 运算符
// 如果a是undefined或null，会直接返回undefined，而不会进行delete运算。
delete a?.b;
// 等同于
a == null ? undefined : delete a.b;

// 3.3 括号的影响
// 如果属性链有圆括号，链判断运算符对圆括号外部没有影响，只对圆括号内部有影响。
// 不管a对象是否存在，圆括号后面的.c总是会执行。
// (a?.b).c;
// 等价于
// (a == null ? undefined : a.b).c;

// 3.4 报错场合
// 构造函数
// new a?.()
// new a?.b()

// 链判断运算符的右侧有模板字符串
// a?.`{b}`
// a?.b`{c}`

// 链判断运算符的左侧是 super
// super?.()
// super?.foo

// 链运算符用于赋值运算符左侧
// a?.b = c

// 3.5 右侧不得为十进制数值
// 为了保证兼容以前的代码，允许foo?.3:0 被解析成 foo ? .3 : 0
// 规定如果?.后面紧跟一个十进制数字，那么?.不再被看成是一个完整的运算符，而会按照三元运算符进行处理



console.log('******** Null 判断运算符 ********')
// 1.常见做法
// 1.1 开发者的原意是，只要属性的值为null或undefined，默认值就会生效
// 1.2 属性的值如果为 空字符串 或 false 或 0，默认值也会生效。
// var headerText = response.settings.headerText || 'Hello, world!';
// var animationDuration = response.settings.animationDuration || 300;
// var showSplashScreen = response.settings.showSplashScreen || true;


// 2.ES2020 引入 Null 判断运算符 ??
// 2.1 行为类似||，但是只有运算符左侧的值为null或undefined
// var headerText = response.settings.headerText ?? 'Hello, world!';
// var animationDuration = response.settings.animationDuration ?? 300;
// var showSplashScreen = response.settings.showSplashScreen ?? true;

// 2.2 目的，就是跟链判断运算符?.配合使用，为null或undefined的值设置默认值。
// var animationDuration = response.settings?.animationDuration ?? 300;

// 2.3 这个运算符很适合判断函数参数是否赋值。
function Component(props) {
  var enable = props.enabled ?? true;
  // 等同于
  var {
    enabled: enable = true,
  } = props;
}


// 3.优先级
// ?? 与&&和||的优先级孰高孰低
// 规则是，如果多个逻辑运算符一起使用，必须用括号表明优先级，否则会报错。

// 报错
// lhs && middle ?? rhs
// lhs ?? middle && rhs
// lhs || middle ?? rhs
// lhs ?? middle || rhs

// 不报错
// (lhs && middle) ?? rhs;
// lhs && (middle ?? rhs);

// (lhs ?? middle) && rhs;
// lhs ?? (middle && rhs);

// (lhs || middle) ?? rhs;
// lhs || (middle ?? rhs);

// (lhs ?? middle) || rhs;
// lhs ?? (middle || rhs);



