import Vuex from 'vuex'

const setLocalCartList = (state)=>{
  const {cartList} = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalCartList = ()=>{
  // cartList的数据结构：{ shopId: { shopName:'', productList: { productId } }}
  try {
    return JSON.parse(localStorage.cartList);
  } catch(e) {
    return {}
  }
}
export default Vuex.createStore({
  state: {
    cartList: getLocalCartList()
  },
  getters: {
  },
  mutations: {
    // 两个参数，一个是store中的数据state，
    // 另一个是传过来的数据，用payload表示
    changeCartItem(state, payload) {
      // 拿到state，payload之后，
      // 就需要结合之前的数据结构往里面添加内容
      const { shopId, productId, productInfo, num } = payload
      let shopInfo = state.cartList[shopId]
      if(!shopInfo) {
        shopInfo = { shopName: '', productList: {} }
      }
      let product = shopInfo.productList[productId]
      if(!product) {
        product = productInfo;
        product.count = 0
      }
      product.count = product.count + num
      // 只要往购物车中加东西了，商品选中状态就为true
      if(payload.num > 0) { product.check = true}
      if(product.count < 0) { product.count = 0}
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo

      setLocalCartList(state)
    },
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      let shopInfo = state.cartList[shopId]
      if(!shopInfo) {
        shopInfo = { shopName: '', productList: {}}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo

      setLocalCartList(state)
    },
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload
      let product = state.cartList[shopId].productList[productId]
      product.check = !product.check

      setLocalCartList(state)
    },
    clearCartProducts(state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}

      setLocalCartList(state)
    },
    allCheckProducts(state,payload) {
      const { shopId } = payload
      const productList = state.cartList[shopId].productList
      for(let i in productList) {
        let product = productList[i]
        if(!product.check){
          product.check = true
        }
      }

      setLocalCartList(state)
    },
  },
  actions: {
  },
  modules: {
  }
})
