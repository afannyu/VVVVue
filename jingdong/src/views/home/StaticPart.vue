<template>
  <div class="position">
      <span class="iconfont">&#xe63f;</span>
      北京理工大学国防科技园2号楼10层
      <span class="iconfont position__notice">&#xe8c0;</span>
  </div>
  <div class="search">
    <span class="iconfont">&#xe611;</span>
    <span class="search__text">山姆会员商店优惠商品</span>
  </div>
  <div class="banner">
    <img src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="">
  </div>
  <div class="icons">
    <div
    v-for="item in StaticList"
    :key="item.imgName"
    class="icons__item">
      <img
      :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"
      alt="">
      <p>{{item.text}}</p>
    </div>
  </div>
  <div class="flag"></div>
</template>


<script>
export default {
  name: 'StaticPartView',
  setup() {
    const StaticList = [
      {imgName: '超市', text: '超市便利'},
      {imgName: '菜市场', text: '菜市场'},
      {imgName: '水果店', text: '水果店'},
      {imgName: '鲜花', text: '鲜花绿植'},
      {imgName: '医药健康', text: '医药健康'},
      {imgName: '家居', text: '家具时尚'},
      {imgName: '蛋糕', text: '烘焙蛋糕'},
      {imgName: '签到', text: '签到'},
      {imgName: '大牌免运', text: '大牌免运'},
      {imgName: '红包', text: '红包套餐'},
    ]
    return{StaticList}
  }
}
</script>


<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.position {
  position: relative;
  font-size: .16rem;
  padding: .16rem .23rem .16rem 0;
  line-height: .22rem;
  color: $content-fontcolor;
  @include ellipsis;
  .iconfont {
    position: relative;
    font-size: .2rem;
    top: .012rem;
  }
  .position__notice {
    position: absolute;
    right: 0;
    top: .171rem;
  }
}

.search {
  line-height: .32rem;
  background: $search-bgColor;
  border-radius: .16rem;
  color: $search-fontColor;
  margin-bottom: .12rem;
  .iconfont {
    position: relative;
    display: inline-block;
    font-size: .16rem;
    padding: 0 .07rem 0 .1rem;
    top: .01rem;
  }
  &__text {
    display: inline-block;
    font-size: .13rem;
  }
}

.banner {
  @include doudong;
  padding-bottom: 25.4%;
  margin-bottom: .16rem;
  img {
    width: 100%;
  }
}

.icons {
  display: flex;
  flex-wrap: wrap;
  color: $content-fontcolor;
  &__item {
    width: 20%;
    img {
      display: block;
      margin: 0 auto;
      width: .4rem;
      height: .4rem;
    }
    p {
      margin: .06rem 0 .16rem 0;
      font-size: .12rem;
      text-align: center;
    }
  }
}

.flag {
  height: .1rem;
  background-color: $content-bgcolor;
  margin: 0 -.19rem;
}
</style>
