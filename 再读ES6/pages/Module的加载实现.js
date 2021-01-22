console.log('********* 浏览器的加载 ***********')

// 1.传统方法
// 默认情况下，浏览器是同步加载 JavaScript 脚本，即渲染引擎遇到<script>标签就会停下来，
// 等到执行完脚本，再继续向下渲染。
// 如果是外部脚本，还必须加入脚本下载的时间。

// 如果脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞，用户会感觉到浏览器“卡死”了，没有任何响应。
// 这显然是很不好的体验，所以浏览器允许脚本异步加载，下面就是两种异步加载的语法。
{/* <script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script> */}

// defer要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；
// async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。
// 一句话，defer是“渲染完再执行”，async是“下载完就执行”。
// 另外，如果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的。


// 2.加载规则

// 浏览器加载 ES6 模块，也使用<script>标签，但是要加入type="module"属性。
{/* <script type="module" src="./foo.js"></script> */}

// 浏览器对于带有type="module"的<script>，都是异步加载，不会造成堵塞浏览器，
// 即等到整个页面渲染完，再执行模块脚本，等同于打开了<script>标签的defer属性。
{/* <script type="module" src="./foo.js"></script>
<!-- 等同于 -->
<script type="module" src="./foo.js" defer></script> */}

// 如果网页有多个<script type="module">，它们会按照在页面出现的顺序依次执行。

{/* <script>标签的async属性也可以打开，这时只要加载完成，渲染引擎就会中断渲染立即执行。执行完成后，再恢复渲染。 */}
{/* <script type="module" src="./foo.js" async></script> */}
// 一旦使用了async属性，<script type="module">就不会按照在页面出现的顺序执行，而是只要该模块加载完成，就执行该模块。

// 对于外部的模块脚本，有几点需要注意。
// - 代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。
// - 模块脚本自动采用严格模式，不管有没有声明use strict。
// - 模块之中，可以使用import命令加载其他模块（.js后缀不可省略，需要提供绝对 URL 或相对 URL），也可以使用export命令输出对外接口。
// - 模块之中，顶层的this关键字返回undefined，而不是指向window。也就是说，在模块顶层使用this关键字，是无意义的。
// - 同一个模块如果加载多次，将只执行一次。



console.log('********* ES6 模块与 CommonJS 模块的 差异 ***********')

//  ES6 模块与 CommonJS 模块完全不同。
// 它们有三个重大差异。
// - CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
// - CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
// - CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。

// 第二个差异是因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。
// 而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

// 下面重点解释第一个差异。

// CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
// 请看下面这个模块文件lib.js的例子。
// lib.js
// var counter = 3;
// function incCounter() {
//   counter++;
// }
// module.exports = {
//   counter: counter,
//   incCounter: incCounter,
// };

// 上面代码输出内部变量counter和改写这个变量的内部方法incCounter。然后，在main.js里面加载这个模块。
// main.js
// var mod = require('./lib');

// console.log(mod.counter);  // 3
// mod.incCounter();
// console.log(mod.counter); // 3

// 上面代码说明，lib.js模块加载以后，它的内部变化就影响不到输出的mod.counter了。
// 这是因为mod.counter是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。
// lib.js
// var counter = 3;
// function incCounter() {
//   counter++;
// }
// module.exports = {
//   get counter() {
//     return counter
//   },
//   incCounter: incCounter,
// };
// 上面代码中，输出的counter属性实际上是一个取值器函数。
// 现在再执行main.js，就可以正确读取内部变量counter的变动了。

// ES6 模块的运行机制与 CommonJS 不一样。
// JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。
// 等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
// 换句话说，ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。
// 因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

// 由于 ES6 输入的模块变量，只是一个“符号连接”，所以这个变量是只读的，对它进行重新赋值会报错。
// lib.js
// export let obj = {};

// // main.js
// import { obj } from './lib';

// obj.prop = 123; // OK
// obj = {}; // TypeError

// 最后，export通过接口，输出的是同一个值。
// 不同的脚本加载这个接口，得到的都是同样的实例。



console.log('********* Node.js 的模块加载方法 ***********')

// 1.概述

// JavaScript 现在有两种模块。
// 一种是 ES6 模块，简称 ESM；
// 另一种是 CommonJS 模块，简称 CJS。

// CommonJS 模块是 Node.js 专用的，与 ES6 模块不兼容。
// 语法上面，两者最明显的差异是，
// CommonJS 模块使用require()和module.exports，
// ES6 模块使用import和export。

// 从 Node.js v13.2 版本开始，Node.js 已经默认打开了 ES6 模块支持。

// Node.js 要求 ES6 模块采用.mjs后缀文件名。
// 。也就是说，只要脚本文件里面使用import或者export命令，那么就必须采用.mjs后缀名。
// Node.js 遇到.mjs文件，就认为它是 ES6 模块，默认启用严格模式，不必在每个模块文件顶部指定"use strict"。

// 如果不希望将后缀名改成.mjs，可以在项目的package.json文件中，指定type字段为module。
// {
//   "type": "module"
// }

// 一旦设置了以后，该目录里面的 JS 脚本，就被解释用 ES6 模块。
// 如果这时还要使用 CommonJS 模块，那么需要将 CommonJS 脚本的后缀名都改成.cjs。
// 如果没有type字段，或者type字段为commonjs，则.js脚本会被解释成 CommonJS 模块。

// 总结为一句话：
// .mjs文件总是以 ES6 模块加载，
// .cjs文件总是以 CommonJS 模块加载，
// .js文件的加载取决于package.json里面type字段的设置。

// 注意，ES6 模块与 CommonJS 模块尽量不要混用。
// require命令不能加载.mjs文件，会报错，只有import命令才可以加载.mjs文件。
// 。反过来，.mjs文件里面也不能使用require命令，必须使用import。


// 2.package.json 的 main 字段

// package.json文件有两个字段可以指定模块的入口文件：main和exports。
// 比较简单的模块，可以只使用main字段，指定模块加载的入口文件。
// {
//   "type": "module",
//   "main": "./src/index.js"
// }


// 3.package.json 的 exports 字段

// exports字段的优先级高于main字段。它有多种用法。

// 3.1 子目录别名
// package.json文件的exports字段可以指定脚本或子目录的别名。
// {
//   "exports": {
//     "./submodule": "./src/submodule.js"
//   }
// }
// 上面的代码指定src/submodule.js别名为submodule，然后就可以从别名加载这个文件。
// import submodule from 'es-module-package/submodule';
// 加载 ./node_modules/es-module-package/src/submodule.js

// 如果没有指定别名，就不能用“模块+脚本名”这种形式加载脚本。
// 报错
// import submodule from 'es-module-package/private-module.js';

// 不报错
// import submodule from './node_modules/es-module-package/private-module.js';

// 3.2 main 的别名
// exports字段的别名如果是.，就代表模块的主入口，优先级高于main字段，并且可以直接简写成exports字段的值。
// {
//   "exports": {
//     ".": "./main.js"
//   }
// }

// 等同于
// {
//   "exports": "./main.js"
// }

// 3.3.条件加载
// 利用.这个别名，可以为 ES6 模块和 CommonJS 指定不同的入口。
// 目前，这个功能需要在 Node.js 运行的时候，打开--experimental-conditional-exports标志。
// {
//   "type": "module",
//   "exports": {
//     ".": {
//       "require": "./main.cjs",
//       "default": "./main.js"
//     }
//   }
// }
// 上面代码中，别名.的require条件指定require()命令的入口文件（即 CommonJS 的入口）
// default条件指定其他情况的入口（即 ES6 的入口）。

// 上面的写法可以简写如下。
// {
//   "exports": {
//     "require": "./main.cjs",
//     "default": "./main.js"
//   }
// }

// 注意，如果同时还有其他别名，就不能采用简写，否则或报错。
// {
//   // 报错
//   "exports": {
//     "./feature": "./lib/feature.js",
//     "require": "./main.cjs",
//     "default": "./main.js"
//   }
// }


// 4.CommonJS 模块加载 ES6 模块

// CommonJS 的require()命令不能加载 ES6 模块，会报错，只能使用import()这个方法加载。
// (async () => {
//   await import('./my-app.mjs');
// })();

// require()不支持 ES6 模块的一个原因是，它是同步加载，
// 而 ES6 模块内部可以使用顶层await命令，导致无法被同步加载。


// 5.ES6 模块加载 CommonJS 模块
// ES6 模块的import命令可以加载 CommonJS 模块，但是只能整体加载，不能只加载单一的输出项。
// 正确
// import packageMain from 'commonjs-package';

// // 报错
// import { method } from 'commonjs-package';
// 这是因为 ES6 模块需要支持静态代码分析，
// 而 CommonJS 模块的输出接口是module.exports，是一个对象，无法被静态分析，所以只能整体加载。

// 加载单一的输出项，可以写成下面这样。
// import packageMain from 'commonjs-package';
// const { method } = packageMain;


// 6.同时支持两种格式的模块

// 如果原始模块是 ES6 格式，那么需要给出一个整体输出接口，
// 比如export default obj，使得 CommonJS 可以用import()进行加载。

// 如果原始模块是 CommonJS 格式，那么可以加一个包装层。
// import cjsModule from '../index.js';
// export const foo = cjsModule.foo;


// 7.Node.js 的内置模块
// Node.js 的内置模块可以整体加载，也可以加载指定的输出项。
// 整体加载
// import EventEmitter from 'events';
// const e = new EventEmitter();

// 加载指定的输出项
// import { readFile } from 'fs';
// readFile('./foo.txt', (err, source) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(source);
//   }
// });

// 8.加载路径
// ES6 模块的加载路径必须给出脚本的完整路径，不能省略脚本的后缀名。
// import命令和package.json文件的main字段如果省略脚本的后缀名，会报错。

// ES6 模块中将报错
// import { something } from './index';

// 为了与浏览器的import加载规则相同，Node.js 的.mjs文件支持 URL 路径。
// import './foo.mjs?query=1'; // 加载 ./foo 传入参数 ?query=1

// 上面代码中，脚本路径带有参数?query=1，Node 会按 URL 规则解读。
// 同一个脚本只要参数不同，就会被加载多次，并且保存成不同的缓存。
// 由于这个原因，只要文件名中含有:、%、#、?等特殊字符，最好对这些字符进行转义。

// 目前，Node.js 的import命令只支持加载本地模块（file:协议）和data:协议，不支持加载远程模块。
// 另外，脚本路径只支持相对路径，不支持绝对路径（即以/或//开头的路径）。


// 9.局部变量
// ES6 模块应该是通用的，同一个模块不用修改，就可以用在浏览器环境和服务器环境。
// 为了达到这个目标，Node.js 规定 ES6 模块之中不能使用 CommonJS 模块的特有的一些内部变量。

// 首先，就是this关键字。
// ES6 模块之中，顶层的this指向undefined；
// CommonJS 模块的顶层this指向当前模块，这是两者的一个重大差异。

// 其次，以下这些顶层变量在 ES6 模块之中都是不存在的。
// arguments
// require
// module
// exports
// __filename
// __dirname



console.log('*********** 循环加载 *************');

// “循环加载”（circular dependency）指的是，a脚本的执行依赖b脚本，而b脚本的执行又依赖a脚本。
// a.js
// var b = require('b');

// b.js
// var a = require('a');

// 通常，“循环加载”表示存在强耦合，如果处理不好，还可能导致递归加载，使得程序无法执行，因此应该避免出现。
// 但是实际上，这是很难避免的，尤其是依赖关系复杂的大项目，很容易出现a依赖b，b依赖c，c又依赖a这样的情况。
// 这意味着，模块加载机制必须考虑“循环加载”的情况。

// 对于 JavaScript 语言来说，目前最常见的两种模块格式 CommonJS 和 ES6，处理“循环加载”的方法是不一样的，返回的结果也不一样。

// 1.CommonJS 模块的加载原理

// CommonJS 的一个模块，就是一个脚本文件。
// require命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。

// {
//   id: '...',
//   exports: { ... },
//   loaded: true,
//   ...
// }

// 上面代码就是 Node 内部加载模块后生成的一个对象。
// 该对象的id属性是模块名，exports属性是模块输出的各个接口，loaded属性是一个布尔值，表示该模块的脚本是否执行完毕。

// 以后需要用到这个模块的时候，就会到exports属性上面取值。
// 即使再次执行require命令，也不会再次执行该模块，而是到缓存之中取值。

// 也就是说，CommonJS 模块无论加载多少次，都只会在第一次加载时运行一次，
// 以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。


// 2.CommonJS 模块的循环加载
// CommonJS 模块的重要特性是加载时执行，即脚本代码在require的时候，就会全部执行。
// 一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。

// 让我们来看，Node 官方文档里面的例子。
// 脚本文件a.js代码如下。
// exports.done = false;
// var b = require('./b.js');
// console.log('在 a.js 之中，b.done = %j', b.done);
// exports.done = true;
// console.log('a.js 执行完毕');

// 上面代码之中，a.js脚本先输出一个done变量，然后加载另一个脚本文件b.js。
// 注意，此时a.js代码就停在这里，等待b.js执行完毕，再往下执行。

// 再看b.js的代码。
// exports.done = false;
// var a = require('./a.js');
// console.log('在 b.js 之中，a.done = %j', a.done);
// exports.done = true;
// console.log('b.js 执行完毕');

// 上面代码之中，b.js执行到第二行，就会去加载a.js，这时，就发生了“循环加载”
// 系统会去a.js模块对应对象的exports属性取值，可是因为a.js还没有执行完，
// 从exports属性只能取回已经执行的部分，而不是最后的值。

// a.js已经执行的部分，只有一行。
// exports.done = false;

// 因此，对于b.js来说，它从a.js只输入一个变量done，值为false。

// 然后，b.js接着往下执行，等到全部执行完毕，再把执行权交还给a.js。
// 于是，a.js接着往下执行，直到执行完毕。

// 我们写一个脚本main.js，验证这个过程。
// var a = require('./a.js');
// var b = require('./b.js');
// console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);

// 执行main.js，运行结果如下。
// 在 b.js 之中，a.done = false
// b.js 执行完毕
// 在 a.js 之中，b.done = true
// a.js 执行完毕
// 在 main.js 之中, a.done=true, b.done=true

// 上面的代码证明了两件事。

// 一是，在b.js之中，a.js没有执行完毕，只执行了第一行。
// 二是，main.js执行到第二行时，不会再次执行b.js，
// 而是输出缓存的b.js的执行结果，即它的第四行。

// 总之，CommonJS 输入的是被输出值的拷贝，不是引用。

// 另外，由于 CommonJS 模块遇到循环加载时，返回的是当前已经执行的部分的值，
// 而不是代码全部执行后的值，两者可能会有差异。
// 所以，输入变量的时候，必须非常小心。

// var a = require('a'); // 安全的写法
// var foo = require('a').foo; // 危险的写法

// exports.good = function (arg) {
//   return a.foo('good', arg); // 使用的是 a.foo 的最新值
// };

// exports.bad = function (arg) {
//   return foo('bad', arg); // 使用的是一个部分加载时的值
// };

// 上面代码中，如果发生循环加载，
// require('a').foo的值很可能后面会被改写，改用require('a')会更保险一点。


// 3.ES6 模块的循环加载

// ES6 处理“循环加载”与 CommonJS 有本质的不同。
// ES6 模块是动态引用，如果使用import从一个模块加载变量（即import foo from 'foo'），
// 那些变量不会被缓存，而是成为一个指向被加载模块的引用，
// 需要开发者自己保证，真正取值的时候能够取到值。

// 请看下面这个例子。
// a.mjs
// import {bar} from './b';
// console.log('a.mjs');
// console.log(bar);
// export let foo = 'foo';

// b.mjs
// import {foo} from './a';
// console.log('b.mjs');
// console.log(foo);
// export let bar = 'bar';

// 上面代码中，a.mjs加载b.mjs，b.mjs又加载a.mjs，构成循环加载。执行a.mjs，结果如下。

// 上面代码中，执行a.mjs以后会报错，foo变量未定义，这是为什么？
// 让我们一行行来看，ES6 循环加载是怎么处理的。

// 首先，执行a.mjs以后，引擎发现它加载了b.mjs，因此会优先执行b.mjs，然后再执行a.mjs。
// 接着，执行b.mjs的时候，已知它从a.mjs输入了foo接口，这时不会去执行a.mjs，而是认为这个接口已经存在了，继续往下执行。
// 执行到第三行console.log(foo)的时候，才发现这个接口根本没定义，因此报错。

// 解决这个问题的方法，就是让b.mjs运行的时候，foo已经有定义了。
// 这可以通过将foo写成函数来解决。
// a.mjs
// import {bar} from './b';
// console.log('a.mjs');
// console.log(bar());
// function foo() { return 'foo' }
// export {foo};

// b.mjs
// import {foo} from './a';
// console.log('b.mjs');
// console.log(foo());
// function bar() { return 'bar' }
// export {bar};

// 这时再执行a.mjs就可以得到预期结果。
// $ node --experimental-modules a.mjs
// b.mjs
// foo
// a.mjs
// bar

// 这是因为函数具有提升作用，在执行import {bar} from './b'时，函数foo就已经有定义了，所以b.mjs加载的时候不会报错。
// 这也意味着，如果把函数foo改写成函数表达式，也会报错。
// a.mjs
// import {bar} from './b';
// console.log('a.mjs');
// console.log(bar());
// const foo = () => 'foo';
// export {foo};

// 上面代码的第四行，改成了函数表达式，就不具有提升作用，执行就会报错。

// 我们再来看 ES6 模块加载器SystemJS给出的一个例子。
// even.js
import { odd } from './odd'
export var counter = 0;
export function even(n) {
  counter++;
  return n === 0 || odd(n - 1);
}

// odd.js
import { even } from './even';
export function odd(n) {
  return n !== 0 && even(n - 1);
}

// 上面代码中，even.js里面的函数even有一个参数n，只要不等于 0，就会减去 1，传入加载的odd()。
// odd.js也会做类似操作。

// 运行上面这段代码，结果如下。

// $ babel-node
// > import * as m from './even.js';
// > m.even(10);
// true
// > m.counter
// 6
// > m.even(20)
// true
// > m.counter
// 17

// 这个例子要是改写成 CommonJS，就根本无法执行，会报错。
// even.js
var odd = require('./odd');
var counter = 0;
exports.counter = counter;
exports.even = function (n) {
  counter++;
  return n == 0 || odd(n - 1);
}

// odd.js
var even = require('./even').even;
module.exports = function (n) {
  return n != 0 && even(n - 1);
}

// 上面代码中，even.js加载odd.js，而odd.js又去加载even.js，形成“循环加载”。
// 这时，执行引擎就会输出even.js已经执行的部分（不存在任何结果），
// 所以在odd.js之中，变量even等于undefined，等到后面调用even(n - 1)就会报错。






