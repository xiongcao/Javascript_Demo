export default {
  beforeMount(){
    console.log(222);
  },
  mounted(el, binding) {
    console.log(el, binding);
    const { name } = binding.value
    el.focus();
    el.value = name;
  },
  updated(el, binding) {
   
  },
}