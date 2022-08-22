<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" />
    <div class="wrapper__input">
      <input v-model="username" type="text" placeholder="请输入用户名" />
    </div>
    <div class="wrapper__input">
      <input v-model="password" type="password" placeholder="请输入密码" />
    </div>
    <div class="wrapper__input">
      <input v-model="password2" type="password" placeholder="确认密码" />
    </div>
    <div @click="handleRegister" class="wrapper__register-button">注册</div>
    <div class="wrapper__register-link" @click="handleHave">已有账号去登录</div>
  </div>
  <Toast v-if="show" :message="toastMsg" />
</template>

<script>
import { reactive,toRefs } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { post } from "@/utils/request";
import Toast, { useToastEffect } from "@/components/Toast.vue";

// 将注册的逻辑摘离出来
const useRegisterEffect = (showToast)=>{
  const router = useRouter();
  const data = reactive({
    username: "",
    password: "",
    password2: "",
  });
  const {username, password, password2} = toRefs(data)
  const handleRegister = async () => {
    try {
      const result = await post("/api/user/register", {
        username: data.username,
        password: data.password,
        password2: data.password2,
      });
      if (result?.Error === 0) {
        localStorage.isLogin = true;
        router.push({ name: "Home" });
      } else {
        showToast("注册失败");
      }
    } catch (e) {
      showToast("请求失败");
    }
  };
  return {
    handleRegister,
    username, password, password2
  }
}

const useLoginEffect = ()=>{
  const router = useRouter();
  const handleHave = () => {
    router.push({ name: "Login" });
  };
  return {
    handleHave
  }
}
export default {
  name: "RegisterView",
  setup() {
    const { show, toastMsg, showToast } = useToastEffect();
    const { handleRegister, username, password, password2 } = useRegisterEffect(showToast)
    const { handleHave } = useLoginEffect()

    return {
      handleHave,
      username, password, password2,
      handleRegister,
      show, toastMsg,
    };
  },
  components: { Toast },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";

.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  img {
    display: block;
    margin: 0 auto;
    margin-bottom: 0.4rem;
    height: 0.66rem;
    width: 0.66rem;
  }
  &__input {
    margin: 0 0.4rem 0.16rem 0.4rem;
    padding: 0 0.16rem;
    height: 0.48rem;
    background: #f9f9f9;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;
    color: $content-notice-fontcolor;
    input {
      width: 100%;
      line-height: 0.48rem;
      border: none;
      background: none;
      outline: none;
      font-size: 0.16rem;
      ::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }
  &__register-button {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    line-height: 0.48rem;
    text-align: center;
    font-size: 0.16rem;
    background: $btn-bgColor;
    color: $bgColor;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: .04rem;
  }
  &__register-link {
    text-align: center;
    font-size: 0.14rem;
    color: $content-notice-fontcolor;
  }
}
</style>

