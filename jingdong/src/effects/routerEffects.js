import { useRouter } from 'vue-router';

export const useRouterEffect = ()=>{
  const router = useRouter()
  const handleClickBack = ()=>{
    router.back()
  }
  return {
    handleClickBack
  }
}
