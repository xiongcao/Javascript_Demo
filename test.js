// const p1 = Promise.resolve(1)
// const p2 = Promise.resolve(2)
// const p3 = Promise.resolve(3)

// Promise.all([p1, p3, p2]).then(res => {
//   console.log(res);
// })

// console.log(void (1 + 1));

// for (var i = 1; i <= 5; i++) { setTimeout(function timer() { console.log(i); }, i * 1000); }

class ReactComponent {

  // 挂载阶段
  componentWillMount() {}
  render();
  componentDidMount() {};
  
  /** 更新阶段  */
  // props更新
  componentWillReceiveProps(nextProps, nextState){

  };

  // props, state 更新
  shouldComponentUpdate(nextPorps, nextState){
    return false; // 不更新，不可调用setState
  }

  // props 更新
  componentWillUpdate(nextProps, nextSate) {
    // dom更新之前，不可调用setState
  }

  render(){}

  // props, state 更新
  componentDidUpdate(prevProps, prevState){
    // 已更新
  }

  // 卸载阶段
  componentWillUnmount(){}

  // 在 React 16 中官方已经建议删除以下三个方法，非要使用必须加前缀：UNSAVE_ 。
  componentWillMount() {}
  componentWillReceiveProps() {};
  componentWillUpdate() {};

  // 两个新的，取代上面三个删除的
  static getDerivedStateFromProps(nextPorps, nextState){
    // 在组件实例化、接收到新的 props 、组件状态更新时会被调用
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 用于替代旧的生命周期中的 componentWillUpdate。
  }


}


