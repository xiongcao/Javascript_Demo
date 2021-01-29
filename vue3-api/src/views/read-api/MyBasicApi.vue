<template>
  <div>
    <p>my-basic-api</p>
    <p>{{ name }} {{ city.name }} {{ city.area.name }}</p>
    <div>
      <select v-model="name">
        <option value="湖北省">湖北省</option>
        <option value="湖南省">湖南省</option>
      </select>
      <select v-model="city.name" @change="changeCity">
        <option value="武汉市">武汉市</option>
        <option value="黄冈市">黄冈市</option>
      </select>
      <select v-model="city.area.name">
        <option value="红安县">红安县</option>
        <option value="麻城市">麻城市</option>
      </select>
    </div>
  </div>
</template>

<script>
import { reactive, readonly, isProxy, isReactive, isReadonly, shallowReactive, toRefs, shallowReadonly } from 'vue';

export default {
  name: 'my-basic-api',
  setup () {
    const state = reactive({
      naem: '张三'
    })
    
    const person = readonly({
      name: '李四'
    })

    const people = readonly(state);

    /***************** isProxy ***************/
    // 检查对象是否是由 reactive 或 readonly 创建的 proxy。
    console.log(isProxy(state), isProxy(person), isProxy(new Proxy({}, {})));
    // true, true, false

    /***************** isReactive ***************/
    // 检查对象是否是 reactive创建的响应式 proxy。
    console.log(isReactive(state), isReactive(person), isReactive(people));
    // true, false, true

    /***************** isReadonly ***************/
    // 检查对象是否是由readonly创建的只读 proxy。
    console.log(isReadonly(state), isReadonly(person), isReadonly(people));
    // false, true, true

    // 如果 proxy 是 readonly 创建的，但还包装了由 reactive 创建的另一个 proxy，它也会返回 true。


    /***************** shallowReactive ***************/
    // 创建一个响应式 proxy，跟踪其自身 property 的响应性，但不执行嵌套对象的深度响应式转换 (暴露原始值)。
    const province = shallowReactive({
      name: '湖北省',
      city: {
        name: '黄冈市',
        area: {
          name: '红安县'
        }
      }
    });

    // 改变状态本身的性质是响应式的
    console.log(isReactive(province)) // true
    // 但是不转换嵌套对象 (v-mode 无法进行双向绑定)
    console.log(isReactive(province.city)) // false
    
    const changeCity = (e) => {
      // 无法 双向绑定（值还是被更改了，但是页面没有渲染）
      province.city.name = e.target.value;
    }


    /***************** shallowReadonly ***************/
    // 创建一个 proxy，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换 (暴露原始值)。
    const animal = shallowReadonly({
      name: '宠物',
      dog: {
        name: '哈士奇',
      },
      cat: {
        name: '英短',
      }
    });

    console.log('animal', isReadonly(animal)) // true
    console.log('animal.dog', isReadonly(animal.dog)) // false
    animal.name = '鸟类'; // 失败
    animal.dog.name = '柴犬'; // 成功
    console.log(animal)


    return {
      changeCity,
      ...toRefs(province)
    }
  }
}
</script>
