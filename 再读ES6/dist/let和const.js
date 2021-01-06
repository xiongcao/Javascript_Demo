"use strict";

var a = [];

var _loop = function _loop(i) {
  a[i] = function () {
    console.log(i);
  };
};

for (var i = 0; i < 10; i++) {
  _loop(i);
}

a[6](); // 6

console.log('*************** 分割 ****************'); // 小括号内是父级作用域，大括号内是子作用域

for (var _i = 0; _i < 3; _i++) {
  var _i2 = 'abc';
  console.log(_i2);
}