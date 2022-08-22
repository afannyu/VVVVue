<template>
<div class="order">
  <div class="order__price">实付金额：<b>￥{{ caculations.price}}</b></div>
  <div
  @click="handleOrderClick"
  class="order__order"
  >提交订单</div>
</div>
<div class="mask" v-show="showBtn">
  <div class="mask__content">
    <h3>确认要离开收银台？</h3>
    <div class="mask__content__desc">请尽快完成支付，否则将被取消</div>
    <div class="mask__content__btns">
      <div
      @click="()=>handleComfirmClick(true)"
      class="mask__content__btn"
      >取消订单</div>
      <div
      @click="()=>handleComfirmClick(false)"
      class="mask__content__btn"
      >确认支付</div>
    </div>
  </div>
</div>
</template>

<script>
import { useRoute } from 'vue-router';
import { commonCartEffect  } from '@/effects/cartEffects';
import { ref } from '@vue/reactivity';
import { post } from '@/utils/request';
import router from '@/router';
import { useStore } from 'vuex';

const useClickEffect = (shopId, shopName, productList)=>{
  const store = useStore()
  const showBtn = ref(false)
  const handleOrderClick = ()=>{
    showBtn.value = !showBtn.value
  }

  const handleComfirmClick = async(isCanceled)=>{
    // 点击确认支付，向接口发送数据，满足接口所需要的数据结构
    // 假如成功的话，就跳转页面
    const products = []
    for(let i in productList.value) {
      let product = productList.value[i]
      products.push({
        id: parseInt(product._id, 10),
        num: product.count
      })
      console.log(product)
    }
    try {
      const result = await post('/api/order',{
        addressId: 1,
        shopId: parseInt(shopId, 10),
        shopName: shopName.value,
        isCanceled: isCanceled,
        products: products
      })
      // console.log(result)
      if(result?.errno === 0) {
        store.commit('clearCartProducts',{
          shopId
        })
        router.push({name: 'OrderList'})
      }
    }catch(e){
      console.log('请求失败')
    }
  }
  return {
     handleComfirmClick,
     showBtn, handleOrderClick
  }
}
export default {
  name: 'BottomView',
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { caculations, shopName, productList } = commonCartEffect(shopId);
    const { handleComfirmClick, showBtn, handleOrderClick } = useClickEffect(shopId, shopName, productList)
    return {
        caculations,
        handleComfirmClick, showBtn,
        handleOrderClick
    };
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.order {
  position: absolute;
  display: flex;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: .49rem;
  height: .49rem;
  background: $bgColor;
  &__price {
    flex: 1;
    line-height: .49rem;
    font-size: .14rem;
    text-indent: .24rem;
    color: $content-fontcolor;
  }
  &__order {
    width: .98rem;
    background: $btn-bgColor;
    color: $bgColor;
    font-size: .14rem;
    text-align: center;
  }
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 1;
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: $bgColor;
    height: 1.52rem;
    width: 2.97rem;
    border-radius: .04rem;
    text-align: center;
    h3 {
      margin: .24rem auto 0 auto;
      line-height: .25rem;
      font-size: .18rem;
    }
    &__desc {
      margin: .08rem auto .19rem auto;
      line-height: .2rem;
      font-size: .14rem;
      color: $mid-fontColor;
    }
    &__btns {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__btn {
      height: .32rem;
      width: .8rem;
      line-height: .31rem;
      font-size: .14rem;
      text-align: center;
      border-radius: .16rem;
    }
    &__btn:nth-child(1) {
      border: .01rem solid #4FB0F9;
      color: $btn-bgColor;
    }
    &__btn:nth-child(2) {
      margin-left: .24rem;
      background: #4FB0F9;
      border: .01rem solid #4FB0F9;
      color: white;
    }
  }
}
</style>
