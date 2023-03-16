<!-- <script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template> -->

<!-- CustomInput.vue -->
<script>
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false
}
</script>
<script setup>
import { computed, onMounted, useAttrs } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const arrts = useAttrs();

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

onMounted(() => {
  // console.log(arrts.onClick(), 'arrts')
});

const handleClick = () => {
  alert(1)
}

</script>

<template>
  <div @click="handleClick">
    CustomInput:
    <input v-model="value" />
    <p v-bind="$attrs">
      {{ $attrs }}
    </p>
  </div>
</template>
