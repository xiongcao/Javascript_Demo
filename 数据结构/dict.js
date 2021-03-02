// 封装字典结构
function Dictionay() {
  // 字典属性
  this.item = {};

  // 在字典中添加键值对
  Dictionay.prototype.set = function (key, value) {
    this.item[key] = value;
  }

  // 判断字典中是否有某个Key
  Dictionay.prototype.has = function (key) {
    return this.item.hasOwnProperty(key);
  }

  // 从字典中移除元素
  Dictionay.prototype.remove = function (key) {
    // 1.判断字典中是否有这个key
    if (!this.has(key)) return false;

    // 2.从字典中删除key
    delete this.item[key];
    return true;
  }

  Dictionay.prototype.get = function (key) {
    return this.has(key) ? this.item[key] : undefined;
  }

  Dictionay.prototype.gets = function () {
    return Object.keys(this.item);
  }

}