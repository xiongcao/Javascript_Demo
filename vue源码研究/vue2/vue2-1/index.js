
/**
 * 数据属性：configurable, enumerable, writable, value
 * 访问器属性：configurable, enumerable, get, set
 */

class Compute {
  plus(a, b) {
    return a + b;
  }
  minus(a, b) {
    return a - b;
  }
  mul(a, b) {
    return a * b;
  }
  div(a, b) {
    return a / b;
  }
}


class Calculator extends Compute {
  constructor() {
    super();

    this.oFirstInput = document.getElementById('firstNumber');
    this.oSecondInput = document.getElementById('secondNumber');

    this.oBtnGroup = document.getElementsByClassName('btn-group')[0];
    this.oBtnItems = document.getElementsByClassName('btn-comput');

    this.oResult = document.getElementsByClassName('result')[0];

    this.data = this.defineData();

    this.btnIdx = 0;
  }

  init() {
    this.bindEvent();
  }

  bindEvent() {
    this.oBtnGroup.addEventListener('click', this.onFieldBtnClick.bind(this), false)
    this.oFirstInput.addEventListener('input', this.onChangNumberInput.bind(this), false)
    this.oSecondInput.addEventListener('input', this.onChangNumberInput.bind(this), false)
  }

  onFieldBtnClick(ev) {
    const e = ev || window.event,
          tar = e.target || e.srcElement,
          className = tar.className;
    className.includes('btn-comput') && this.fieldUpdate(tar);
  }

  fieldUpdate(target) {
    this.oBtnItems[this.btnIdx].className = 'btn-comput';
    this.btnIdx = [].indexOf.call(this.oBtnItems, target);
    target.className += ' active';
    this.data.field = target.dataset.field;
  }

  onChangNumberInput(ev) {
    const e = ev || window.event,
          tar = e.target || e.srcElement,
          id = tar.id,
          val = Number(tar.value.replace(/\s+/g, '')) || 0;
    switch(id) {
      case 'firstNumber':
        this.data.firstNumber = val;
        break;
      case 'secondNumber':
        this.data.secondNumber = val;
        break;
      default:
        break;
    }
  }

  defineData() {
    let _obj = {},
        firstNumber = 0,
        secondNumber = 0,
        field = 'plus',
        that = this;

    Object.defineProperties(_obj, {
      firstNumber: {
        get() {
          return firstNumber;
        },
        set(newVal) {
          firstNumber = newVal;
          console.log(`this value "firstNumber" has been changed.[${newVal}]`);
        }
      },
      secondNumber: {
        get() {
          return secondNumber;
        },
        set(newVal) {
          secondNumber = newVal;
          console.log(`this value "secondNumber" has been changed.[${newVal}]`);
        }
      },
      field: {
        get() {
          return field;
        },
        set(newVal) {
          field = newVal;
          that.computeResult(firstNumber, secondNumber, field);
          console.log(`this value "field" has been changed.[${newVal}]`);
        }
      }
    })

    return _obj;

  }

  computeResult(firstNumber, secondNumber, field) {
    this.oResult.innerHTML = this[field](firstNumber, secondNumber)
  }

}


new Calculator().init();