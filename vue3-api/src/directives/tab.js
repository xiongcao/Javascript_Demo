export default {
  mounted(el, binding) {
    const { className, activeClass, idx } = binding.value;
    
    const tabItemDom = el.getElementsByClassName(className);
    tabItemDom[idx].className += ` ${activeClass}`;
  },
  updated(el, binding) {
    const { idx: oldIdx } = binding.oldValue;

    const { className, activeClass, idx } = binding.value;

    const tabItemDom = el.getElementsByClassName(className);

    tabItemDom[oldIdx].className = className;
    tabItemDom[idx].className += ` ${activeClass}`;
  },
}