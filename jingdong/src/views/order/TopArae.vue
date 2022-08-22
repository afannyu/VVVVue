<template>
<div class="top">
  <div class="top__order">
    <div
    @click="handleClickBack"
    class="iconfont top__order__icon"
    >&#xe710;</div>
    确认订单
  </div>
  <div class="top__receiver">
    <h4 class="top__receiver__title">收货地址</h4>
    <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
    <div class="top__receiver__icon iconfont">&#xe710;</div>
    <div class="top__receiver__info">
      <span class="info">瑶妹（先生）</span>
      <span class="phone">11722648122</span>
    </div>
  </div>
</div>
</template>

<script>
import { useRouterEffect } from '../../effects/routerEffects'

export default {
  name: 'TopAreaView',
  setup() {
    const { handleClickBack } = useRouterEffect()

    return {
      handleClickBack
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../../style/viriables.scss';

.top {
  padding: .21rem .18rem;
  box-sizing: border-box;
  height: 1.59rem;
  background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
  &__order {
    position: relative;
    line-height: .32rem;
    color: $bgColor;
    font-size: .16rem;
    text-align: center;
    &__icon {
      position: absolute;
      top: 0;
      left: 0;
      font-size: .32rem;
    }
  }
  &__receiver {
    position: relative;
    margin: .14rem 0 .16rem 0;
    border-radius: .04rem;
    background: $bgColor;
    height: 1.11rem;
    box-sizing: border-box;
    padding: .16rem;
    &__title {
      margin: 0;
      line-height: .22rem;
      font-size: .16rem;
    }
    &__address {
      margin: .1rem 0 .06rem 0;
      line-height: .2rem;
      font-size: .14rem;
    }
    &__icon {
      position: absolute;
      right: .16rem;
      line-height: .22rem;
      font-size: .22rem;
      top: .46rem;
      transform: rotate(180deg);
    }
    &__info {
      color: $mid-fontColor;
      line-height: .17rem;
      font-size: .12rem;
    }
  }
}
</style>
