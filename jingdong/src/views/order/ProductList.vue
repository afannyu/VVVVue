<template>
<div class="products">
  <div class="product">
    <h4>{{shopName}}</h4>
    <template
    v-for="item in productList"
    :key="item._id"
    >
      <div
      v-if="item.count > 0"
      class="product__item"
      >
        <img :src="item.imgUrl" alt="">
        <div class="product__item__text">
          <div class="title">{{item.name}}</div>
          <div class="price">
            <span class="yen">￥{{item.price}} × {{item.count}}</span>
            <span class="origin">{{(item.price * item.count).toFixed(2)}}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</div>
</template>

<script>
import { commonCartEffect  } from '@/effects/cartEffects';
import { useRoute } from 'vue-router';

export default {
  name: 'ProductListView',
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { productList, shopName } = commonCartEffect(shopId);

    return {
      productList, shopName
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.products {
  padding: .18rem;
  margin: .1rem 0 .4rem 0;
}

.product {
  box-sizing: border-box;
  background: $bgColor;
  border-radius: .04rem;
  padding: .16rem;
  h4 {
    margin: 0 0 .04rem 0;
    line-height: .22rem;
    font-size: .14rem;
  }
  &__item {
    display: flex;
    padding: .08rem 0;
    img {
      margin-right: .16rem;
      height: .46rem;
      width: .46rem;
    }
    &__text {
      position: relative;
      flex: 1;
      overflow: hidden;
      .title {
        margin: 0 0 .06rem 0;
        font-size: .14rem;
        line-height: .2rem;
        @include ellipsis
      }
      .price {
        position: relative;
        line-height: .2rem;
        font-size: .12rem;
        .yen {
          margin-right: .02rem;
          color: $highlight-fontColor;
        }
        .origin {
          position: absolute;
          right: 0;
          top: 0;
          display: inline-block;
          color: $content-fontcolor;
        }
      }
    }
  }
}
</style>
