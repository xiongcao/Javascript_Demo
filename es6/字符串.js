console.log('========= 字符串补白 ==========')

console.log('========= 长度为 2， 不足 向前补 0 ==========')
for (let i = 0; i < 32; i++) {
  console.log(i.toString().padStart(2, '0'))
}

console.log('========= 长度为 3， 向前补 *# ==========')
for (let i = 0; i < 200; i++) {
  console.log(i.toString().padStart(3, '*#'))
}

console.log('========= 长度为 2， 向后补 # ==========')
for (let i = 0; i < 32; i++) {
  console.log(i.toString().padEnd(2, '#'))
}