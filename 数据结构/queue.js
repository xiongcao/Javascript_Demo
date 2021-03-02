function Queue() {
  this.items = [];

  // 向队列尾部天机一个或多个新的项
  Queue.prototype.enqueue = function (el) {
    this.items.push(el);
  }

  // 移出队列的第一项（排在队列最前面的）项，并返回被移出的元素
  Queue.prototype.dequeue = function () {
    return this.items.shift();
  }

  // 返回队列中第一个元素——最先被添加，也将是最先被移除的元素。
  // 队列不做任何变动，不移除元素，只返回元素
  Queue.prototype.front = function () {
    return this.items[0]
  }

  // 如果队列中不包含任何元素，返回true，否则返回false
  Queue.prototype.isEmpty = function () {
    return this.items.length === 0
  }

  // 返回队列包含的元素个数，与数组的length属性类似
  Queue.prototype.size = function () {
    return this.items.length;
  }

  // 将队列中的内容，转换成字符串形式
  Queue.prototype.toString = function () {
    return this.items.toString();
  }
}