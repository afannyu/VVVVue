<template>
  <div class="shop">
    <img :src="item.imgUrl" alt="" />
    <div 
    :class="{'shop__content': true, 'shop__content--bordered': hideBorder ? false : true}"
    >
      <div class="shop__content__title">{{ item.name }}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tag">月售{{ item.sales }}</span>
        <span class="shop__content__tag">起送￥{{ item.expressLimit }}</span>
        <span class="shop__content__tag">基础运费￥{{ item.expressPrice }}</span>
      </div>
      <p class="shop__content__highlight">{{ item.slogan }}</p>
    </div>
  </div>
</template>


<script>
export default {
  name: "ShopInfoView",
  props: ['item','hideBorder']
};
</script>


<style lang="scss" scoped>
@import "../style/viriables.scss";

.shop {
  display: flex;
  padding-top: 0.12rem;
  img {
    margin-right: 0.16rem;
    height: 0.56rem;
    width: 0.56rem;
  }
  &__content {
    flex: 1;
    &--bordered {
      border-bottom: 0.01rem solid $content-bgcolor;
    }
    &__title {
      line-height: 0.22rem;
      font-size: 0.16rem;
    }
    &__tags {
      margin: 0.08rem 0;
      font-size: 0.13rem;
    }
    &__tag {
      margin-right: 0.16rem;
    }
    &__highlight {
      margin: 0.08rem 0 0.12rem 0;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: $highlight-fontColor;
    }
  }
}
</style>