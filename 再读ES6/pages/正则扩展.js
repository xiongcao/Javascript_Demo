console.log('********** RegExp构造函数 **********');

// 在 ES5 中，RegExp构造函数的参数有两种情况。

// 1.参数是字符串，这时第二个参数表示正则表达式的修饰符（flag）
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;

// 2.参数是一个正则表示式，这时会返回一个原有正则表达式的拷贝
var regex = new RegExp(/xyz/i);
// 等价于
var regex = /xyz/i;

// 2.1 ES5 不允许此时使用第二个参数添加修饰符，否则会报错
var regex = new RegExp(/xyz/, 'i');
// Uncaught TypeError: Cannot supply flags when constructing one RegExp from another


// ES6 中，RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符
// 返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符

new RegExp(/abc/ig, 'i').flags // 原有正则对象的修饰符是ig，它会被第二个参数i覆盖
// "i"


console.log('********** 字符串 的正则方法 **********');

// ES5: match()、replace()、search()、split()

// ES6 将这 4 个方法，在语言内部全部调用RegExp的实例方法，
// 从而做到所有与正则相关的方法，全都定义在RegExp对象上。

// String.prototype.match 调用 RegExp.prototype[Symbol.match]
// String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
// String.prototype.search 调用 RegExp.prototype[Symbol.search]
// String.prototype.split 调用 RegExp.prototype[Symbol.split]


console.log('********** Y 修饰符 **********');

// 1.y修饰符，叫做“粘连”（sticky）修饰符
// 2.y修饰符的作用与g修饰符类似。
// 2.1 相同点：全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始
// 2.2 不同点：
// 2.2.1 g修饰符：只要剩余位置中存在匹配就可
// 2.2.2 y修饰符：确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义

var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]

r1.exec(s) // ["aa"]
r2.exec(s) // null

var r = /a+_/y;

r.exec(s) // ["aaa_"]
r.exec(s) // ["aa_"]


// lastIndex属性指定每次搜索的开始位置，g修饰符从这个位置开始向后搜索，直到发现匹配为止
const REGEX = /a/g;

// 指定从2号位置（y）开始匹配
REGEX.lastIndex = 2;

// 匹配成功
const match = REGEX.exec('xaya');

// 在3号位置匹配成功
match.index // 3

// 下一次匹配从4号位开始
REGEX.lastIndex // 4

// 4号位开始匹配失败
REGEX.exec('xaya') // null


// y修饰符同样遵守lastIndex属性，但是要求必须在lastIndex指定的位置发现匹配。
const REGEX1 = /a/y;

// 指定从2号位置开始匹配
REGEX1.lastIndex = 2;

// 不是粘连，匹配失败
const match1 = REGEX1.exec('xaya') // null

// 指定从3号位置开始匹配
REGEX1.lastIndex = 3;

// 3号位置是粘连，匹配成功
const match2 = REGEX1.exec('xaya');
match2.index // 3
REGEX1.lastIndex // 4

// y修饰符号隐含了头部匹配的标志^

const REGEX2 = /a/gy;
'aaxa'.replace(REGEX2, '-') // '--xa'  最后一个a因为不是出现在下一次匹配的头部，所以不会被替换


// 单单一个y修饰符对match方法，只能返回第一个匹配，必须与g修饰符联用，才能返回所有匹配。
'a1a2a3'.match(/a\d/y) // ["a1"]
'a1a2a3'.match(/a\d/gy) // ["a1", "a2", "a3"]


console.log('********** sticky 属性 **********');

// 正则实例对象多了sticky属性，表示是否设置了y修饰符。
var r = /hello\d/y;
r.sticky // true

console.log('********** flags 属性 **********');

// ES6 为正则表达式新增了flags属性，会返回正则表达式的修饰符

// ES5 的 source 属性
// 返回正则表达式的正文
// /abc/ig.source
// "abc"

// ES6 的 flags 属性
// 返回正则表达式的修饰符
// /abc/ig.flags
// 'gi'

console.log('********** 后行断言 **********');

// JavaScript 语言的正则表达式，只支持先行断言（lookahead）和先行否定断言（negative lookahead）
// ES2018 引入后行断言（lookbehind）。

// 先行断言：x只有在y前面才匹配，必须写成/x(?=y)/。比如，只匹配百分号之前的数字，要写成/\d+(?=%)/
// 先行否定断言：x只有不在y前面才匹配，必须写成/x(?!y)/。比如，只匹配不在百分号之前的数字，要写成/\d+(?!%)/。
// /\d+(?=%)/.exec('100% of US presidents have been male')  // ["100"]
// /\d+(?!%)/.exec('that’s all 44 of them')                 // ["44"]


// 后行断言：x只有在y后面才匹配，必须写成/(?<=y)x/。比如，只匹配美元符号之后的数字，要写成/(?<=\$)\d+/。
// 后行否定断言：x只有不在y后面才匹配，必须写成/(?<!y)x/。比如，只匹配不在美元符号后面的数字，要写成/(?<!\$)\d+/。

// /(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')  // ["100"]
// /(?<!\$)\d+/.exec('it’s is worth about €90')                // ["90"]

// const RE_DOLLAR_PREFIX = /(?<=\$)foo/g;
// '$foo %foo foo'.replace(RE_DOLLAR_PREFIX, 'bar');
// // '$bar %foo foo'

// “后行断言”的实现，需要先匹配/(?<=y)x/的x，然后再回到左边，匹配y的部分。
// 这种“先右后左”的执行顺序，与所有其他正则操作相反，导致了一些不符合预期的行为。
