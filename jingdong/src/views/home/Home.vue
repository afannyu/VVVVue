<template>
  <div class="wrapper">
    <StaticPartVue />
    <Nearby />
  </div>
  <Docker :currentIndex="0"/>
</template>

<script>
import StaticPartVue from './StaticPart.vue'
import Nearby from './Nearby.vue'
import Docker from '../../components/Docker.vue'

export default {
  name: 'HomeView', //组件名称，用于以后路由跳转
  components: {StaticPartVue,Nearby,Docker}
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  overflow-y: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: .49rem;
  padding: 0 .18rem;
}
</style>
