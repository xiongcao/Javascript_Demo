<template>
  <div>23e
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'my-computed',
  components: {
  },
  setup () {
    /***************** computed ***************/
    // 使用 getter 函数，并为从 getter 返回的值返回一个不变的响应式 ref 对象。
    const count = ref(1)
    const plusOne = computed(() => count.value + 1)
    console.log(plusOne.value) // 2
    plusOne.value++ // Write operation failed: computed value is readonly

    // 可以使用具有 get 和 set 函数的对象来创建可写的 ref 对象。
    const plusTwo = computed({
      get: () => count.value + 2,
      set: val => {
        count.value = val - 1
      }
    })

    plusTwo.value = 1
    console.log(count.value) // 0

    return {
    }
  }
}
</script>
