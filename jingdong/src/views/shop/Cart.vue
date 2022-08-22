<template>
  <div
  class="mask"
  v-show="cartShow"
  @click="handleCartShow"
  ></div>
  <div class="cart">
    <div
    class="product"
    v-show="cartShow"
    >
      <div
      v-show="(caculations.all > 0)"
      class="product__header"
      >
        <div
        class="product__header__alll"
        >
          <span
          @click="()=>allCheckProducts(shopId)"
          v-html="caculations.allCartProducts ? '&#xe601;' : '&#xe8bb;'"
          class="product__header__allIcon iconfont"
          ></span>
          <span class="product__header__all">全选</span>
        </div>
        <div
        @click="()=>clearCartProducts(shopId)"
        class="product__header__clear"
        >清空购物车</div>
      </div>
      <template
      v-for="item in productList"
      :key="item._id"
      >
        <div
        class="product__item"
        v-if="item.count > 0"
        >
        <div
        class="product__item__icon iconfont"
        v-html="item.check ? '&#xe601;' : '&#xe8bb;'"
        @click="()=>changeCartItemChecked(shopId, item._id)"
        ></div>
          <img :src="item.imgUrl" alt="">
          <div class="product__item__text">
            <h4>{{item.name}}</h4>
            <div class="price">
              <span class="yen">￥{{item.price}}</span>
              <span class="origin">￥{{item.oldPrice}}</span>
            </div>
            <div class="number">
              <div
              class="number__minus"
              @click="()=>{changeCartItem(shopId, item._id, item, -1)}"
              >-</div>
              <div class="number__num">
                {{ item.count || 0 }}
              </div>
              <div
              class="number__plus"
              @click="()=>{changeCartItem(shopId, item._id, item, 1)}"
              >+</div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="checkk">
      <div class="icon">
      <img
      @click="handleCartShow"
      src="http://www.dell-lee.com/imgs/vue3/basket.png"
      alt="">
      <div class="icon__tag">{{caculations.all}}</div>
      </div>
      <div class="check">
        总计：<span>￥{{caculations.price}}</span>
      </div>
      <router-link :to="{path: `/order/${shopId}`}">
        <div class="car" v-show="caculations.all > 0">去结算</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { commonCartEffect } from '../../effects/cartEffects'

const useCartEffect = (shopId)=>{
  const { changeCartItem, productList, caculations } = commonCartEffect(shopId)
  const store = useStore()
  const cartList = store.state.cartList

    const changeCartItemChecked = (shopId, productId)=>{
      store.commit('changeCartItemChecked', {
        shopId, productId
      })
    }

    const clearCartProducts = (shopId)=>{
      store.commit('clearCartProducts', {
        shopId
      })
    }

    const allCheckProducts = (shopId)=>{
      store.commit('allCheckProducts',{
        shopId
      })
    }

    return {
      productList, clearCartProducts,
      changeCartItem, changeCartItemChecked,
      caculations, cartList, allCheckProducts,
    }
}
export default {
  name: 'CartView',
  setup() {
    // 获取store中的数据
    const route = useRoute()
    const shopId = route.params.id
    const cartShow = ref(false)
    const handleCartShow = ()=>{
      cartShow.value = !cartShow.value
    }

    const { productList, clearCartProducts,
    changeCartItem, changeCartItemChecked,
    caculations, cartList,allCheckProducts, } = useCartEffect(shopId)

    return {
      productList, shopId, clearCartProducts,
      changeCartItem, changeCartItemChecked,
      caculations, cartList, allCheckProducts,
      handleCartShow, cartShow
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.mask {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0,0,0,0.50);
}

.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}

.checkk {
  display: flex;
  height: .49rem;
  box-shadow: 0 -0.01rem .01rem 0 #F1F1F1;
  background: $bgColor;
  a {
    color: $bgColor;
    text-decoration: none;
  }
}

.product {
  flex: 1;
  padding: 0 .18rem 0 .16rem;
  overflow-y: scroll;
  background: $bgColor;
  &__header {
    display: flex;
    line-height: .52rem;
    background: $bgColor;
    border-bottom: .01rem solid #F1F1F1;
    &__alll {
      flex: 1;
      font-size: .14rem;
    }
    span {
      display: inline-block;
    }
    &__allIcon {
      vertical-align: top;
      margin-right: .1rem;
      font-size: .2rem;
      color: $btn-bgColor;
    }
    &__clear {
      font-size: .14rem;
    }
  }
  &__item {
    display: flex;
    padding: .12rem 0;
    border-bottom: .01rem solid $content-bgcolor;
    color: $content-fontcolor;
    &__icon {
      line-height: .46rem;
      margin-right: .14rem;
      font-size: .2rem;
      color: $btn-bgColor;
    }
    img {
      margin-right: .16rem;
      height: .46rem;
      width: .46rem;
    }
    &__text {
      position: relative;
      flex: 1;
      overflow: hidden;
      h4 {
        margin: 0 0 .06rem 0;
        font-size: .14rem;
        line-height: .2rem;
        color: $content-fontcolor;
        @include ellipsis
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
        margin: 0.12rem 0;
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

.icon {
  position: relative;
  width: .84rem;
  img {
    display: block;
    height: .26rem;
    width: .28rem;
    margin: .12rem auto;
  }
  &__tag {
    position: absolute;
    top: .03rem;
    left: .46rem;
    height: .2rem;
    padding: 0 .04rem;
    min-width: .2rem;
    line-height: .2rem;
    text-align: center;
    transform: scale(50%);
    transform-origin: left center;
    border-radius: .1rem;
    background-color: $highlight-fontColor;
    color: $bgColor;
  }
}

.check {
  flex: 1;
  font-size: .12rem;
  margin: .14rem 0;
  color: $content-fontcolor;
  span {
    display: inline-block;
    font-size: .18rem;
    color: $highlight-fontColor;
  }
}

.car {
  line-height: .49rem;
  width: .98rem;
  background: #4FB0F9;
  color: $bgColor;
  text-align: center;
}
</style>

