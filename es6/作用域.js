/** *************** 全局作用域 ****************** */
var abc = 123 // 全局变量

abcd = 1234 // 不是全局变量，作为全局对象window的属性

function test () {
  ab = 45 // 不是全局变量，作为全局对象window的属性
}
// test()

// 以上变量都可以在其他文件中访问

/** ***************** 块级作用域 **************** */
// let 出现之前，js不存在块级作用域
function test2 () {
  var a = 1
  if (a === 1) {
    var b = 2 // 变量提升，相当于在if上面 var b;
    let c = 3 // 块级作用域，只在if块里面能访问
    console.log('abc')
  } else {
    console.log('abcd')
  }
  console.log(b) //  2
  console.log(c) // c is not defined
}
// test2()

/** ***************** 动态作用域 **************** */
aa = 3
function test3 () {
  console.log(this.aa) // 3
}
test3()
test3.bind({ aa: 100 })() // 100
