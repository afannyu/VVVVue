<template>
  <div class="toast">{{message}}</div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";

export default {
  name: 'ToastView',
  props: ['message'],
}

export const useToastEffect = ()=>{
  const toastData = reactive({
    show: false,
    toastMsg: ''
  })
  // 通过toRefs返回show, toastMsg
  const {show, toastMsg} = toRefs(toastData)
  const showToast = (msg)=>{
    toastData.show = true
    toastData.toastMsg = msg
    setTimeout(()=>{
      toastData.show = false
      toastData.toastMsg = ''
    },1500)
  }
  return {show, toastMsg,showToast}
}
</script>

<style lang="scss" scoped>
@import '../style/viriables.scss';
.toast {
  position: absolute;
  padding: .09rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, .35);
  border-radius: .05rem;
  color: $bgColor;
}
</style>
