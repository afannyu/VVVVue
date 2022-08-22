<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" />
    <div class="wrapper__input">
      <input
        type="text"
        class="wrapper__input__content"
        placeholder="请输入用户名"
        v-model="username"
      />
      <!-- 通过v-model这样的指令，
      将input框的内容与data中的内容双向绑定 -->
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="请输入密码"
        v-model="password"
      />
    </div>
    <div @click="handleLogin" class="wrapper__login-button">登录</div>
    <div @click="handelRegister" class="wrapper__login-link">注册</div>
  </div>
  <Toast
  v-if="show"
  :message="toastMsg"
  />
</template>

<script>
import { useRouter } from "vue-router";
import { reactive, toRefs } from "@vue/reactivity";
import Toast, { useToastEffect } from "../../components/Toast.vue";
import { post } from "../../utils/request";

// 将与登录有关的逻辑摘离出来
const useLoginEffect = (showToast)=>{
  const router = useRouter();
  const data = reactive({
    username: "",
    password: "",
  });
  const {username, password} = toRefs(data)
  const handleLogin = async () => {
    try {
      const result = await post("/api/user/login", {
        username: data.username,
        password: data.password,
      });
      console.log(result)
      if (result?.Error === 0) {
        localStorage.isLogin = true;
        router.push({ name: "Home" });
      } else {
        showToast("登录失败");
      }
    } catch (e) {
      showToast("请求失败");
    }
  };
  return {
    handleLogin,
    username, password
  }
}

// 将与注册有关的逻辑摘离
const useRegisterEffect = ()=>{
  const router = useRouter();
  const handelRegister = () => {
    router.push({ name: "Register" });
  };
  return {
    handelRegister
  }
}

export default {
  name: "LoginView",
  setup() {
    // 如此下来，setup函数的职责就是告诉我们：代码执行的一个流程是咋样的
    const { show, toastMsg, showToast } = useToastEffect()
    // 执行函数，获取到该函数的返回值
    const { handleLogin, username, password } = useLoginEffect(showToast)
    const { handelRegister } = useRegisterEffect()

    return {
      handleLogin,
      handelRegister,
      username, password,
      show, toastMsg,
      showToast,
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
    margin: 0 auto 0.4rem auto;
    height: 0.66rem;
    width: 0.66rem;
  }
  &__input {
    margin: 0 0.4rem 0.16rem 0.4rem;
    padding: 0 0.16rem;
    height: 0.48rem;
    background: #f9f9f9;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    border-radius: .06rem;
    &__content {
      width: 100%;
      border: none;
      background: none;
      outline: none;
      line-height: 0.48rem;
      color: $content-notice-fontcolor;
      font-size: 0.16rem;
      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }
  &__login-button {
    text-align: center;
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    line-height: 0.48rem;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: .04rem;
    font-size: 0.16rem;
    background: $btn-bgColor;
    color: $bgColor;
  }
  &__login-link {
    font-size: 0.14rem;
    text-align: center;
    color: $content-notice-fontcolor;
  }
}
</style>
