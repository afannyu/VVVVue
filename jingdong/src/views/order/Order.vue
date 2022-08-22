<template>
<div class="wrapper">
  <TopArae />
  <ProductList />
</div>
<Bottom />

</template>

<script>
import TopArae from './TopArae.vue';
import ProductList from './ProductList.vue';
import Bottom from './Bottom.vue';

export default {
    name: "OrderView",
    components: { TopArae, ProductList, Bottom }
}
</script>

<style lang="scss" scoped>

.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: #eee;
  overflow-y: scroll;
}

</style>
