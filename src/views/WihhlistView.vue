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
					<span>Избранное</span>
				</span>
			</div>

			<h1 class="h3 section__title">Избранное</h1>

			<div v-if="favorites.length > 0" class="productsList">
        <div>
        <div class="productsItem" v-for="favorite in favorites" :key="favorite.id">
      <div class="productsItemImage">
        <span class="productsItemImage__padding"></span>
        <img :src="favorite.product.image" :alt="favorite.product.title">
      </div>
      <div class="productsItem__title">{{ favorite.product.title }}</div>
      <p class="productsItem__price">{{ favorite.product.price }} ₽</p>
      <div class="productsItem__cart">
        <button class="btn btn_s btn_full bb" @click.prevent="addToCart(favorite.product.id)">
          {{ addedToCart[favorite.product.id] ? 'Добавлено!' : 'Добавить в корзину' }}
        </button>
        <button class="btn btn_s btn_full bb" @click.prevent="removeFromFavorite(favorite.id)">
          Удалить из&nbsp;избранного
        </button>
      </div>
    </div>
        </div>
			</div>
      <section v-else class="errorSection">
		<div class="wrapper">
			<div class="errorBlock">
				<p class="h4 errorBlock__subtitle">Добавьте товар в избранное.</p>
			</div>
		</div>
	</section>
  <section v-if="error" class="errorSection">
		<div class="wrapper">
			<div class="errorBlock">
				<p class="h4 errorBlock__subtitle">{{ error }}</p>
			</div>
		</div>
	</section>
		</div>
	</section>
</main>
</template>

<script>
export default {
  data() {
    return {
      favorites: [],
      userId: null,
      cartItems: [],
      loading: false,
      error: null,
      addedToCart: {},
      showAddedToCartText: {},
      buttonText: {}
    }
  },
  async mounted() {
    this.userId = JSON.parse(localStorage.getItem('user')).id;
    await this.loadFavoriteProducts();
    await this.loadCartItems();
    this.updateAddedToCartState();
  },
  methods: {
    async loadFavoriteProducts() {
      try {
        const response = await fetch(`https://ec4cde03eba81a3e.mokky.dev/favorite?userId=${this.userId}`);
        const favoritesData = await response.json();

        const favoritePromises = favoritesData.map(async (favorite) => {
          const productResponse = await fetch(`https://ec4cde03eba81a3e.mokky.dev/items/${favorite.productId}`);
          const product = await productResponse.json();
          return { ...favorite, product };
        });

        this.favorites = await Promise.all(favoritePromises);
      } catch (error) {
        this.error = 'Ошибка при загрузке избранных товаров:' + error.message;
        console.error(this.error);
      }
    },
    async removeFromFavorite(favoriteId) {
      try {
        await fetch(`https://ec4cde03eba81a3e.mokky.dev/favorite/${favoriteId}`, {
          method: 'DELETE'
        });
        await this.loadFavoriteProducts();
      } catch (error) {
        this.error = 'Ошибка при удалении товара из избранного:' + error.message;
        console.error(this.error);
      }
    },
    async loadCartItems() {
      try {
        const response = await fetch(`https://ec4cde03eba81a3e.mokky.dev/cart?usersId=${this.userId}`);
        this.cartItems = await response.json();
      } catch (error) {
        this.error = 'Ошибка при загрузке корзины:' + error.message;
        console.error(this.error);
      }
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
      try {
        if (!this.addedToCart[productId]) {
          await fetch('https://ec4cde03eba81a3e.mokky.dev/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ itemsId: productId, usersId: this.userId })
          });
          await this.loadCartItems();
          this.updateAddedToCartState();
        }
      } catch (error) {
        this.error = 'Ошибка при добавлении товара в корзину:' + error.message;
        console.error(this.error);
      }
    }
  }
}
</script>

<style  scoped>
.pageContent{
  min-height: 27.3vw;
}
.bb{
  margin-bottom: 10px;
}
</style>