import axios from "axios";

// 生成一个axios实例，
// 在post与get方法中，可以用该实例中的post与get请求数据
const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/4a01d3c1e70b246641548e2cc9e32657/jingdong',
  timeout: 10000
})

export const post = (url, data = {}) => {
  return new Promise((resolve,reject)=>{
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response)=>{
      resolve(response.data)
    }),err =>{
      reject(err)
    }
  })
}

export const get = (url, params = {}) => {
  return new Promise((resolve,reject)=>{
    instance.get(url, { params }).then((response)=>{
      resolve(response.data)
    }),err =>{
      reject(err)
    }
  })
}
