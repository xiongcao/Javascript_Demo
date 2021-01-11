console.log('********** 字符的 Unicode 表示法 **********');

// 1.采用\uxxxx形式表示一个字符, xxxx表示字符的 Unicode 码点
// 2.只限于码点在\u0000~\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表示

console.log('********** 字符串的遍历器接口 **********');

for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"

console.log('********** 模板字符串 **********');

// 1.转义字符
// console.log(`123\`456\``);

// 2.保留空格和换行（下面ul标签前面会有一个换行）
// $('#list').html(`
// <ul>
//   <li>first</li>
//   <li>second</li>
// </ul>
// `);

// 3.模板字符串嵌套
// const tmpl = addrs => `
//   <table>
//   ${addrs.map(addr => `
//     <tr><td>${addr.first}</td></tr>
//     <tr><td>${addr.last}</td></tr>
//   `).join('')}
//   </table>
// `;

console.log('********** 标签模板 **********');

// 1.函数调用的一种特殊形式，“标签”指的就是函数，后面的模板字符串就是它的参数
// alert `hello`
// // =>
// alert(['hello'])

// 2.如果模板字符里面有变量，会将模板字符串先处理成多个参数，再调用函
// let a = 5;
// let b = 10;

// tag`Hello ${ a + b } world ${ a * b }`;
// // 等同于
// tag(['Hello ', ' world ', ''], 15, 50);