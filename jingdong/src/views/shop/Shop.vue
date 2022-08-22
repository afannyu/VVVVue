<template>
  <div class="wrapper">
    <div class="search">
      <div
      @click="handleClickBack"
      class="search__icon iconfont"
      >
      &#xe710;
      </div>
      <div class="search__content">
        <span class="iconfont">&#xe611;</span>
        <input type="text" placeholder="请输入商品名称搜索" />
      </div>
    </div>
    <ShopInfo
    :item="item"
    :hideBorder="true"
    v-show="item.imgUrl"
    />
  </div>
  <Content :shopName="item.name"/>
  <Cart />
</template>


<script>
import ShopInfo from "@/components/ShopInfo";
import Cart from '../shop/Cart.vue'
import { useRoute } from 'vue-router';
import { reactive, toRefs } from '@vue/reactivity';
import { get } from '@/utils/request';
import Content from './Content.vue';
import { useRouterEffect } from "@/effects/routerEffects";

const useGetItemEffect = ()=>{
  const route = useRoute()
  const data = reactive({item: {}})
  const getItem = async ()=>{
    const result = await get(`/api/shop/${route.params.id}`)
    if(result?.errno === 0 && result?.data){
      data.item = result.data[`${route.params.id - 1}`]
    }
    console.log(result)
  }
  const { item } = toRefs(data)
  return {
    getItem,item
  }
}

export default {
  name: "ShopView",
  components: { ShopInfo, Content, Cart },
  setup() {
    const { getItem,item } = useGetItemEffect()
    const { handleClickBack } = useRouterEffect()

    getItem()
    return {
      item, getItem, handleClickBack
    };
  },
};
</script>


<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper {
  padding: 0 0.18rem;
}
.search {
  display: flex;
  margin: 0.2rem 0 0.1rem 0;
  line-height: 0.32rem;
  &__icon {
    margin-right: 0.11rem;
    font-size: 0.32rem;
    color: #b6b6b6;
  }
  &__content {
    display: flex;
    flex: 1;
    padding: 0 0.16rem;
    background: $search-bgColor;
    border-radius: .16rem;
    input {
      display: block;
      border: none;
      background: none;
      outline: none;
      height: 0.32rem;
      width: 100%;
      ::placeholder {
        font-size: .14rem;
        color: $content-fontcolor;
        line-height: .16rem;
      }
    }
    span {
      font-size: 0.21rem;
      color: $search-fontColor;
      margin-right: 0.1rem;
    }
  }
}
</style>
