console.log('************* 含义 **************')

// async 函数是什么？一句话，它就是 Generator 函数的语法糖。

// async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。

// async函数对 Generator 函数的改进，体现在以下四点。

//（1）内置执行器。

// Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。
// 也就是说，async函数的执行，与普通函数一模一样，只要一行。

//（2）更好的语义。

// async和await，比起星号和yield，语义更清楚了。
// async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。

//（3）更广的适用性。
// co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，
// 而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。

//（4）返回值是 Promise。

// async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。

// async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。


console.log('************* 基本用法 **************')

// async函数返回一个 Promise 对象，可以使用then方法添加回调函数。
// 当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

async function timeout(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);

// async 函数有多种使用形式。
// 函数声明
async function foo() {}

// 函数表达式
var foo = async function () {};

// 对象的方法
var obj = { async foo() {} };
obj.foo().then();

// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jake').then();

// 箭头函数
var foo = async () => {};



console.log('************* 语法 **************')

// async函数的语法规则总体上比较简单，难点是错误处理机制。

// 1.返回Promise对象

// async函数内部return语句返回的值，会成为then方法回调函数的参数。
async function f() {
  return 'hello world';
}

f().then(v => console.log(v))
// "hello world"

// async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。
// 抛出的错误对象会被catch方法回调函数接收到。
async function f() {
  throw new Error('出错了');
}

f().then(
  v => console.log('resolve', v),
  e => console.log('reject', e)
)
//reject Error: 出错了

// 2.Promise 对象的状态变化

// async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，
// 才会发生状态改变，除非遇到return语句或者抛出错误。

// 也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。


// 3.await 名命令
// 正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。
// 如果不是 Promise 对象，就直接返回对应的值。

async function f() {
  // 等同于
  // return 123;
  return await 123;
}

f().then(v => console.log(v))
// 123

// 另一种情况是，await命令后面是一个thenable对象（即定义了then方法的对象），那么await会将其等同于 Promise 对象。
class Sleep {
  constructor(timeout) {
    this.timeout = timeout;
  }
  then(resolve, reject) {
    const startTime = Date.now();
    setTimeout(
      () => resolve(Date.now() - startTime),
      this.timeout
    );
  }
}

(async () => {
  const sleepTime = await new Sleep(1000);
  console.log(sleepTime);
})();
// 1000

// 下面给出了一个简化的sleep实现。
function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  })
}

// 用法
async function one2FiveInAsync() {
  for(let i = 1; i <= 5; i++) {
    console.log(i);
    await sleep(1000);
  }
}

one2FiveInAsync();

// await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。
async function f1() {
  // await Promise.reject('出错了');
}

f1()
.then(v => console.log(v))
.catch(e => console.log(e))
// 出错了

// 上面代码中，await语句前面没有return，但是reject方法的参数依然传入了catch方法的回调函数。
// 这里如果在await前面加上return，效果是一样的。

// 任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。
async function f1() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}

// 有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。
// 这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。
async function f2() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
    console.log(e, 222);
  }
  return await Promise.resolve('hello world');
}

f2()
.then(v => console.log(v))
// hello world

// 另一种方法是await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。
async function f3() {
  await Promise.reject('出错了 333')
    .catch(e => console.log(e));
  return await Promise.resolve('hello world 333');
}

f3()
.then(v => console.log(v))
// 出错了
// hello world


// 4.错误处理

// 如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject。
async function f4() {
  await new Promise(function (resolve, reject) {
    throw new Error('出错了 444');
  });
}

f4()
.then(v => console.log(v))
.catch(e => console.log(e))
// Error：出错了

// 防止出错的方法，也是将其放在try...catch代码块之中。
async function f4() {
  try {
    await new Promise(function (resolve, reject) {
      throw new Error('出错了');
    });
  } catch(e) {
  }
  return await('hello world');
}

// 如果有多个await命令，可以统一放在try...catch结构中。
async function main() {
  try {
    // const val1 = await firstStep();
    // const val2 = await secondStep(val1);
    // const val3 = await thirdStep(val1, val2);

    // console.log('Final: ', val3);
  }
  catch (err) {
    console.error(err);
  }
}

// 下面的例子使用try...catch结构，实现多次重复尝试。
// var superagent = require('superagent');
// var NUM_RETRIES = 3;
// async function test() {
//   let i;
//   for (i = 0; i < NUM_RETRIES; ++i) {
//     try {
//       await superagent.get('http://google.com/this-throws-an-error');
//       break;
//     } catch(err) {}
//   }
//   console.log(i); // 3
// }
// test();

// 5.使用注意点

// 5.1 await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。

// 5.2 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。

// 没有依赖关系，同步操作比较耗时
// let foo = await getFoo();
// let bar = await getBar();

// => 让他们同时运行
// 写法一
// let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
// let fooPromise = getFoo();
// let barPromise = getBar();
// let foo = await fooPromise;
// let bar = await barPromise;

// 5.3 await命令只能用在async函数之中，如果用在普通函数，就会报错。

// async function dbFuc(db) {
//   let docs = [{}, {}, {}];
//   // 报错
//   docs.forEach(function (doc) {
//     await db.post(doc);
//   });
// }

function dbFuc(db) { //这里不需要 async
  let docs = [{}, {}, {}];

  // 可能得到错误结果
  docs.forEach(async function (doc) {
    await db.post(doc);
  });
}
// 上面代码可能不会正常工作，原因是这时三个db.post()操作将是并发执行，也就是同时执行，而不是继发执行。

// 正确的写法是采用for循环。
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  for (let doc of docs) {
    await db.post(doc);
  }
}

// 另一种方法是使用数组的reduce()方法。
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  await docs.reduce(async (_, doc) => {
    await _;
    await db.post(doc);
  }, undefined);
}

// 如果确实希望多个请求并发执行，可以使用Promise.all方法。
// 当三个请求都会resolved时，下面两种写法效果相同。

async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = await Promise.all(promises);
  console.log(results);
}

// 或者使用下面的写法
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = [];
  for (let promise of promises) {
    results.push(await promise);
  }
  console.log(results);
}

// 5.4 async 函数可以保留运行堆栈。
var a = () => {
  b().then(() => c());
};

// 上面代码中，函数a内部运行了一个异步任务b()。当b()运行的时候，函数a()不会中断，而是继续执行。
// 等到b()运行结束，可能a()早就运行结束了，b()所在的上下文环境已经消失了。
// 如果b()或c()报错，错误堆栈将不包括a()。

// 现在将这个例子改成async函数。
var a = async () => {
  await b();
  c();
};
// 上面代码中，b()运行的时候，a()是暂停执行，上下文环境都保存着。
// 一旦b()或c()报错，错误堆栈将包括a()。




console.log('********* async 函数的实现原理 *********')

// async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。
async function fn(args) {
  // ...
}

// 等同于
function fn(args) {
  return spawn(function* () {
    // ...
  });
}

// 所有的async函数都可以写成上面的第二种形式，其中的spawn函数就是自动执行器。

// 下面给出spawn函数的实现，基本就是前文自动执行器的翻版。
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}



console.log('********* 实例：按顺序完成异步操作 *********')

async function logInOrder(urls) {
  // 并发读取远程URL
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
// 虽然map方法的参数是async函数，但它是并发执行的，因为只有async函数内部是继发执行，外部不受影响。
// 后面的for..of循环内部使用了await，因此实现了按顺序输出。



console.log('********* 实例：按顺序完成异步操作 *********')

// 根据语法规格，await命令只能出现在 async 函数内部，否则都会报错。
// 报错
// const data = await fetch('https://api.example.com');

// 目前，有一个语法提案，允许在模块的顶层独立使用await命令，使得上面那行代码不会报错了。

// 这个提案的目的，是借用await解决模块异步加载的问题。

// var output;
// async function main() {
//   const dynamic = await import(someMission);
//   const data = await fetch(url);
//   output = someProcess(dynamic.default, data);
// }
// main();
// export { output };

// let output;
// (async function main() {
//   const dynamic = await import(someMission);
//   const data = await fetch(url);
//   output = someProcess(dynamic.default, data);
// })();
// export { output };

// 下面是加载这个模块的写法。
// import { output } from "./awaiting.js";

// function outputPlusValue(value) { return output + value }

// console.log(outputPlusValue(100));
// setTimeout(() => console.log(outputPlusValue(100), 1000);

// 上面代码中，outputPlusValue()的执行结果，完全取决于执行的时间。
// 如果awaiting.js里面的异步操作没执行完，加载进来的output的值就是undefined。

// 目前的解决方法，就是让原始模块输出一个 Promise 对象，从这个 Promise 对象判断异步操作有没有结束。
// let output;
// export default (async function main() {
//   const dynamic = await import(someMission);
//   const data = await fetch(url);
//   output = someProcess(dynamic.default, data);
// })();
// export { output };

// 上面代码中，awaiting.js除了输出output，还默认输出一个 Promise 对象
// （async 函数立即执行后，返回一个 Promise 对象），从这个对象判断异步操作是否结束。

// 下面是加载这个模块的新的写法。
// import promise, { output } from "./awaiting.js";

// function outputPlusValue(value) { return output + value }

// promise.then(() => {
//   console.log(outputPlusValue(100));
//   setTimeout(() => console.log(outputPlusValue(100), 1000);
// });


// 顶层的await命令，就是为了解决这个问题。它保证只有异步操作完成，模块才会输出值。

// const dynamic = import(someMission);
// const data = fetch(url);
// export const output = someProcess((await dynamic).default, await data);

// 上面代码中，两个异步操作在输出的时候，都加上了await命令。只有等到异步操作完成，这个模块才会输出值。

// import { output } from "./awaiting.js";
// function outputPlusValue(value) { return output + value }

// console.log(outputPlusValue(100));
// setTimeout(() => console.log(outputPlusValue(100), 1000);

// 上面代码的写法，与普通的模块加载完全一样。
// 也就是说，模块的使用者完全不用关心，依赖模块的内部有没有异步操作，正常加载即可。

// 顶层await只能用在 ES6 模块，不能用在 CommonJS 模块。
// 这是因为 CommonJS 模块的require()是同步加载，如果有顶层await，就没法处理加载了。






