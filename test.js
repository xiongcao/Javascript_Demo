// const p1 = Promise.resolve(1)
// const p2 = Promise.resolve(2)
// const p3 = Promise.resolve(3)

// Promise.all([p1, p3, p2]).then(res => {
//   console.log(res);
// })

// console.log(void (1 + 1));

for (var i = 1; i <= 5; i++) { setTimeout(function timer() { console.log(i); }, i * 1000); }