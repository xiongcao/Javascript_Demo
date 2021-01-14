console.log('********** Object.is() *********')

// 1.相等比较

// 1.1 ES5 比较值是否相等，只有两个运算符：相等运算符（==）和严格相等运算符（===）
// 1.1.1 缺点：
// ①前者会自动转换数据类型；
// ②后者的NaN不等于自身，以及+0等于-0


// 1.2 ES6 的 Object.is就是部署 “Same-value equality”（同值相等）算法

Object.is('foo', 'foo');
// true
Object.is({}, {});

// false
+0 === -0; //true
NaN === NaN;// false

Object.is(+0, -0); // false
Object.is(NaN, NaN); // true


// 2 ES5 可以通过下面的代码，部署Object.is。
Object.defineProperty(Object, 'is', {
  value: function (x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});



console.log('********** Object.assign() *********')

// 1.基本用法

// 1.1 对象合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）
var target = { a: 1 };
var source1 = { b: 2 };
var source2 = { c: 3 };
Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}

// 1.2 同名属性，后面的属性会覆盖前面的属性。
var target = { a: 1, b: 1 };
var source1 = { b: 2, c: 2 };
var source2 = { c: 3 };
Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}

// 1.3 只有一个参数，Object.assign()会直接返回该参数。
var obj = { a: 1 };
Object.assign(obj) === obj; // true

// 1.4 如果该参数不是对象，则会先转成对象，然后返回。
typeof Object.assign(2); // "object"

// 1.5 由于undefined和null无法转成对象，所以如果它们作为参数，就会报错
// Object.assign(undefined); // 报错
// Object.assign(null); // 报错

// 1.6 非对象参数出现在源对象的位置：这些参数都会转成对象，如果无法转成对象，就会跳过
// undefined和null不在首参数，就不会报错。
var obj = { a: 1 };
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true

// 1.7 数值、字符串和布尔值，不在首参数，也不会报错
// 除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。
var v1 = 'abc';
var v2 = true;
var v3 = 10;
var obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }

// 只有字符串的包装对象，会产生可枚举属性。
Object(true) // {[[PrimitiveValue]]: true}
Object(10)  //  {[[PrimitiveValue]]: 10}
Object('abc') // {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}

// 1.8 ，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。
Object.assign({ b: 'c' },
  Object.defineProperty({}, 'invisible', {
    enumerable: false,
    value: 'hello'
  })
)
// { b: 'c' }

// 1.9 属性名为 Symbol 值的属性，也会被Object.assign()拷贝。
Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })
// { a: 'b', Symbol(c): 'd' }


// 2.注意点
// 2.1 浅拷贝
var obj1 = { a: { b: 1 } };
var obj2 = Object.assign({}, obj1);

obj1.a.b = 2;
obj2.a.b // 2

// 2.2 同名属性的替换
var target = { a: { b: 'c', d: 'e' } }
var source = { a: { b: 'hello' } }
Object.assign(target, source)
// { a: { b: 'hello' } }

// 2.3 数组的处理：可以用来处理数组，但是会把数组视为对象。
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]

// 2.4 取值函数的处理
// Object.assign()只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。
var source = {
  get foo() { return 1 }
};
var target = {};

Object.assign(target, source)
// { foo: 1 }

// 3.常见用途
// 3.1 为对象添加属性
class Point {
  constructor(x, y) {
    Object.assign(this, { x, y }); // 将x属性和y属性添加到Point类的对象实例
  }
}

// 3.2 为对象添加方法
Object.assign(Point.prototype, {
  someMethod(arg1, arg2) {
  },
  anotherMethod() {
  }
});

// 等同于下面的写法
Point.prototype.someMethod = function (arg1, arg2) { };
Point.prototype.anotherMethod = function () { };

// 3.3 克隆对象
// 采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值
function clone(origin) {
  return Object.assign({}, origin);
}

// 如果想要保持继承链，可以采用下面的代码。
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}

// 3.4 合并多个对象
// var merge = Object.assign(target, ...sources);
// var merge = Object.assign({}, ...sources);

// 3.5 为属性指定默认值
var DEFAULTS = {
  logLevel: 0,
  outputFormat: 'html'
};

function processContent(options) {
  options = Object.assign({}, DEFAULTS, options);
  console.log(options);
  // ...
}



console.log('****** Object.getOwnPropertyDescriptor() ******')
// 1.ES5 的Object.getOwnPropertyDescriptor()方法会返回某个对象属性的描述对象

var obj = {
  foo: 123,
  get bar() { return 'abc' }
}
Object.getOwnPropertyDescriptor(obj, 'foo')
// {
//   configurable: true
//   enumerable: true
//   value: 123
//   writable: true
// }

// 2.ES2017 getOwnPropertyDescriptors()方法，返回指定对象所有自身属性（非继承属性）的描述对象
Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }

// 2.引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。
// 2.1Object.assign方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法
var source = {
  set foo(value) {
    console.log(value);
  }
};

var target1 = {};
Object.assign(target1, source);

Object.getOwnPropertyDescriptor(target1, 'foo');
// { value: undefined,
//   writable: true,
//   enumerable: true,
//   configurable: true }

// 2.2 getOwnPropertyDescriptors() 配合 defineProperties()，就可以实现正确拷贝。
var source = {
  set foo(value) {
    console.log(value);
  }
};

var target2 = {};
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
Object.getOwnPropertyDescriptor(target2, 'foo');
// { get: undefined,
//   set: [Function: set foo],
//   enumerable: true,
//   configurable: true }


// 3.另一个用处，配合Object.create()方法，将对象属性克隆到一个新对象。这属于浅拷贝
var clone = Object.create(Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj));

// 或者
var shallowClone = (obj) => Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
);

// 4.对象继承另一个对象

var prot = {};

// 4.1 ES5 
var obj = {
  __proto__: prot,
  foo: 123,
};

// 4.2 ES6
var obj = Object.create(prot);
obj.foo = 123;

// 或者
var obj = Object.assign(
  Object.create(prot),
  {
    foo: 123,
  }
);

// 或者
var obj = Object.create(
  prot,
  Object.getOwnPropertyDescriptors({
    foo: 123,
  })
);



console.log('****** __proto__, Object.setPrototypeOf(), Object.getPrototype() ******')

// 1.__proto__: 用来读取或设置当前对象的原型对象
// 1.1 只有浏览器必须部署这个属性，其他运行环境不一定需要部署
// 1.2 无论从语义的角度，还是从兼容性的角度，都不要使用这个属性
// 1.3 而是使用下面的Object.setPrototypeOf()（写操作）、
// Object.getPrototypeOf()（读操作）、
// Object.create()（生成操作）代替

// 实现上，__proto__调用的是Object.prototype.__proto__

// 1.4 如果一个对象本身部署了__proto__属性，该属性的值就是对象的原型。
Object.getPrototypeOf({ __proto__: null })
// null


// 2.Object.setPrototypeOf()，用来设置一个对象的原型对象，返回参数对象本身。是 ES6 正式推荐的设置原型对象的方法。
// 格式
// Object.setPrototypeOf(object, prototype)

// 用法
var o = Object.setPrototypeOf({ a: 1, b: 2 }, null);
// { a: 1, b: 2 } 原型为null


var proto = {};
var obj = { x: 10 };
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 40;

obj.x; // 10
obj.y; // 20
obj.z; // 40


// 2.1 如果第一个参数不是对象，会自动转为对象
Object.setPrototypeOf(1, {}) === 1; // true
Object.setPrototypeOf('foo', {}) === 'foo'; // true
Object.setPrototypeOf(true, {}) === true; // true

// Object.setPrototypeOf(undefined, {})
// TypeError: Object.setPrototypeOf called on null or undefined

// Object.setPrototypeOf(null, {})
// TypeError: Object.setPrototypeOf called on null or undefined


// 3.Object.getPrototypeOf()，用于读取一个对象的原型对象。
// Object.getPrototypeOf(obj);

function Rectangle() {
  // ...
}
var rec = new Rectangle();
Object.getPrototypeOf(rec) === Rectangle.prototype
// true
Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype
// false

// 3.1 如果参数不是对象，会被自动转为对象。
Object.getPrototypeOf(1) === Number.prototype // true
Object.getPrototypeOf('foo') === String.prototype // true
Object.getPrototypeOf(true) === Boolean.prototype // true

// 3.2 如果参数是undefined或null，它们无法转为对象，所以会报错。
// Object.getPrototypeOf(null)
// TypeError: Cannot convert undefined or null to object

// Object.getPrototypeOf(undefined)
// TypeError: Cannot convert undefined or null to object



console.log('****** Object.keys(), Object.values(), Object.entries() ******')
// 1. ES5 Object.keys()
// 1.1 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// ["foo", "baz"]

var { keys, values, entries } = Object;
var obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}

for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}

// 2. Object.values()
// 2.1 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
var obj = { foo: 'bar', baz: 42 };
Object.values(obj);
// ["bar", 42]

// 2.2 返回数组的成员顺序，与本章的《属性的遍历》部分介绍的排列规则一致。
var obj = { 100: 'a', 2: 'b', 7: 'c' };
Object.values(obj)
// ["b", "c", "a"]

// 2.3 Object.values只返回对象自身的可遍历属性。
// Object.create方法的第二个参数添加的对象属性（属性p），
// 如果不显式声明，默认是不可遍历的，因为p的属性描述对象的enumerable默认是false
var obj = Object.create({}, { p: { value: 42 } });
// Object.values(obj) // []

// 2.4 Object.values会过滤属性名为 Symbol 值的属性。
Object.values({ [Symbol()]: 123, foo: 'abc' });
// ['abc']

// 2.5 如果Object.values方法的参数是一个字符串，会返回各个字符组成的一个数组。
Object.values('foo')
// ['f', 'o', 'o']

// 2.6 如果参数不是对象，Object.values会先将其转为对象
// 由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，Object.values会返回空数组。
Object.values(42) // []
Object.values(true) // []


// 3. Object.entries()
// 3.1 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组
var obj = { foo: 'bar', baz: 42 };
Object.entries(obj);
// [ ["foo", "bar"], ["baz", 42] ]

// 3.2 如果原对象的属性名是一个 Symbol 值，该属性会被忽略。
Object.entries({ [Symbol()]: 123, foo: 'abc' });
// [ [ 'foo', 'abc' ] ]

// 3.3 Object.entries的基本用途是遍历对象的属性。
var obj = { one: 1, two: 2 };
for (let [k, v] of Object.entries(obj)) {
  console.log(
    `${JSON.stringify(k)}: ${JSON.stringify(v)}`
  );
}
// "one": 1
// "two": 2

// 3.4 另一个用处是，将对象转为真正的Map结构。
var obj = { foo: 'bar', baz: 42 };
var map = new Map(Object.entries(obj));
map // Map { foo: "bar", baz: 42 }

// 3.5 自己实现Object.entries方法，非常简单。
// Generator函数的版本
function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

// 非Generator函数的版本
function entries(obj) {
  let arr = [];
  for (let key of Object.keys(obj)) {
    arr.push([key, obj[key]]);
  }
  return arr;
}



console.log('****** Object.fromEntries() ******')
// 1. Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }

// 2. 特别适合将 Map 结构转为对象。

// 例一
var entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);

Object.fromEntries(entries)
// { foo: "bar", baz: 42 }

// 例二
var map = new Map().set('foo', true).set('bar', false);
Object.fromEntries(map)
// { foo: true, bar: false }

// 3. 配合URLSearchParams对象，将查询字符串转为对象

Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
// { foo: "bar", baz: "qux" }


