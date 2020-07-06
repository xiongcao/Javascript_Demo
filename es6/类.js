/** **************** ES5 **************** */

let Animal = function (type) {
  this.type = type
}

Animal.prototype.eat = function () { // 原型方法（实例对象方法）
  Animal.walk()
  console.log('i am eat food')
}

Animal.walk = function () { // 静态方法
  console.log('i am walking')
}

// let dog = new Animal('dog')
// let monkey = new Animal('monkey')

// monkey.constructor.prototype.eat = function () { // 修改原型方法
//   console.log('error')
// }

// console.log(dog, monkey)
// dog.eat()
// monkey.eat()

// 继承
let Dog = function () {
  Animal.call(this, 'dog')
}

Dog.prototype.run = function () {
  console.log('i can run')
}

Dog.prototype = Animal.prototype

// let dog2 = new Dog()
// console.log(dog2)
// dog2.eat()

/** **************** ES6 **************** */
let _age = 4
class Animal1 {
  constructor (type) {
    this.type = type
  }

  get age () {
    return _age
  }

  set age (val) {
    if (val < 7 && val > 4) {
      _age = val
    }
  }

  static walk () { // 静态方法
    console.log('i am walk')
  }

  eat () { // 实例方法
    Animal.walk()
    console.log('i am eat food')
  }
}

// let dog1 = new Animal1('dog')
// let monkey1 = new Animal1('monkey')
// dog1.eat()
// monkey1.eat()

// console.log(dog1.age)
// dog1.age = 6
// console.log(dog1.age)

// dog1.eat()
// Animal.walk()

// 继承
class Cat extends Animal1 {
  constructor () {
    super('cat')
  }
}
let cat = new Cat()
cat.eat()
