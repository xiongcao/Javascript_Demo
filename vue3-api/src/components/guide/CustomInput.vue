<template>
  <div class="cus-int">
    <h3>自定义属性、事件的命名测试</h3>
    {{ blogTitle }}
    <button @click="$emit('change-title', 'vue 的组件基础')">
      改变父组件的blogTitle = 'vue 的组件基础'
    </button>

    <h3>props 对象参数测试</h3>
    <p>id: {{ id }}</p>
    <p>name: {{ name }}</p>
    <p>price: {{ price }}</p>

    <h3>props 子组件改变父组件对象参数测试</h3>
    <p>id: {{ commodity.id }}</p>
    <p>name: {{ commodity.name }}</p>
    <p>price: {{ commodity.price }}</p>
    <button @click="handleProduct">改变product对象</button>

    <h3>组件上使用v-model测试</h3>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <br/>
    <h3>通过provide/inject 传入的数据: {{ publishedBookMessage }}</h3>
  </div>
</template>

<script>
export default {
  name: "custom-input",
  // props: ["modelValue", "blog-title", "id", "name", "price", "product"],
  props: {
    modelValue: String,
    blogTitle: String,
    id: Number,
    name: String,
    brand: {
      type: String,
      required: true,
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['资生堂', '优趣汇'].indexOf(value) !== -1
      }
    },
    price: Number,
    product: Object
  },
  emits: ['change-product'],
  data() {
    return {
      commodity: this.product
    }
  },
  inject: ['publishedBookMessage'],
  methods: {
    handleProduct() {
      // this.product = Object.assign({}, this.product, {
      //   id: 2,
      //   name: "小林制药",
      //   brand: "优趣汇",
      //   price: 98.99,
      // });
      this.commodity = {
        id: 2,
        name: "小林制药",
        brand: "优趣汇",
        price: 98.99,
      }
      this.$emit('change-product')
    },
  },
  mounted(){
    console.log(this.$attrs)
  }
};
</script>
