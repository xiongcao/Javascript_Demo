<template>
  <div>
    <p>名称：{{ name }}</p>
    <p>商场：{{ mall.name }}</p>
    <p>品牌：{{ mall.brand.name }}</p>
    <p>产品名称：{{ mall.brand.product.name }}</p>
    <p>产品价格：{{ mall.brand.product.price }}</p>
  </div>
</template>

<script>
import { reactive, toRefs, ref, isReactive, readonly, watchEffect } from 'vue';

export default {
  name: 'my-reactive',
  setup () {
    /***************** reactive ***************/
    // 深度响应式
    const state = reactive({
      name: '购物商场',
      mall: {
        name: 'wushang',
        brand: {
          name: 'SK-II',
          product: {
            name: '娃哈哈',
            price: '199.98'
          }
        }
      }
    })

    // 检查对象是否是 reactive创建的响应式 proxy。
    console.log('state isReactive: ', isReactive(state)) // true
    console.log('{} isReactive: ', isReactive({})) // false


    state.mall.name = '中百超市';
    state.mall.brand.name = 'IPSA';


     // 如果 ref 放入reactive中，并且ref中的数据是Array, Map数据时
    // 那么，值的访问不会自动展开，必须使用 .value 访 问
    const arr = reactive([ref(6)]);
    console.log(arr[0].value)

    const obj = reactive(new Map([['name', ref('dog')]]));
    console.log(obj.get('name').value)

    /***************** readonly ***************/
    const newState = readonly(state);

    state.mall.name = '家乐福'
    console.log(newState.mall.name); // 家乐福

    newState.mall.name = '沃尔玛'; // Write operation failed: computed value is readonly
    console.log(state.mall.name) // 家乐福

    watchEffect(() => {
      console.log('watchEffect', newState.mall.name)
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>
