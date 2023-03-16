const VTab = {
  mounted(el, binding) {
    const { cIndex, activeClass, className } = binding.value;
    const tabItems = el.getElementsByClassName(className);
    tabItems[cIndex].className += ` ${activeClass}`;
  },
  updated(el, binding) {
    const { cIndex: oldCIndex } = binding.oldValue;
    const { cIndex, activeClass, className } = binding.value;

    const tabItems = el.getElementsByClassName(className);
    tabItems[oldCIndex].className = className;
    tabItems[cIndex].className += ` ${activeClass}`;
  }
}

export default VTab;