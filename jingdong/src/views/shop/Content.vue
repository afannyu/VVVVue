<template>
  <div class="content">
    <div class="category">
      <div
      v-for="(item,index) in categoryList"
      :key="index"
      :class="{'category__item': true, 'category__item--active': currentTab === item.tab}"
      @click="()=>handleTabClick(item.tab)"
      >
      {{item.name}}
      </div>
    </div>
    <div class="product">
      <div
      v-for="item in productList"
      :key="item._id"
      class="product__item"
      >
        <img :src="item.imgUrl" alt="">
        <div class="product__item__text">
          <h4>{{item.name}}</h4>
          <p>月售{{item.sales}}件</p>
          <div class="price">
            <span class="yen">￥{{item.price}}</span>
            <span class="origin">￥{{item.oldPrice}}</span>
          </div>
          <div class="number">
            <div
            class="number__minus"
            @click="()=>{changeCart(shopId, item._id, item, -1, shopName)}"
            >-</div>
            <div class="number__num">
              {{ getCartProductData(shopId, item._id) }}
            </div>
            <div
            class="number__plus"
            @click="()=>{changeCart(shopId, item._id, item, 1, shopName)}"
            >+</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from '@vue/reactivity'
import { get } from '@/utils/request'
import { useRoute } from 'vue-router'
import { watchEffect } from '@vue/runtime-core'
import { commonCartEffect } from '../../effects/cartEffects'
import store from '@/store'

const categoryList = [
  {
    name: '全部商品',
    tab: 'all'
  },
  {
    name: '秒杀',
    tab: 'seckill'
  },
  {
    name: '新鲜水果',
    tab: 'fruit'
  }
]

// 与tab切换有关的逻辑
const useTabEffect = ()=>{
  const currentTab = ref(categoryList[0].tab)
  const handleTabClick = (tab)=>{
    currentTab.value = tab
  }
  return {
    currentTab,handleTabClick
  }
}

// 列表内容
const useProductEffect = (currentTab, shopId)=>{
  const data = reactive({productList: []})
  const getProductData = async()=>{
    const result = await get(`/api/shop/${shopId}/products`,{
      tab: currentTab.value
    })
    if(result?.errno === 0 && result?.data?.length) {
      data.productList = result.data
    }
  }
  watchEffect(()=>{
    // 每切换一次tab，需要重新获取一次productData，
    // 使用监听函数更加美观
    getProductData()
  })

  const { productList } = toRefs(data)
  return {
    productList
  }
}

// 购物车
const useCartEffect = ()=>{
  const { cartList, changeCartItem } = commonCartEffect()
  const changeShopName = (shopId,shopName)=>{
    store.commit('changeShopName',{
      shopId,shopName
    })
  }
  const changeCart = (shopId, productId, item, num, shopName)=>{
    changeCartItem(shopId, productId, item, num)
    changeShopName(shopId,shopName)
  }
  const getCartProductData = (shopId, productId)=>{
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }
  return {
    changeCart, cartList, getCartProductData
  }
}


export default {
  name: 'ContentView',
  props: ['shopName'],
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { productList } = useProductEffect(currentTab, shopId)
    const { changeCart, cartList, getCartProductData } = useCartEffect()

    return {
      productList,
      categoryList, getCartProductData,
      currentTab, handleTabClick,
      cartList, shopId, changeCart
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.68rem;
  bottom: .49rem;
}

.category {
  height: 100%;
  width: .76rem;
  overflow-y: scroll;
  background: $search-bgColor;
  border-radius: .02rem;
  &__item {
    line-height: .4rem;
    text-align: center;
    font-size: .14rem;
    color: $content-fontcolor;
    &--active {
      background: $bgColor;
    }
  }
}

.product {
  flex: 1;
  margin: 0 .18rem .1rem .16rem;
  overflow-y: scroll;
  &__item {
    display: flex;
    padding: .12rem 0;
    border-bottom: .01rem solid $content-bgcolor;
    color: $content-fontcolor;
    img {
      margin-right: .16rem;
      height: .68rem;
      width: .68rem;
    }
    &__text {
      position: relative;
      flex: 1;
      overflow: hidden;
      h4 {
        margin: 0;
        font-size: .14rem;
        line-height: .2rem;
        color: $content-fontcolor;
        @include ellipsis
      }
      p {
        margin: .06rem 0;
        line-height: .16rem;
        font-size: .12rem;
        color: $content-fontcolor;
      }
      .price {
        .yen {
          margin-right: .02rem;
          line-height: .2rem;
          font-size: .12rem;
          color: $highlight-fontColor;
        }
        .origin {
          display: inline-block;
          font-size: .12rem;
          transform: scale(.83);
          transform-origin: center;
          text-decoration: line-through;
          color: $light-fontColor;
        }
      }
      .number {
        position: absolute;
        display: flex;
        line-height: .2rem;
        right: 0;
        bottom: 0;
        &__num {
          margin: 0 .1rem;
          font-size: .14rem;
        }
        &__minus,&__plus {
          line-height: .16rem;
          box-sizing: border-box;
          height: .2rem;
          width: .2rem;
          font-size: .18rem;
          text-align: center;
          border-radius: 50%;
        }
        &__minus {
          border: .01rem solid $mid-fontColor;
          color: $mid-fontColor;
        }
        &__plus {
          background: $btn-bgColor;
          color: $bgColor;
        }
      }
    }
  }
}


</style>
