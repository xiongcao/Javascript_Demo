console.log('*********** 概述 ***********')
// 1.Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，
// 所以属于一种“元编程”（meta programming），即对编程语言进行编程。

// Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，
// 都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写


// 1.1 ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。

// var proxy = new Proxy(target, handler);

var proxy = new Proxy({}, {
  get: function (target, propKey) {
    return 35;
  }
});

proxy.time // 35
proxy.name // 35
proxy.title // 35

// 1.2 要使得Proxy起作用，必须针对Proxy实例（上例是proxy对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。

// 1.3 如果handler没有设置任何拦截，那就等同于直接通向原对象。
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"

// 1.4 Proxy 实例也可以作为其他对象的原型对象。
var proxy = new Proxy({}, {
  get: function (target, propKey) {
    return 35;
  }
});

var obj = Object.create(proxy);
obj.time // 35


// 1.5 同一个拦截器函数，可以设置拦截多个操作。
var handler = {
  get: function (target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  // 拦截 Proxy 实例作为函数调用的操作
  apply: function (target, thisBinding, args) {
    return args[0];
  },

  // 拦截 Proxy 实例作为构造函数调用的操作
  construct: function (target, args) {
    return { value: args[1] };
  }
};

var fproxy = new Proxy(function (x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo === "Hello, foo" // true

// 1.6  Proxy 支持的拦截操作一览，一共 13 种。
// get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。

// set(target, propKey, value, receiver)：拦截对象属性的设置

// has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。

// deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。

// ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、
// Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。
// 该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。

// getOwnPropertyDescriptor(target, propKey)：
// 拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。

// preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。

// getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。

// isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。

// setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，
// 返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。

// apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，
// 比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。

// construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。



console.log('************ Proxy 实例方法 ************');

// 1. get(target, propKey [, receiver])：用于拦截某个属性的读取操作
// 接受三个参数，依次为目标对象、属性名和 proxy 实例本身

var person = {
  name: "张三"
};
var proxy = new Proxy(person, {
  get: function (target, propKey) {
    if (propKey in target) {
      return target[propKey];
    } else {
      throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
    }
  }
});
proxy.name // "张三"
// proxy.age // 抛出一个错误

// 1.1 get方法可以继承。
var proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log('GET ' + propertyKey);
    return target[propertyKey];
  }
});
var obj = Object.create(proto);
obj.foo // "GET foo"

// 例子1：使用get拦截，实现数组读取负数的索引。
function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey);
      if (index < 0) {
        propKey = String(target.length + index);
      }
      return Reflect.get(target, propKey, receiver);
    }
  };

  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}

var arr = createArray('a', 'b', 'c');
arr[-1] // c

// 例子2：将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作。
var pipe = function (value) {
  var funcStack = [];
  var oproxy = new Proxy({}, {
    get: function (pipeObject, fnName) {
      if (fnName === 'get') {
        return funcStack.reduce(function (val, fn) {
          return fn(val);
        }, value);
      }
      funcStack.push(window[fnName]);
      return oproxy;
    }
  });

  return oproxy;
}

var double = n => n * 2;
var pow = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;

pipe(3).double.pow.reverseInt.get; // 63

// 例子3：
var proxy = new Proxy({}, {
  get: function (target, key, receiver) {
    return receiver;
  }
});
proxy.getReceiver === proxy // true

// 1.2 如果一个属性不可配置（configurable）且不可写（writable），
// 则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。
var target = Object.defineProperties({}, {
  foo: {
    value: 123,
    writable: false,
    configurable: false
  },
});

var handler = {
  get(target, propKey) {
    return 'abc';
  }
};

var proxy = new Proxy(target, handler);

// proxy.foo
// TypeError: Invariant check failed

// 2.set(): 拦截某个属性的赋值操作
// 接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选
// set(target, propKey, value, receiver)
var validator = {
  set: function (obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 对于满足条件的 age 属性以及其他属性，直接保存
    obj[prop] = value;
  }
};

var person = new Proxy({}, validator);

person.age = 100;

person.age // 100
// person.age = 'young' // 报错
// person.age = 300 // 报错

// 防止内部属性被外部读写
var handler = {
  get(target, key) {
    invariant(key, 'get');
    return target[key];
  },
  set(target, key, value) {
    invariant(key, 'set');
    target[key] = value;
    return true;
  }
};
function invariant(key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}
var target = {};
var proxy = new Proxy(target, handler);
// proxy._prop
// Error: Invalid attempt to get private "_prop" property
// proxy._prop = 'c'
// Error: Invalid attempt to set private "_prop" property



var handler = {
  set: function (obj, prop, value, receiver) {
    obj[prop] = receiver;
  }
};

var proxy = new Proxy({}, handler);

var myObj = {};
Object.setPrototypeOf(myObj, proxy);
myObj.foo = 'bar';
myObj.foo === myObj // true


// 2.1 如果目标对象自身的某个属性，不可写且不可配置，那么set方法将不起作用。
var obj = {};
Object.defineProperty(obj, 'foo', {
  value: 'bar',
  writable: false,
});

var handler = {
  set: function (obj, prop, value, receiver) {
    obj[prop] = 'baz';
  }
};

var proxy = new Proxy(obj, handler);
proxy.foo = 'baz';
proxy.foo // "bar"


// 3.apply(target, ctx, args)：拦截函数的调用、call和apply操作。
// 接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。

// 例子1：
var target = function () { return 'I am the target'; };
var handler = {
  apply: function () {
    return 'I am the proxy';
  }
};

var p = new Proxy(target, handler);

p()
// "I am the proxy"

// 例子2：
var twice = {
  apply(target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  }
};
function sum(left, right) {
  return left + right;
};
var proxy = new Proxy(sum, twice);
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30

// 3.has(target, key): 
// 拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。
// 接受两个参数，分别是目标对象、需查询的属性名。

var handler = {
  has(target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in proxy // false

// 如果原对象不可配置或者禁止扩展，这时has()拦截会报错。
// var obj = { a: 10 };
// Object.preventExtensions(obj); // obj对象禁止扩展

// var p = new Proxy(obj, {
//   has: function(target, prop) {
//     return false;
//   }
// });

// 'a' in p // TypeError is thrown

// has()方法拦截的是HasProperty操作，而不是HasOwnProperty操作，
// 即has()方法不判断一个属性是对象自身的属性，还是继承的属性。


// 虽然for...in循环也用到了in运算符，但是has()拦截对for...in循环不生效。
var stu1 = { name: '张三', score: 59 };
var stu2 = { name: '李四', score: 99 };

var handler = {
  has(target, prop) {
    if (prop === 'score' && target[prop] < 60) {
      console.log(`${target.name} 不及格`);
      return false;
    }
    return prop in target;
  }
}

var oproxy1 = new Proxy(stu1, handler);
var oproxy2 = new Proxy(stu2, handler);

'score' in oproxy1;
// 张三 不及格
// false

'score' in oproxy2;
// true

for (let a in oproxy1) {
  console.log(oproxy1[a]);
}
// 张三
// 59

for (let b in oproxy2) {
  console.log(oproxy2[b]);
}
// 李四
// 99


// 4.contruct(target、args、newTarget): 拦截new命令
// 接受三个参数：目标对象、构造函数的参数数组、创造实例对象时，new命令作用的构造函数
var p = new Proxy(function () { }, {
  construct: function (target, args) {
    console.log('called: ' + args.join(', '));
    return { value: args[0] * 10 };
  }
});

(new p(1)).value;
// "called: 1"
// 10

// 4.1 construct()方法返回的必须是一个对象，否则会报错。
var p = new Proxy(function () { }, {
  construct: function (target, argumentsList) {
    return 1;
  }
});

// new p() // 报错
// Uncaught TypeError: 'construct' on proxy: trap returned non-object ('1')

// 4.2 由于construct()拦截的是构造函数，所以它的目标对象必须是函数，否则就会报错。(new Proxy()的第一个参数)
var p = new Proxy({}, {
  construct: function (target, argumentsList) {
    return {};
  }
});

// new p() // 报错
// Uncaught TypeError: p is not a constructor

// 4.3 construct()方法中的this指向的是handler，而不是实例对象。
var handler = {
  construct: function (target, args) {
    console.log(this === handler);
    return new target(...args);
  }
}

var p = new Proxy(function () {
  console.log(...arguments);
}, handler);
new p(1, 3, 4) // true

// 5.deleteProperty()
// 拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。
var handler = {
  deleteProperty (target, key) {
    invariant(key, 'delete');
    delete target[key];
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}

var target = { _prop: 'foo' };
var proxy = new Proxy(target, handler);
// delete proxy._prop
// Error: Invalid attempt to delete private "_prop" property

// 5.1 目标对象自身的不可配置（configurable）的属性，不能被deleteProperty方法删除，否则报错。
var handler = {
  deleteProperty (target, key) {
    delete target[key];
    return true;
  }
};

var source = {}
Object.defineProperties(source, {
  prop: {
    value: 'foo',
    configurable: false
  }
})

// var target = source; //自身的不可配置，报错
var target = Object.create(source); // 继承而来的，不报错，但无法删除
var proxy = new Proxy(target, handler);

proxy.prop
delete proxy.prop
proxy.prop

// 6.defineProperty(): 拦截了Object.defineProperty()操作。
var handler = {
  defineProperty (target, key, descriptor) {
    return false; // 只是用来提示操作失败，本身并不能阻止添加新属性。
  }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar' // 不会生效

// 如果目标对象不可扩展（non-extensible），则defineProperty()不能增加目标对象上不存在的属性，否则会报错。
// 如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty()方法不得改变这两个设置。

// 7.getOwnPropertyDescriptor()
// 拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined。
var handler = {
  getOwnPropertyDescriptor (target, key) {
    if (key[0] === '_') {
      return;
    }
    return Object.getOwnPropertyDescriptor(target, key);
  }
};
var target = { _foo: 'bar', baz: 'tar' };
var proxy = new Proxy(target, handler);
Object.getOwnPropertyDescriptor(proxy, 'wat')
// undefined
Object.getOwnPropertyDescriptor(proxy, '_foo')
// undefined
Object.getOwnPropertyDescriptor(proxy, 'baz')
// { value: 'tar', writable: true, enumerable: true, configurable: true }


// 8.getPrototypeOf(): 拦截获取对象原型

// 拦截下面这些操作。
// Object.prototype.__proto__
// Object.prototype.isPrototypeOf()
// Object.getPrototypeOf()
// Reflect.getPrototypeOf()
// instanceof

var proto = {};
var p = new Proxy({}, {
  getPrototypeOf(target) {
    return proto;
  }
});
Object.getPrototypeOf(p) === proto // true

// 8.1 getPrototypeOf()方法的返回值必须是对象或者null，否则报错
// 如果目标对象不可扩展（non-extensible）， getPrototypeOf()方法必须返回目标对象的原型对象。

// 9.isExtensible()
// 拦截Object.isExtensible()操作。
var p = new Proxy({}, {
  isExtensible: function(target) {
    console.log("called");
    return true;
  }
});

Object.isExtensible(p)
// "called"
// true

// 9.1 该方法只能返回布尔值，否则返回值会被自动转为布尔值。

// 9.2 这个方法有一个强限制，它的返回值必须与目标对象的isExtensible属性保持一致，否则就会抛出错误。
Object.isExtensible(proxy) === Object.isExtensible(target)


// 10.setPrototypeOf()
// 拦截Object.setPrototypeOf()方法。
var handler = {
  setPrototypeOf (target, proto) {
    // throw new Error('Changing the prototype is forbidden');
  }
};
var proto = {};
var target = function () {};
var proxy = new Proxy(target, handler);
// Object.setPrototypeOf(proxy, proto);



console.log('*********** Proxy.revocable() ***********');
// Proxy.revocable()方法返回一个可取消的 Proxy 实例。
var target = {};
var handler = {};

var {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke();
// proxy.foo // TypeError: Revoked

// Proxy.revocable()的一个使用场景是：
// 目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。



console.log('*********** this 问题 ***********');
// 虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，
// 即不做任何拦截的情况下，也无法保证与目标对象的行为一致。
// 主要原因就是在 Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理。

var target = {
  m: function () {
    console.log(this === proxy);
  }
};
var handler = {};

var proxy = new Proxy(target, handler);

target.m() // false
proxy.m()  // true

// 下面是一个例子，由于this指向的变化，导致 Proxy 无法代理目标对象。
var _name = new WeakMap();

class Person {
  constructor(name) {
  }
  get name() {
    return _name.get(this);
  }
}

var jane = new Person('Jane');
jane.name // 'Jane'

var proxy = new Proxy(jane, {});
proxy.name // undefined

// 此外，有些原生对象的内部属性，只有通过正确的this才能拿到，所以 Proxy 也无法代理这些原生对象的属性。
var target = new Date();
var proxy = new Proxy(target, {});

// proxy.getDate();
// TypeError: this is not a Date object.
// getDate()方法只能在Date对象实例上面拿到，如果this不是Date对象实例就会报错


// this绑定原始对象，就可以解决这个问题。
var target = new Date('2015-01-01');
var handler = {
  get(target, prop) {
    if (prop === 'getDate') {
      return target.getDate.bind(target);
    }
    return Reflect.get(target, prop);
  }
};
var proxy = new Proxy(target, handler);

proxy.getDate() // 1


// Proxy 拦截函数内部的this，指向的是handler对象。
var handler = {
  get: function (target, key, receiver) {
    console.log(this === handler);
    return 'Hello, ' + key;
  },
  set: function (target, key, value) {
    console.log(this === handler);
    target[key] = value;
    return true;
  }
};

var proxy = new Proxy({}, handler);

proxy.foo
// true
// Hello, foo

proxy.foo = 1
// true



console.log('*********** 实例： Web服务的客户端 ***********');

// Proxy 对象可以拦截目标对象的任意属性，这使得它很合适用来写 Web 服务的客户端。
// const service = createWebService('http://example.com/data');

// service.employees().then(json => {
//   const employees = JSON.parse(json);
//   // ···
// });

// function createWebService(baseUrl) {
//   return new Proxy({}, {
//     get(target, propKey, receiver) {
//       return () => httpGet(baseUrl + '/' + propKey);
//     }
//   });
// }


