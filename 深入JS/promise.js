// 1. promise 状态不受外界影响；
// 2. promise 的固化；一旦promise 状态变化后就不可更改

const findData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve('this is a apple');
      reject('this is a apple');
    }, 500);
  })
}

// findData().then((data) => {
//   console.log('第一次调用:', data);

//   findData().then((data) => {
//     console.log('第二次调用:', data);

//     findData().then((data) => {
//       console.log('第三次调用:', data);
//     })
//   })
// })

// findData().then((data) => {
//   console.log(data);
//   // console.log('第一次调用:', data);
// }, (err) => {
//   console.log('第一次调用:', err);
//   findData().then((data) => {
//     console.log('第二次调用:', data);
//   }, (err) => {
//     console.log('第三次调用:', err);
//   })
// })

// theable 对象
// let obj = {
//   then(resolve, reject) {
//     resolve(11)
//     // reject(12)
//   }
// }

// let p1 = Promise.resolve(obj);
// let p2 = Promise.reject(obj);

// p1.then((data) => {
//   console.log('resolve data: ', data); // data: 11
// }, (err) => {
//   console.log('resolve err: ', err); // err:  12
// })

// p2.then((data) => {
//   console.log('reject data: ', data);
// }, (err) => {
//   console.log('reject err: ', err); // err:  { then: [Function: then] }
// })

// Promise.resolve().then(() => {
//   console.log('promise1');
//   setTimeout(() => {
//     console.log('setTimeout1');
//   });
// })

// setTimeout(() => {
//   console.log('setTimeout2');
//   Promise.resolve().then(() => {
//     console.log('promise2');
//   })
// });

// promise1
// setTimeout2
// promise2
// setTimeout1


// const p1 = new Promise((resolve, reject) => {
//   resolve(1);
//   // reject(10);
// })

// p1.then(res => {
//   console.log('res1: ', res); // 1
//   return res + 1
// })
//   .then() // 忽略
//   .then() // 忽略
//   .then(res => {
//     console.log('res2: ', res); // 2
//   })
//   .catch(err => {
//     console.log('err: ', err);
//   })


// 状态依赖
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('10000');
//     // reject('10000');
//   }, 2000)
// })

// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject(p1);
//   }, 1000)
// })

// p2.then(res => {
//   console.log('res: ', res); // 2s 后打印 10000
// }).catch(err => {
//   console.log('err: ', err);  // 2s 后打印 10000
// })

// Promise.all(p1, p2, p3); // 等待所有成功结果
// Promise.race(p1, p2, p3); // 等待最先的一个结果