<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div
      v-for="(item, index) of list"
      :key="index"
      class="order"
      >
        <div class="order__title">
          {{item.shopName}}
          <span v-html="item.isCanceled ? '已下单' : '已取消'"></span>
        </div>
        <div class="order__content">
          <template
          v-for="(innerItem, innerIndex) of item.products"
          :key="innerIndex"
          >
            <div
            v-if="innerIndex <= 3"
            class="order__content__imgs"
            >
              <img :src="innerItem.product.imgUrl" alt="">
            </div>
          </template>
          <div class="order__content__info">
            <div class="price">¥{{item.totalPrice}}</div>
            <div class="all">共{{item.totalCount}}件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2"/>
</template>

<script>
import { get } from '@/utils/request'
import Docker from '../../components/Docker.vue'
import { reactive, toRefs } from '@vue/reactivity'

const useOrderEffect = ()=>{
  const data = reactive({list:[]})
  const getOrderList = async ()=>{
    const result = await get('/api/order')
    if( result?.data?.length && result?.errno === 0){
      const orderList = result.data
      orderList.forEach((order)=>{
        const products = order.products || []
        let totalPrice = 0
        let totalCount = 0
        products.forEach((productItem)=>{
          totalPrice = ( productItem?.orderSales * productItem?.product?.price)
          totalCount += productItem?.orderSales || 0
        })
        order.totalCount = totalCount
        order.totalPrice = totalPrice
      })
      data.list = result.data
    }
  }
  getOrderList()
  const { list } = toRefs(data)
  return {
    list
  }
}

export default {
  name: 'OrderListView',
  components: { Docker },
  setup() {
    const { list } = useOrderEffect()
    console.log(list)
    return {
      list
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.wrapper {
  position: absolute;
  overflow-y: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: .49rem;
  background: #eee;
}

.title {
  font-size: .16rem;
  line-height: .46rem;
  text-align: center;
  color: $content-fontcolor;
  background: $bgColor;
}

.order {
  margin: .12rem .18rem;
  padding: .16rem;
  background: $bgColor;
  &__title {
    margin-bottom: .16rem;
    font-size: .16rem;
    line-height: .22rem;
    color: $content-fontcolor;
    span {
      float: right;
      font-size: .14rem;
      color: $light-fontColor;
      text-align: right;
    }
  }
  &__content {
    display: flex;
    position: relative;
    &__imgs {
    display: flex;
    img {
      height: .4rem;
      width: .4rem;
      margin-right: .12rem;
      }
    }
    &__info {
      position: absolute;
      right: 0;
      text-align: right;
      .price {
        line-height: .2rem;
        font-size: .14rem;
        color: $highlight-fontColor;
      }
      .all {
        margin-top: .02rem;
        line-height: .14rem;
        font-size: .12rem;
        color: $content-fontcolor;
      }
    }
  }
}
</style>

