<template>
  <input v-model="inputValue"/>
  <button @click="handleClick">增加</button>
  <ul>
    <list-item 
    v-for="item of list" 
    :key="item"
    :msg="item" 
    />
  </ul>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import ListItem from './components/ListItem.vue'

export default {
  name: 'App',
  components: {
    ListItem
  },
  setup() {
    const inputValue = ref('')
    let list = reactive([])
    const handleClick = ()=>{
      list.push(inputValue.value)
      inputValue.value = ''
    }
    return {
      inputValue,list,
      handleClick
    }
  }
}
</script>

<style>
  button {
    margin-left: 20px;
    color: red;
  }
</style>
