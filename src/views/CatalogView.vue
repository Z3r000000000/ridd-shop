<template>
<main class="pageContent">
	<section class="section section_noPadT">
		<div class="wrapper">
			<div class="crumbs">
				<span>
					<span>
						<a href="/">Главная</a>
					</span>
					/
					<span>
						<a href="">Магазин</a>
					</span>
					/
					<span>Смартфоны</span>
				</span>
			</div>

			<h1 class="h3 section__title">Смартфоны</h1>

			<div class="catalogHead">

					
			</div>

				<div class="catalog__content">
          <div  class="message">
            <p></p>
          </div>
					<div v-if="userIs" class="productsList">
            <div v-for="product in data" :key="product.id" class="productsItem">
              <div class="productsItem__wishlist" title="Добавить в избранное" @click.prevent="toggleFavorite(product.id)">
                <img :src="isFavorite(product.id) ? '../img/product-wishlist-active.svg' : '../img/product-wishlist.svg'" alt="" :class="{ 'active': isFavorite(product.id) }">
              </div>
              <div class="productsItemImage">
                <span class="productsItemImage__padding"></span>
                <img :src="product.image" :alt="product.title">
              </div>
              <div class="productsItem__title">{{ product.title }}</div>
              <p class="productsItem__price">{{ product.price }} ₽</p>
              <div class="productsItem__cart">
                <button class="btn btn_s btn_full" @click="addToCart(product.id)" :disabled="addedToCart[product.id]">
                  <span v-if="addedToCart[product.id]" class="added-to-cart-text">Добавлено!</span>
                   <span v-else>В корзину</span> 
                </button>
              </div>
            </div>
					</div>
          <div v-else class="cart__notices">
						<div class="notice notice_done">Для добавления товаров в избранное или корзину, необходимо <router-link to="/auth">авторизоваться</router-link>.</div>
					</div>
				</div>
			</div>
	</section>
</main>
</template>


<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import {useRoute} from 'vue-router';
import {useRouter} from 'vue-router';

export default {
  data() {
    return {
      data: [], // Массив товаров
      favoriteProducts: [], // Массив избранных товаров
      cartItems: [], // Массив товаров в корзине
      loading: false,
      error: null,
      addedToCart: {}, // Объект, хранящий информацию о добавленных в корзину товарах
      showAddedToCartText: {},
      userId: [],
      buttonText: {},
      userIs: false
    }
  },
  async mounted() {
  const user = JSON.parse(localStorage.getItem('user'));
  this.userIs = !!user;
  this.userId = user?.id;

  await this.fetchData();
  await this.loadFavoriteProducts();
  await this.loadCartItems();
  this.updateAddedToCartState();
},
  methods: {
    
    async fetchData() {
      if(localStorage.getItem("user") == true){
        userIs = true;
      }
      try {
        this.loading = true;
        const response = await fetch(`https://ec4cde03eba81a3e.mokky.dev/items?categoryId=${this.$route.params.categoryId}`);
        const fetchedData = await response.json();

        if (!response.ok) {
          throw new Error(fetchedData.message || 'Something went wrong');
        }

        this.data = fetchedData;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
        console.log(this.$route.params.categoryId);
      }
    },
    loadFavoriteProducts() {
      const userId = JSON.parse(localStorage.getItem('user')).id;
      fetch(`https://ec4cde03eba81a3e.mokky.dev/favorite?userId=${userId}`)
        .then(res => res.json())
        .then(data => {
          this.favoriteProducts = data;
        });
    },
    loadCartItems() {
      const userId = JSON.parse(localStorage.getItem('user')).id;
      fetch(`https://ec4cde03eba81a3e.mokky.dev/cart?usersId=${userId}`)
        .then(res => res.json())
        .then(data => {
          this.cartItems = data;
        });
    },
    toggleFavorite(productId) {
      const userId = JSON.parse(localStorage.getItem('user')).id;
      const favoriteProduct = this.favoriteProducts.find(p => p.productId === productId && p.userId === userId);
      if (favoriteProduct) {
        fetch(`https://ec4cde03eba81a3e.mokky.dev/favorite/${favoriteProduct.id}`, {
          method: 'DELETE'
        })
          .then(() => {
            this.loadFavoriteProducts();
          });
      } else {
        fetch('https://ec4cde03eba81a3e.mokky.dev/favorite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId, productId })
        })
          .then(res => res.json())
          .then(() => {
            this.loadFavoriteProducts();
          });
      }
    },
    async loadCartItems() {
      const userId = JSON.parse(localStorage.getItem('user')).id;
      const response = await fetch(`https://ec4cde03eba81a3e.mokky.dev/cart?usersId=${userId}`);
      this.cartItems = await response.json();
    },
    updateAddedToCartState() {
      this.addedToCart = {};
      this.buttonText = {};
      this.showAddedToCartText = {};

      for (const item of this.cartItems) {
        this.addedToCart[item.itemsId] = true;
        this.buttonText[item.itemsId] = 'Добавлена';
        this.showAddedToCartText[item.itemsId] = false;
      }
    },
    async addToCart(productId) {
      const userId = JSON.parse(localStorage.getItem('user')).id;

      if (this.addedToCart[productId]) {
        return;
      }

      try {
        await fetch('https://ec4cde03eba81a3e.mokky.dev/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ itemsId: productId, usersId: userId })
        });

        await this.loadCartItems();
        this.updateAddedToCartState();
      } catch (error) {
        console.error('Ошибка при добавлении товара в корзину:', error);
      }
    },
    isFavorite(productId) {
      const userId = JSON.parse(localStorage.getItem('user')).id;
      return this.favoriteProducts.some(p => p.productId === productId && p.userId === userId);
    }
  }
};
</script>

<style scoped>
.pageContent{
  min-height: 27.3vw;
}
</style>