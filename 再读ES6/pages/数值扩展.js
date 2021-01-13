console.log('********** 二进制和八进制 表示法 **********');

// 1.ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示。

0b111110111 === 503 // true
0o767 === 503 // true

// 2.从 ES5 开始，在严格模式之中，八进制就不再允许使用前缀0表示，ES6 进一步明确，要使用前缀0o表示。

// 非严格模式
;(function(){
  console.log(0o11 === 011);
})() // true

// 严格模式
;(function(){
  'use strict';
  // console.log(0o11 === 011);
})() // Uncaught SyntaxError: Octal literals are not allowed in strict mode.

// 如果要将0b和0o前缀的字符串数值转为十进制，要使用Number方法。

Number('0b111')  // 7
Number('0b111110111')  // 7
Number('0o10')  // 8

console.log('********** isFinite() isNaN() **********');

// 1.Number.isFinite()用来检查一个数值是否为有限的（finite），即不是Infinity.
// 1.1 参数类型不是数值，Number.isFinite一律返回false。
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false

// 2.Number.isNaN()用来检查一个值是否为NaN。
// 2.1 如果参数类型不是NaN，Number.isNaN一律返回false。
Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(true) // false
Number.isNaN(9/NaN) // true
Number.isNaN('true' / 0) // true
Number.isNaN('true' / 'true') // true

// 3.与传统的全局方法 isFinite、isNaN 的区别：
// 3.1 传统方法先调用Number()将非数值的值转为数值，再进行判断。
// 3.2 这两个新方法只对数值有效：
// 3.2.1 Number.isFinite()对于非数值一律返回false
// 3.2.2 Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。

isFinite(25) // true
isFinite("25") // true
Number.isFinite(25) // true
Number.isFinite("25") // false

isNaN(NaN) // true
isNaN("NaN") // true
Number.isNaN(NaN) // true
Number.isNaN("NaN") // false
Number.isNaN(1) // false


console.log('********** parseInt() parseFloat() **********');

// 1.ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。

// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45

// 2.这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。


console.log('********** isInteger() **********');

// 1.Number.isInteger()用来判断一个数值是否为整数。
Number.isInteger(25) // true
Number.isInteger(25.1) // false

// 2.JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。
Number.isInteger(25) // true
Number.isInteger(25.0) // true

// 3.如果参数不是数值，Number.isInteger返回false。
Number.isInteger() // false
Number.isInteger(null) // false
Number.isInteger('15') // false
Number.isInteger(true) // false

// 4.如果对数据精度的要求较高，不建议使用Number.isInteger()判断一个数值是否为整数。


console.log('********** EPSILON **********');

// 1.ES6 新增一个极小的常量Number.EPSILON。它表示 1 与大于 1 的最小浮点数之间的差。
// 2.Number.EPSILON实际上是 JavaScript 能够表示的最小精度。
// 误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了
// 3.引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围


console.log('********** Math 对象的扩展 **********');

// 1.Math.trunc方法用于去除一个数的小数部分，返回整数部分。
Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0

// 对于非数值，Math.trunc内部使用Number方法将其先转为数值。
Math.trunc('123.456') // 123
Math.trunc(true) //1
Math.trunc(false) // 0
Math.trunc(null) // 0

// 对于空值和无法截取整数的值，返回NaN。

Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN
Math.trunc(undefined) // NaN

// 2.Math.sign方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。

// 五种返回值
// 参数为正数，返回+1；
// 参数为负数，返回-1；
// 参数为 0，返回0；
// 参数为-0，返回-0;
// 其他值，返回NaN。

Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN

Math.sign('')  // 0
Math.sign(true)  // +1
Math.sign(false)  // 0
Math.sign(null)  // 0
Math.sign('9')  // +1
Math.sign('foo')  // NaN
Math.sign()  // NaN
Math.sign(undefined)  // Na


// 3.Math.cbrt()方法用于计算一个数的立方根。
Math.cbrt(-1) // -1
Math.cbrt(0)  // 0
Math.cbrt(1)  // 1
Math.cbrt(2)  // 1.2599210498948732
Math.cbrt(8)  // 2

// 对于非数值，Math.cbrt()方法内部也是先使用Number()方法将其转为数值
Math.cbrt('8') // 2
Math.cbrt('hello') // NaN


// 4.Math.hypot方法返回所有参数的平方和的平方根。
Math.hypot(3, 4);        // 5
Math.hypot(3, 4, 5);     // 7.0710678118654755
Math.hypot();            // 0
Math.hypot(NaN);         // NaN
Math.hypot(3, 4, 'foo'); // NaN
Math.hypot(3, 4, '5');   // 7.0710678118654755
Math.hypot(-3);          // 3

// 5.指数运算符（**）

// 2 ** 2 // 4
// 2 ** 3 // 8

// 这个运算符的一个特点是右结合，而不是常见的左结合。多个指数运算符连用时，是从最右边开始计算的。
// 相当于 2 ** (3 ** 2)
2 ** 3 ** 2
// 512

// 指数运算符可以与等号结合，形成一个新的赋值运算符（**=）。
// let a = 1.5;
// a **= 2;
// // 等同于 a = a * a;

// let b = 4;
// b **= 3;
// // 等同于 b = b * b * b;
