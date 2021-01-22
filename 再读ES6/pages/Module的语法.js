console.log('*********** 概述 ***********')

// 在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。
// ES6 在语言标准的层面上，实现了模块功能，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

// CommonJS 模块就是对象，输入时必须查找对象属性。
// CommonJS模块
// let { stat, exists, readfile } = require('fs');

// // 等同于
// let _fs = require('fs');
// let stat = _fs.stat;
// let exists = _fs.exists;
// let readfile = _fs.readfile;

// 上面代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取 3 个方法。
// 这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

// ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。

// ES6模块
// import { stat, exists, readFile } from 'fs';

// 上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。
// 这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。
// 当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。

// 由于 ES6 模块是编译时加载，使得静态分析成为可能。
// 有了它，就能进一步拓宽 JavaScript 的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。

// 除了静态加载带来的各种好处，ES6 模块还有以下好处。

// - 不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。
// 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。
// 不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。



console.log('*********** 严格模式 ***********')

// ES6 的模块自动采用严格模式，不管你有没有在模块头部加上 "use strict";。
// 严格模式主要有以下限制。
// - 变量必须声明后再使用
// - 函数的参数不能有同名属性，否则报错
// - 不能使用with语句
// - 不能对只读属性赋值，否则报错
// - 不能使用前缀 0 表示八进制数，否则报错
// - 不能删除不可删除的属性，否则报错
// - 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
// - eval不会在它的外层作用域引入变量
// - eval和arguments不能被重新赋值
// - arguments不会自动反映函数参数的变化
// - 不能使用arguments.callee
// - 不能使用arguments.caller
// - 禁止this指向全局对象
// - 不能使用fn.caller和fn.arguments获取函数调用的堆栈
// - 增加了保留字（比如protected、static和interface）

// 上面这些限制，模块都必须遵守。
// 其中，尤其需要注意this的限制。ES6 模块之中，顶层的this指向undefined，即不应该在顶层代码使用this。



console.log('*********** export 命令 ***********')

// export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

// 一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。
// 如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。

// export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
// export var foo = 'bar';
// setTimeout(() => foo = 'baz', 500);

// 上面代码输出变量foo，值为bar，500 毫秒之后变成baz。
// 这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新。

// 最后，export命令可以出现在模块的任何位置，只要处于模块顶层就可以。



console.log('*********** import 命令 ***********')

// 如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。
// import { lastName as surname } from './profile.js';

// import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。
// import {a} from './xxx.js'

// a = {}; // Syntax Error : 'a' is read-only;

// 但是，如果a是一个对象，改写a的属性是允许的。
// a.foo = 'hello'; // 合法操作

// 注意，import命令具有提升效果，会提升到整个模块的头部，首先执行
// foo();

// import { foo } from 'my_module';

// 由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。
// // 报错
// import { 'f' + 'oo' } from 'my_module';

// // 报错
// let module = 'my_module';
// import { foo } from module;

// // 报错
// if (x === 1) {
//   import { foo } from 'module1';
// } else {
//   import { foo } from 'module2';
// }

// 如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次。
// import 'lodash';
// import 'lodash';
// 上面代码加载了两次lodash，但是只会执行一次。

// 目前阶段，通过 Babel 转码，
// CommonJS 模块的require命令和 ES6 模块的import命令，可以写在同一个模块里面，但是最好不要这样做。
// 因为import在静态解析阶段执行，所以它是一个模块之中最早执行的。

// 下面的代码可能不会得到预期结果。
// require('core-js/modules/es6.symbol');
// require('core-js/modules/es6.promise');
// import React from 'React';



console.log('*********** 模块的整体加载 ***********')

// 除了指定加载某个输出值，还可以使用整体加载，
// 即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。

// 下面是一个circle.js文件，它输出两个方法area和circumference。
// circle.js

// export function area(radius) {
//   return Math.PI * radius * radius;
// }

// export function circumference(radius) {
//   return 2 * Math.PI * radius;
// }

// 现在，加载这个模块。
// main.js

// import { area, circumference } from './circle';

// console.log('圆面积：' + area(4));
// console.log('圆周长：' + circumference(14));

// 上面写法是逐一指定要加载的方法，整体加载的写法如下。
// import * as circle from './circle';

// console.log('圆面积：' + circle.area(4));
// console.log('圆周长：' + circle.circumference(14));

// 注意，模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，所以不允许运行时改变。
// 下面的写法都是不允许的。

// import * as circle from './circle';

// // 下面两行都是不允许的
// circle.foo = 'hello';
// circle.area = function () {};



console.log('*********** export default 命令 ***********')

// 其他模块加载该模块时，import命令可以为该匿名函数指定任意名字。
// import customName from './export-default';
// customName(); // 'foo'

// 上面代码的import命令，可以用任意名称指向export-default.js输出的方法，这时就不需要知道原模块输出的函数名。
// 需要注意的是，这时import命令后面，不使用大括号。

// export default命令用在非匿名函数前，也是可以的
// export default function foo() {
//   console.log('foo');
// }
// 上面代码中，foo函数的函数名foo，在模块外部是无效的。加载的时候，视同匿名函数加载。

// 一个模块只能有一个默认输出，因此export default命令只能使用一次。

// 本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。

// 所以，下面的写法是有效的。
// function add(x, y) {
//   return x * y;
// }
// export {add as default};
// 等同于
// export default add;

// import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';

// 正是因为export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句。
// 正确
// export var a = 1;

// 正确
// var a = 1;
// export default a;

// 错误
// export default var a = 1;

// 同样地，因为export default命令的本质是将后面的值，赋给default变量，
// 所以可以直接将一个值写在export default之后。

// 正确
// export default 42;

// 报错
// export 42;



console.log('*********** export 与 import 的符合写法 ***********')

// 如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。
// export { foo, bar } from 'my_module';

// 可以简单理解为
// import { foo, bar } from 'my_module';
// export { foo, bar };

// 但需要注意的是，写成一行以后，
// foo和bar实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用foo和bar。

// 模块的接口改名和整体输出，也可以采用这种写法。
// 接口改名
// export { foo as myFoo } from 'my_module';

// 整体输出
// export * from 'my_module';

// ES2020 之前，有一种import语句，没有对应的复合写法。
// import * as someIdentifier from "someModule";

// ES2020补上了这个写法。
// export * as ns from "mod";

// // 等同于
// import * as ns from "mod";
// export {ns};




console.log('************ 模块的继承 ************');

// 模块之间也可以继承。

// 假设有一个circleplus模块，继承了circle模块。
// circleplus.js

// export * from 'circle';
// export var e = 2.71828182846;
// export default function(x) {
//   return Math.exp(x);
// }
// 上面代码中的export *，表示再输出circle模块的所有属性和方法。
// 注意，export *命令会忽略circle模块的default方法。
// 然后，上面代码又输出了自定义的e变量和默认方法。

// 也可以将circle的属性或方法，改名后再输出。
// export { area as circleArea } from 'circle';

// 上面代码表示，只输出circle模块的area方法，且将其改名为circleArea。



console.log('************ 跨模块常量 ************');

// const声明的常量只在当前代码块有效
// 如果想设置跨模块的常量（即跨多个文件），或者说一个值要被多个模块共享，可以采用下面的写法。
// constants.js 模块
// export const A = 1;
// export const B = 3;
// export const C = 4;

// test1.js 模块
// import * as constants from './constants';
// console.log(constants.A); // 1
// console.log(constants.B); // 3

// test2.js 模块
// import {A, B} from './constants';
// console.log(A); // 1
// console.log(B); // 3



console.log('************ import() ************');

// 1.简介
// import命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行（import命令叫做“连接” binding 其实更合适）。

// 所以，下面的代码会报错。
// 报错
// if (x === 2) {
//   import MyModual from './myModual';
// }

// 上面代码中，引擎处理import语句是在编译时，这时不会去分析或执行if语句，所以import语句放在if代码块之中毫无意义，
// 因此会报句法错误，而不是执行时错误。
// 也就是说，import和export命令只能在模块的顶层，不能在代码块之中

// 这样的设计，固然有利于编译器提高效率，但也导致无法在运行时加载模块。
// 如果import命令要取代 Node 的require方法，这就形成了一个障碍。
// 因为require是运行时加载模块，import命令无法取代require的动态加载功能。

// const path = './' + fileName;
// const myModual = require(path);
// 上面的语句就是动态加载，require到底加载哪一个模块，只有运行时才知道。import命令做不到这一点。

// ES2020提案 引入import()函数，支持动态加载模块。
// import(specifier)

// 上面代码中，import函数的参数specifier，指定所要加载的模块的位置。
// import命令能够接受什么参数，import()函数就能接受什么参数，两者区别主要是后者为动态加载。

// import()返回一个 Promise 对象。
// 下面是一个例子。
// const main = document.querySelector('main');

// import(`./section-modules/${someVariable}.js`)
//   .then(module => {
//     module.loadPageInto(main);
//   })
//   .catch(err => {
//     main.textContent = err.message;
//   });

// import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。
// 它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。
// import()函数与所加载的模块没有静态连接关系，这点也是与import语句不相同。
// import()类似于 Node 的require方法，区别主要是前者是异步加载，后者是同步加载。


// 2.适用场合

// 2.1 按需加载
// 2.2 添加加载
// 2.3 动态的模块路径
// mport()允许模块路径动态生成。
// import(f())
// .then(...);
// 上面代码中，根据函数f的返回结果，加载不同的模块。


// 3.注意点

// import()加载模块成功以后，这个模块会作为一个对象，当作then方法的参数。
// 因此，可以使用对象解构赋值的语法，获取输出接口。
// import('./myModule.js')
// .then(({export1, export2}) => {
//   // ...·
// });

// 如果模块有default输出接口，可以用参数直接获得。
// import('./myModule.js')
// .then(myModule => {
//   console.log(myModule.default);
// });

// 如果想同时加载多个模块，可以采用下面的写法。
// Promise.all([
//   import('./module1.js'),
//   import('./module2.js'),
//   import('./module3.js'),
// ])
// .then(([module1, module2, module3]) => {
//    ···
// });

// import()也可以用在 async 函数之中。
// async function main() {
//   const myModule = await import('./myModule.js');
//   const {export1, export2} = await import('./myModule.js');
//   const [module1, module2, module3] =
//     await Promise.all([
//       import('./module1.js'),
//       import('./module2.js'),
//       import('./module3.js'),
//     ]);
// }
// main();