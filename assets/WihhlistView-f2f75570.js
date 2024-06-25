import{_ as u,o as r,c as a,b as t,F as m,r as v,t as i,i as I,h as _,p as b,d as f,e as y}from"./index-e1daf5a8.js";const k={data(){return{favorites:[],userId:null,cartItems:[],loading:!1,error:null,addedToCart:{},showAddedToCartText:{},buttonText:{}}},async mounted(){this.userId=JSON.parse(localStorage.getItem("user")).id,await this.loadFavoriteProducts(),await this.loadCartItems(),this.updateAddedToCartState()},methods:{async loadFavoriteProducts(){try{const h=(await(await fetch(`https://ec4cde03eba81a3e.mokky.dev/favorite?userId=${this.userId}`)).json()).map(async l=>{const d=await(await fetch(`https://ec4cde03eba81a3e.mokky.dev/items/${l.productId}`)).json();return{...l,product:d}});this.favorites=await Promise.all(h)}catch(e){this.error="Ошибка при загрузке избранных товаров:"+e.message,console.error(this.error)}},async removeFromFavorite(e){try{await fetch(`https://ec4cde03eba81a3e.mokky.dev/favorite/${e}`,{method:"DELETE"}),await this.loadFavoriteProducts()}catch(c){this.error="Ошибка при удалении товара из избранного:"+c.message,console.error(this.error)}},async loadCartItems(){try{const e=await fetch(`https://ec4cde03eba81a3e.mokky.dev/cart?usersId=${this.userId}`);this.cartItems=await e.json()}catch(e){this.error="Ошибка при загрузке корзины:"+e.message,console.error(this.error)}},updateAddedToCartState(){this.addedToCart={},this.buttonText={},this.showAddedToCartText={};for(const e of this.cartItems)this.addedToCart[e.itemsId]=!0,this.buttonText[e.itemsId]="Добавлена",this.showAddedToCartText[e.itemsId]=!1},async addToCart(e){try{this.addedToCart[e]||(await fetch("https://ec4cde03eba81a3e.mokky.dev/cart",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({itemsId:e,usersId:this.userId})}),await this.loadCartItems(),this.updateAddedToCartState())}catch(c){this.error="Ошибка при добавлении товара в корзину:"+c.message,console.error(this.error)}}}},n=e=>(b("data-v-ceb4c3f7"),e=e(),f(),e),T={class:"pageContent"},w={class:"section section_noPadT"},C={class:"wrapper"},g=n(()=>t("div",{class:"crumbs"},[t("span",null,[t("span",null,[t("a",{href:"/"},"Главная")]),y(" / "),t("span",null,"Избранное")])],-1)),S=n(()=>t("h1",{class:"h3 section__title"},"Избранное",-1)),x={key:0,class:"productsList"},F={class:"productsItemImage"},B=n(()=>t("span",{class:"productsItemImage__padding"},null,-1)),P=["src","alt"],A={class:"productsItem__title"},N={class:"productsItem__price"},V={class:"productsItem__cart"},j=["onClick"],D=["onClick"],E={key:1,class:"errorSection"},L=n(()=>t("div",{class:"wrapper"},[t("div",{class:"errorBlock"},[t("p",{class:"h4 errorBlock__subtitle"},"Добавьте товар в избранное.")])],-1)),O=[L],$={key:2,class:"errorSection"},J={class:"wrapper"},R={class:"errorBlock"},W={class:"h4 errorBlock__subtitle"};function M(e,c,h,l,o,d){return r(),a("main",T,[t("section",w,[t("div",C,[g,S,o.favorites.length>0?(r(),a("div",x,[t("div",null,[(r(!0),a(m,null,v(o.favorites,s=>(r(),a("div",{class:"productsItem",key:s.id},[t("div",F,[B,t("img",{src:s.product.image,alt:s.product.title},null,8,P)]),t("div",A,i(s.product.title),1),t("p",N,i(s.product.price)+" ₽",1),t("div",V,[t("button",{class:"btn btn_s btn_full bb",onClick:_(p=>d.addToCart(s.product.id),["prevent"])},i(o.addedToCart[s.product.id]?"Добавлено!":"Добавить в корзину"),9,j),t("button",{class:"btn btn_s btn_full bb",onClick:_(p=>d.removeFromFavorite(s.id),["prevent"])}," Удалить из избранного ",8,D)])]))),128))])])):(r(),a("section",E,O)),o.error?(r(),a("section",$,[t("div",J,[t("div",R,[t("p",W,i(o.error),1)])])])):I("",!0)])])])}const z=u(k,[["render",M],["__scopeId","data-v-ceb4c3f7"]]);export{z as default};