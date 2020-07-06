const a = 8
const b = 10
const c = 'javascript'

let str = ''

str = `my age is ${a + b}, i love ${c}`

function handlechat () {
  return a + b
}

str = `my age is ${handlechat()}, i love ${c}`

function template (strings, age) {
  let [s1, s2] = strings
  let showTxt
  if (age <= 18) {
    showTxt = '我还在上学！'
  } else if (age <= 25) {
    showTxt = '我还年轻，要努力奋斗！'
  } else if (age === 28) {
    showTxt = '我结婚了！'
  } else {
    showTxt = '我很幸福！'
  }
  return `${s1 + age}，${showTxt}${s2}`
}

str = template`我的年龄是${25}美好的明天还在等着我！`
console.log(str)
