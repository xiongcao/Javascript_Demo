function typeOf(value) {
  const key = ({}).toString.call(value);
  const res = {
    '[object String]': 'String',
    '[object Number]': 'Number',
    '[object Boolean]': 'Boolean',
    '[object Object]': 'Object',
    '[object Array]': 'Array',
    '[object Function]': 'Function',
    '[object Null]': 'Null',
    '[object Undefined]': 'Undefined',
  }
  return res[key];
}


Function.prototype.myCall = function (ctx) {
  ctx = ctx ? Object(ctx) : window;
  ctx.originFn = this;


  const args = [];
  for (let i = 0; i < arguments.length; i++) {
    args.push('arguments[' + i + ']');
  }
  const res = eval('ctx.originFn(' + args + ')');
  delete ctx.originFn;
  return res;
}

Function.prototype.myApply = function (ctx, args) {
  ctx = ctx ? Object(ctx) : window;
  ctx.originFn = this;

  if (
    typeof args === 'string' ||
    typeof args === 'number' ||
    typeof args === 'boolean'
  ) {
    throw TypeError('error');
  }

  if (!ctx || typeOf(args) !== 'Array') {
    const res = ctx.originFn();
    delete ctx.originFn;
    return res;
  }

  const _args = [];
  for (let i = 0; i < args.length; i++) {
    _args.push('arguments[' + i + ']');
  }
  const res = eval('ctx.originFn(' + _args + ')');
  delete ctx.originFn;
  return res;

}


// fn.bind()()
Function.prototype.myBind = function (thisObj) {
  let firstFn = this;
  let firstArgs = [].slice.call(arguments);

  let newFn = function () {
    let newArgs = [].slice.call(arguments);
    return firstFn.apply(this instanceof newFn ? this : thisObj, firstArgs.concat(newArgs));
  }

  const tempFn = function () { };
  tempFn.prototype = this.prototype;
  newFn.prototype = new tempFn();

  return newFn;
}

function myNew() {
  const constructor = [].shift.call(arguments);

  const _this = {};

  Object.setPrototypeOf(_this, constructor.prototype);

  const res = constructor.apply(_this, arguments)

  return typeOf(res) === 'Object' ? res : _this;
}


function instanceOf(target, type) {
  type = type.prototype;

  target = Object.getPrototypeOf(target);

  while (true) {
    if (target === null) return false;
    if (target === type) return true;
    target = Object.getPrototypeOf(target);
  }
}


function deepClone(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;

  const newObj = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      newObj[key] = deepClone(obj[key])

    }
  }

  return newObj;
}

// 防抖 debounce 如果设定时间内一直在操作，则在每次操作之后重置设定时间
function debounce(fn, delay) {
  let t;
  return function () {
    if (t) {
      clearTimeout(t);
    }
    t = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  }
}

function debounce(fn, delay) {
  let t;
  return function () {
    if (t) {
      clearTimeout(t);
    }
    if (!t) {
      fn.apply(this, arguments);
    }
    t = setTimeout(() => {
      t = null;
    }, delay);
  }
}


// 节流 throttle 间隔特定时间内，只会触发一次

function throttle(fn, delay) {
  let begin = 0;
  return function () {
    let current = new Date.now();
    if (current - begin > delay) {
      fn.apply(this, arguments);
      begin = current;
    }
  }
}


function currying(fn) {
  const args = [];
  const newFn = function () {
    if (arguments.length === 0) {
      return fn.apply(this, args);
    } else {
      [].push.apply(args, arguments);
      return newFn;
    }
  }
  return newFn;
}
function add() {
  const args = [].slice.call(arguments);
  return args.reduce(function (a, b) {
    return a + b;
  }, 0)
}




function MyPromise(constructor) {
  const self = this;
  self.status = 'pending';
  self.vlaue = undefined; // resolved
  self.reason = undefined; // rejected

  function resolve(value) {
    if (self.status === 'pending') {
      self.value = value;
      self.status = 'resolved'
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.reason = reason;
      self.status = 'rejected';
    }
  }

  try {
    constructor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function (onFullfilled, onRejected) {
  console.log(onFullfilled)
  let self = this;
  switch (self.status) {
    case "resolved":
      onFullfilled(self.value);
      break;
    case "rejected":
      onRejected(self.reason);
      break;
    default:
  }
}

// let p = new MyPromise(function (resolve, reject) {
//   reject(1)
// })
// p.then(function (e) {
//   console.log(e)
// }, function (e) {
//   console.log(e, 'erroor')
// }).catch(function (e) {
//   console.log(e, 'erroor')
// })

function MyNew() {
  const constructor = [].shift.slice(arguments, 1);
  const _this = {};

  Object.setPrototypeOf(_this, constructor.prototype);

  const res = constructor.apply(_this, arguments);

  return typeOf(res) === 'object' ? res : _this;
}

function instanceOf(traget, type) {
  type = type.prototype;
  target = Object.getPrototypeOf(target);

  while (true) {
    if (target === null) return false;
    if (target === type) return true;
    target = Object.getPrototypeOf(target);
  }
}

Function.prototype.myCall = function (ctx) {
  ctx = ctx ? Object(ctx) : window;
  ctx.originFn = this;

  const args = [];
  for (let i = 0; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }
  const res = eval('ctx.originFn(' + args + ')');
  delete ctx.originFn;
  return res;
}

Function.prototype.myApply = function (ctx, args) {
  ctx = ctx ? Object(ctx) : window;
  ctx.originFn = this;

  // 参数为字符串、数字、bool类型时报错
  if (
    (typeof args === 'string') ||
    (typeof args === 'number') ||
    (typeof args === 'boolean')
  ) {
    throw TypeError('CreateListFromArrayLike called on non-object')
  }

  if (!args || typeOf(args) !== 'Array') {
    const res = ctx.originFn();
    delete ctx.originFn;
    return res;
  }

  const _args = [];
  for (let i = 0; i < args.length; i++) {
    _args.push('arguments[' + i + ']')
  }
  const res = eval('ctx.originFn(' + _args + ')');
  delete ctx.originFn;
  return res;
}

Function.prototype.myBind = function (thisObj) {
  const firstFn = this;
  const firstArgs = [].slice.call(arguments);

  const newFn = function () {
    const newArgs = [].slice.call(arguments);
    return firstFn.apply(this instanceof newFn ? this : thisObj, firstArgs.concat(newArgs));
  }

  const _tempFn = function () { };
  _tempFn.prototype = this.prototype;
  newFn.prototype = new _tempFn();
  return newFn;
}

function debounce(fn, delay) {
  let t;
  return function () {
    if (t) {
      clearTimeout(t);
    }
    t = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  }

}

function debounce(fn, delay) {
  let t;
  return function () {
    if (t) {
      clearTimeout(t);
    }

    if (!t) {
      fn.apply(this, arguments);
    }
    t = setTimeout(() => {
      t = null;
    }, delay);
  }
}

function throttle(fn, delay) {
  let begin;
  return function () {
    let current = Date.now();
    if (current - begin > delay) {
      fn.apply(this, arguments);
    }
    begin = current;
  }
}

function currying(fn) {
  const args = [];
  const newFn = function () {
    if (arguments.length === 0) {
      return fn.apply(this, args);
    } else {
      [].push.apply(args, arguments);
      return newFn;
    }
  }
  return newFn;
}

const tree = {
  value: 1,
  children: [
    {
      value: 2,
      children: [{ value: 4 }, { value: 5 }]
    },
    {
      vlaue: 3,
      children: [
        {
          value: 6,
          children: [{ value: 7 }, { value: 8 }]
        },
        { value: 7 }
      ]
    }
  ]
}