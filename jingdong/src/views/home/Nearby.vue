<template>
  <div class="nearby">
    <h3>附近店铺</h3>
    <router-link
    :to="`/Shop/${item._id}`"
    v-for="item in nearbyList"
    :key="item._id"
    >
    <ShopInfo
    :item="item"
    />
    </router-link>
  </div>
</template>

<script>
import { get } from "@/utils/request";
import { ref } from "@vue/reactivity";
import ShopInfo from '../../components/ShopInfo'

const useNearbyListEffect = ()=>{
  const nearbyList = ref([]);
  const getNearbyList = async () => {
    try {
      const result = await get("/api/shop/hot-list")
      if(result?.errno === 0 && result?.data?.length) {
        nearbyList.value = result.data
      }
    } catch (e) {
      alert("十年");
    }
  };
  return {
    getNearbyList,nearbyList
  }
}

export default {
  name: "NearbyView",
  components: {ShopInfo},
  setup() {
    const { getNearbyList,nearbyList } = useNearbyListEffect()
    getNearbyList()
    return {
      nearbyList,getNearbyList
    };
  },
};
</script>


<style lang="scss" scoped>
@import "../../style/viriables.scss";

.nearby {
  padding-bottom: 0.1rem;
  color: $content-fontcolor;
  h3 {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    font-weight: normal;
  }
  a {
    text-decoration: none;
    color: $content-fontcolor;
  }
}
</style>
