<template>
  <div class="docker">
    <div
    v-for="(item,index) in dockerList" :key="item.icon"
    :class="{'docker__item': true, 'docker__item--active': index === currentIndex}"
    >
    <router-link :to="item.to">
      <div class="iconfont" v-html="item.icon"></div>
      <div class="docker__title">{{item.title}}</div>
    </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DockerView',
  props: ['currentIndex'],
  setup() {
    const dockerList =  [
      {icon: '&#xe639;', title: '首页', to: {name: 'Home'}},
      {icon: '&#xe70b;', title: '购物车', to: {name: 'CartList'}},
      {icon: '&#xe645;', title: '订单', to: {name: 'OrderList'}},
      {icon: '&#xe600;', title: '我的', to: {name: 'Home'}},
    ];
    return {dockerList}
  }
}
</script>


<style lang="scss" scoped>
@import '../style/viriables.scss';

.docker {
  display: flex;
  position: absolute;
  box-sizing: border-box;
  padding: 0 .18rem;
  bottom: 0;
  left: 0;
  width: 100%;
  height: .49rem;
  box-shadow: 0 -0.01rem .01rem 0 $content-bgcolor;
  color: $content-fontcolor;
  &__item {
    flex: 1;
    text-align: center;
    a {
      text-decoration: none;
      color: $content-fontcolor;
    }
    .iconfont {
      font-size: .18rem;
      margin: .04rem 0 .04rem 0;
    }
    &--active {
      a {
        color: #2190d9;
      }
    }
  }
  &__title {
    font-size: .2rem;
    transform: scale(.5, .5);
    transform-origin: center top;
  }
}
</style>
