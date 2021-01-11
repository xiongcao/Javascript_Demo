console.log('********** fromCharCode() **********');

// ES5用于从 Unicode 码点返回对应字符，但是这个方法不能识别码点大于0xFFFF的字符

String.fromCharCode(0x20BB7) // "ஷ"
// 溢出，最高位2被舍弃

// ES6 提供了String.fromCodePoint()方法，可以识别大于0xFFFF的字符，弥补了String.fromCharCode()方法的不足
String.fromCodePoint(0x20BB7)
// "𠮷"


console.log('********** raw() **********');

// 1.方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串
String.raw`Hi\n${2 + 3}!`
// 实际返回 "Hi\\n5!"，显示的是转义后的结果 "Hi\n5!"

String.raw`Hi\u000A!`;
// 实际返回 "Hi\\u000A!"，显示的是转义后的结果 "Hi\u000A!"

// 2.如果原字符串的斜杠已经转义，那么String.raw()会进行再次转义。
String.raw`Hi\\n`
// 返回 "Hi\\\\n"

String.raw`Hi\\n` === "Hi\\\\n" // true


console.log('********** codePointAt() **********');

// 字符以 UTF-16 的格式储存，每个字符固定为2个字节。
// 对于那些需要4个字节储存的字符（Unicode 码点大于0xFFFF的字符），JavaScript 会认为它们是两个字符。

// var s = "𠮷";
// s.length // 2 误判为2
// s.charAt(0) // '' 无法读取整个字符
// s.charAt(1) // ''
// s.charCodeAt(0) // 55362 只能分别返回前两个字节和后两个字节的值
// s.charCodeAt(1) // 57271

// ES6 提供了codePointAt()方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。
// let s = '𠮷a';

// s.codePointAt(0) // 134071
// s.codePointAt(1) // 57271

// s.codePointAt(2) // 97

// s.codePointAt(0).toString(16) // "20bb7"
// s.codePointAt(2).toString(16) // "61"

console.log('********** includes(),startsWith(),endsWith() **********');

// 1.includes(str, n?)：返回布尔值，表示是否找到了参数字符串。第n个位置直到字符串结束
// 2.startsWith(str, n?)：返回布尔值，表示参数字符串是否在原字符串的头部。第n个位置直到字符串结束
// 3.endsWith(str, n?)：返回布尔值，表示参数字符串是否在原字符串的尾部。针对前n个字符
// 4.三个方法都支持第二个参数，表示开始搜索的位置

// let s = 'Hello world!';

// s.startsWith('Hello') // true
// s.endsWith('!') // true
// s.includes('o') // true

// s.startsWith('world', 6) // true
// s.endsWith('Hello', 5) // true
// s.includes('Hello', 6) // false

console.log('********** repeat() **********');

// repeat方法返回一个新字符串，表示将原字符串重复n次
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""

// 参数如果是小数，会被取整。负数或者Infinity，会报错。
'na'.repeat(2.9) // "nana"

// 参数是 0 到-1 之间的小数，则等同于 0。参数NaN等同于 0
'na'.repeat(-0.9) // ""
'na'.repeat(NaN) // ""

// 参数是字符串，则会先转换成数字
'na'.repeat('na') // ""
'na'.repeat('3') // "nanana"

console.log('********** padStart()，padEnd() **********');

// 1.字符串补全长度，字符串不够指定长度，会在头部或尾部补全
// padStart()用于头部补全
// padEnd()用于尾部补全。

'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'

// 2.原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串
'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'

// 3.如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。
'abc'.padStart(10, '0123456789')
// '0123456abc'

// 4.如果省略第二个参数，默认使用空格补全长度。
'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '

// 5. 常见用途
// 5.1 为数值补全指定位数
// 5.2 提示字符串格式

'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"

'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"


console.log('********** trimStart(),trimEnd() **********');

// 消除字符串空格，返回 新字符串，不会修改原始字符串
// trimStart()消除字符串头部的空格。别名：trimLeft
// trimEnd()消除尾部的空格。别名：trimRight
// 包括空格、tab、换行

const s = '  abc  ';

s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"


console.log('********** replaceAll() **********');

// es5 replace()只能替换第一个匹配。返回一个新字符串，不会改变原字符串
'aabbcc'.replace('b', '_')
// 'aa_bcc'

// 如果要替换所有的匹配，不得不使用正则表达式的g修饰符
'aabbcc'.replace(/b/g, '_')
// 'aa__cc'

// 1.es2021 引入了replaceAll(searchValue, replacement)方法，可以一次性替换所有匹配。
// 2.返回一个新字符串，不会改变原字符串
// 3.searchValue是搜索模式，可以是一个字符串，也可以是一个全局的正则表达式（带有g修饰符，不带g会报错）
// 4.replacement是一个字符串，表示替换的文本，其中可以使用一些特殊字符串
// 5.replacement除了为字符串，也可以是一个函数，该函数的返回值将替换掉第一个参数searchValue匹配的文本

// $& 表示匹配的字符串，即`b`本身
// 所以返回结果与原字符串一致
'abbc'.replaceAll('b', '$&')
// 'abbc'

// $` 表示匹配结果之前的字符串
// 对于第一个`b`，$` 指代`a`
// 对于第二个`b`，$` 指代`ab`
'abbc'.replaceAll('b', '$`')
// 'aaabc'

// $' 表示匹配结果之后的字符串
// 对于第一个`b`，$' 指代`bc`
// 对于第二个`b`，$' 指代`c`
'abbc'.replaceAll('b', `$'`)
// 'abccc'

// $1 表示正则表达式的第一个组匹配，指代`ab`
// $2 表示正则表达式的第二个组匹配，指代`bc`
'abbc'.replaceAll(/(ab)(bc)/g, '$2$1')
// 'bcab'

// $$ 指代 $
'abc'.replaceAll('b', '$$')
// 'a$c'


/**
 * @param {*} match 捕捉到的匹配内容
 * @param {*} p1 捕捉到是组匹配（有多少个组匹配，就有多少个对应的参数）
 * @param {*} p2 
 * @param {*} p3 
 * @param {*} offset 捕捉到的内容在整个字符串中的位置
 * @param {*} string 原字符串
 */
function replacer(match, p1, p2, p3, offset, string) {
  console.log(match, p1, p2, p3, offset);
  return [p1, p2, p3].join(' - ');
}

const str = '123abc456';
const regex = /(\d+)([a-z]+)(\d+)/g;

str.replaceAll(regex, replacer)
// 123 - abc - 456