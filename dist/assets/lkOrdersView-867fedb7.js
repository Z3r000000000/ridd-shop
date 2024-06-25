import{_ as v,o,c as r,b as e,F as m,r as k,t as n,n as w,g as u,w as h,T as y,y as O,i as f,p as I,d as C,e as g}from"./index-e1daf5a8.js";const $="/ridd-shop/assets/lk-order-arrow-72cf4a7f.svg";const D={data(){return{orders:[]}},async mounted(){await this.loadOrders()},methods:{async loadOrders(){try{const t=JSON.parse(localStorage.getItem("user")),d=await(await fetch(`https://ec4cde03eba81a3e.mokky.dev/orders?userId=${t.id}`)).json();this.orders=await Promise.all(d.map(async i=>{const _=await this.getOrderItems(i.id);return{...i,items:_,isOpen:!1}}))}catch(t){console.error("Ошибка при загрузке заказов:",t)}},async getOrderItems(t){try{const d=await(await fetch(`https://ec4cde03eba81a3e.mokky.dev/orderitems?orderId=${t}`)).json();return await Promise.all(d.map(async i=>{const l=await(await fetch(`https://ec4cde03eba81a3e.mokky.dev/items/${i.itemId}`)).json();return{id:i.id,product:l}}))}catch(a){return console.error("Ошибка при загрузке товаров заказа:",a),[]}},formatDate(t){const a=new Date(t);return`${a.getDate()}.${a.getMonth()+1}.${a.getFullYear()}`},calculateTotalPrice(t){return t.reduce((a,d)=>a+d.product.price,0)},toggleOrderContent(t){t.isOpen=!t.isOpen}}},p=t=>(I("data-v-8e422f20"),t=t(),C(),t),T={class:"pageContent"},b={class:"section section_noPadT"},x={class:"wrapper"},S=p(()=>e("div",{class:"crumbs"},[e("span",null,[e("span",null,[e("a",{href:"/"},"Главная")]),g(" / "),e("span",null,[e("a",{href:"lk.html"},"Мой аккаунт")]),g(" / "),e("span",null,"Мои заказы")])],-1)),V=p(()=>e("h1",{class:"h3 section__title"},"Мои заказы",-1)),N={class:"account"},P={class:"account__content"},j={class:"lk-orders"},B=["onClick"],F={class:"lkOrder__info"},R={class:"lkOrder__number"},z={class:"lkOrder__amount"},A={class:"lkOrder__cost"},E=p(()=>e("img",{src:$,alt:""},null,-1)),G=[E],J={key:0,class:"lkOrder__content"},L={key:0},M=["href"],Y={key:0,class:"lkOrderItem__image"},q=["src","alt"],H={class:"lkOrderItem__title"},K={class:"lkOrderItem__right"},Q={key:1},U=p(()=>e("p",null,"Нет товаров в этом заказе",-1)),W=[U];function X(t,a,d,i,_,l){return o(),r("main",T,[e("section",b,[e("div",x,[S,V,e("div",N,[e("div",P,[e("div",j,[(o(!0),r(m,null,k(_.orders,s=>(o(),r("div",{class:"lkOrder",key:s.id},[e("div",{class:"lkOrder__head",onClick:c=>l.toggleOrderContent(s)},[e("div",F,[e("p",null,n(l.formatDate(s.createdAt)),1),e("p",null,n(s.status),1)]),e("p",R,"№"+n(s.id),1),e("p",z,n(s.items.length)+" товара",1),e("p",A,n(l.calculateTotalPrice(s.items))+" ₽",1),e("div",{class:w(["lkOrder__arrow",{lkOrder__arrow_open:s.isOpen}])},G,2)],8,B),u(O,{name:"slide"},{default:h(()=>[s.isOpen?(o(),r("div",J,[s.items&&s.items.length>0?(o(),r("div",L,[u(y,{name:"item",tag:"div"},{default:h(()=>[(o(!0),r(m,null,k(s.items,c=>(o(),r("div",{class:"lkOrderItem",key:c.id},[e("a",{href:`/product/${c.product.id}`,class:"lkOrderItem__left"},[u(O,{name:"image"},{default:h(()=>[s.isOpen?(o(),r("span",Y,[e("img",{src:c.product.image,alt:c.product.title},null,8,q)])):f("",!0)]),_:2},1024),e("span",H,n(c.product.title),1)],8,M),e("p",K,n(c.product.price)+" ₽",1)]))),128))]),_:2},1024)])):(o(),r("div",Q,W))])):f("",!0)]),_:2},1024)]))),128))])])])])])])}const ee=v(D,[["render",X],["__scopeId","data-v-8e422f20"]]);export{ee as default};
