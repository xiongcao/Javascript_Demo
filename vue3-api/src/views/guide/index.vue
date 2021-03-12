<template>
  <div>
    <h1>vue3-guide</h1>

    <p>{{ now }}</p>
    <p>数组元素: {{ list.join(",") }}</p>
    <p>数组长度是否大于3: {{ publishedBookMessage }}</p>
    <!-- <p><button @click="handleChnage">改变数组</button></p> -->
    <p>
      <button @click="handleChnage">访问属性： publishedBookMessage</button>
    </p>

    <br />
    <p>测试事件冒泡</p>
    <div @click="handleClickGrandParent">
      grandParent
      <div @click="handleClickParent">
        parent
        <button data-id="btn" @click.stop.self="handleClickEvent($event)">
          点我
        </button>
      </div>
    </div>

    <br />
    <p>组件上使用v-model</p>
    <custom-input
      class="custom-input"
      v-model="searchText"
      :blog-title="blogTitle"
      v-bind="product"
      :product="product"
      @change-product="handleChangeProduct"
      @change-title="handleChangeTitle"
    />
    {{ searchText }}

    <br />
    <br />
  </div>
</template>

<script>
import CustomInput from "../../components/guide/CustomInput";
import { getCurrentInstance } from "vue";

export default {
  name: "read-api",
  components: {
    CustomInput,
  },
  data() {
    return {
      list: [1, 2, 3],
      searchText: "custom input text",
      blogTitle: "vue指南",
      product: {
        id: 1,
        name: '三橡树',
        brand: '资生堂',
        price: 198.99
      }
    };
  },
  computed: {
    publishedBookMessage() {
      if (this.list.length > 3) {
        return "Yes";
      }
      return "No";
    },
    now() {
      return Date.now();
    },
  },
  provide() {
    return {
      publishedBookMessage: this.publishedBookMessage
    }
  },
  methods: {
    handleChnage() {
      this.list.push(this.list.length + 1);
      console.log(this.publishedBookMessage);
    },
    handleClickEvent(e) {
      // e.target.dataset.id
      console.log(e.target);
    },
    handleClickParent() {
      console.log("点击了父元素");
    },
    handleClickGrandParent() {
      console.log("点击了祖父元素");
    },
    handleChangeTitle(e) {
      this.blogTitle = e;
    },
    handleChangeProduct() {
      console.log('父组件的product: ', this.product)
    }
  },
};
</script>
