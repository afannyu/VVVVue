import { useStore } from 'vuex'
import { computed } from 'vue'

// 与购物车有关的逻辑
export const commonCartEffect = (shopId)=>{
  // 首先将该全局对象取出
  const store = useStore()
  const cartList = store.state.cartList
  const changeCartItem = (shopId, productId, productInfo, num)=>{
    store.commit('changeCartItem',{
      shopId, productId, productInfo, num
    })
  }
  const productList = computed(()=>{
    const productList = cartList[shopId]?.productList || []
    return productList
  })
  const shopName = computed(()=>{
    const shopName = cartList[shopId].shopName || ''
    return shopName
  })
  const caculations = computed(()=>{
    const productList = cartList[shopId]?.productList
    let result = { all: 0, price: 0, allCartProducts: true }
    if(productList) {
      for(let i in productList) {
        const product = productList[i]
        result.all += product.count
        if(product.check) {
          result.price += (product.count * product.price)
        }
        if(!product.check && product.count > 0){
          result.allCartProducts = false
        }
      }
    }
    result.price = result.price.toFixed(2)
    return result
  })
  return {
    changeCartItem, cartList, productList, shopName, caculations
  }
}
