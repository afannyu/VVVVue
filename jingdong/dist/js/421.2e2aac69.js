"use strict";(self["webpackChunkjingdong"]=self["webpackChunkjingdong"]||[]).push([[421],{750:function(t,e,n){n.d(e,{Z:function(){return _}});var r=n(6252),o=n(3577);const i={class:"docker"},c=["innerHTML"],s={class:"docker__title"};function a(t,e,n,a,l,d){const u=(0,r.up)("router-link");return(0,r.wg)(),(0,r.iD)("div",i,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(a.dockerList,((t,e)=>((0,r.wg)(),(0,r.iD)("div",{key:t.icon,class:(0,o.C_)({docker__item:!0,"docker__item--active":e===n.currentIndex})},[(0,r.Wm)(u,{to:t.to},{default:(0,r.w5)((()=>[(0,r._)("div",{class:"iconfont",innerHTML:t.icon},null,8,c),(0,r._)("div",s,(0,o.zw)(t.title),1)])),_:2},1032,["to"])],2)))),128))])}var l={name:"DockerView",props:["currentIndex"],setup(){const t=[{icon:"&#xe639;",title:"首页",to:{name:"Home"}},{icon:"&#xe70b;",title:"购物车",to:{name:"CartList"}},{icon:"&#xe645;",title:"订单",to:{name:"OrderList"}},{icon:"&#xe600;",title:"我的",to:{name:"Home"}}];return{dockerList:t}}},d=n(3744);const u=(0,d.Z)(l,[["render",a],["__scopeId","data-v-7beffcae"]]);var _=u},421:function(t,e,n){n.r(e),n.d(e,{default:function(){return x}});var r=n(6252),o=n(3577);const i=t=>((0,r.dD)("data-v-072d094b"),t=t(),(0,r.Cn)(),t),c={class:"wrapper"},s=i((()=>(0,r._)("div",{class:"title"},"我的订单",-1))),a={class:"orders"},l={class:"order__title"},d=["innerHTML"],u={class:"order__content"},_={key:0,class:"order__content__imgs"},v=["src"],p={class:"order__content__info"},k={class:"price"},w={class:"all"};function g(t,e,n,i,g,f){const m=(0,r.up)("Docker");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("div",c,[s,(0,r._)("div",a,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(i.list,((t,e)=>((0,r.wg)(),(0,r.iD)("div",{key:e,class:"order"},[(0,r._)("div",l,[(0,r.Uk)((0,o.zw)(t.shopName)+" ",1),(0,r._)("span",{innerHTML:t.isCanceled?"已下单":"已取消"},null,8,d)]),(0,r._)("div",u,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(t.products,((t,e)=>((0,r.wg)(),(0,r.iD)(r.HY,{key:e},[e<=3?((0,r.wg)(),(0,r.iD)("div",_,[(0,r._)("img",{src:t.product.imgUrl,alt:""},null,8,v)])):(0,r.kq)("",!0)],64)))),128)),(0,r._)("div",p,[(0,r._)("div",k,"¥"+(0,o.zw)(t.totalPrice),1),(0,r._)("div",w,"共"+(0,o.zw)(t.totalCount)+"件",1)])])])))),128))])]),(0,r.Wm)(m,{currentIndex:2})],64)}var f=n(4471),m=n(750),D=n(2262);const H=()=>{const t=(0,D.qj)({list:[]}),e=async()=>{const e=await(0,f.U)("/api/order");if(e?.data?.length&&0===e?.errno){const n=e.data;n.forEach((t=>{const e=t.products||[];let n=0,r=0;e.forEach((t=>{n=t?.orderSales*t?.product?.price,r+=t?.orderSales||0})),t.totalCount=r,t.totalPrice=n})),t.list=e.data}};e();const{list:n}=(0,D.BK)(t);return{list:n}};var L={name:"OrderListView",components:{Docker:m.Z},setup(){const{list:t}=H();return console.log(t),{list:t}}},C=n(3744);const h=(0,C.Z)(L,[["render",g],["__scopeId","data-v-072d094b"]]);var x=h}}]);
//# sourceMappingURL=421.2e2aac69.js.map