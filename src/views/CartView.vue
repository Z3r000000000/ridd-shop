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
					<span>Корзина</span>
				</span>
			</div>

      <h1 class="h3 section__title">
      Корзина
      <span class="cartTitleAmount" v-if="cartItems.length > 0">
        {{ cartItems.length }} товара, {{ totalPrice }} ₽
      </span>
    </h1>

    <div class="cart" v-if="cartItems.length > 0 & isLogin">
      <div class="cart__left">
        <div class="cart__notices" v-if="removedItem">
          <div class="notice notice_done">{{ removedItem.product.title }} удалён</div>
        </div>

        <div class="cartHead">
          <p class="cartHead__item">Цена</p>
          <p class="cartHead__item"></p>
          <p class="cartHead__item"></p>
        </div>

        <div class="cartItem" v-for="item in cartItems" :key="item.id">
          <a href="#" class="cartItemProduct">
            <span class="cartItemProduct__image">
              <span class="cartItemProduct__padding"></span>
              <img :src="item.product.image" :alt="item.product.title">
            </span>
            <span class="cartItemProduct__title">{{ item.product.title }}</span>
          </a>
          <p class="cartItem__price">{{ item.product.price }} ₽</p>
          <a href="#" class="cartItem__delete" title="Удалить из корзины" @click.prevent="removeFromCart(item.id)">
            <img src="../assets/img/cart-delete-icon.svg" alt="">
          </a>
        </div>
      </div>

      <div class="cart__right">
        <p class="cart__total">Итого: <strong>{{ totalPrice }} ₽</strong></p>
        <router-link to="/checkout" class="btn">Оформить заказ</router-link>
      </div>
    </div>
    <section class="errorSection" v-if="cartItems.length < 0 & isLogin">
		<div class="wrapper">
			<div class="errorBlock">
				<h1 class="h1 errorBlock__title">Нужно добавить товары для заказа</h1>

				<div class="buttonWrap center">
					<router-link to="/shop" class="btn btn_l">В магазин</router-link>
				</div>
			</div>
		</div>
	</section>
  <section class="errorSection" v-if="!isLogin">
		<div class="wrapper">
			<div class="errorBlock">
				<h1 class="h1 errorBlock__title">Нужно авторизироваться, чтобы можно было заказать</h1>

				<div class="buttonWrap center">
					<router-link to="/auth" class="btn btn_l">Авторизироваться</router-link>
				</div>
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
      cartItems: [],
      removedItem: null,
      totalPrice: 0,
      isLogin: false
    }
  },
  async mounted() {
    await this.loadCartItems();
    this.calculateTotalPrice();
  },
  methods: {
    async loadCartItems() {
      try {
        this.isLogin = JSON.parse(localStorage.getItem('isLoggedIn'));
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(`https://ec4cde03eba81a3e.mokky.dev/cart?usersId=${user.id}`);
        const cartData = await response.json();
        
        this.cartItems = await Promise.all(
          cartData.map(async (item) => {
            const productResponse = await fetch(`https://ec4cde03eba81a3e.mokky.dev/items/${item.itemsId}`);
            const product = await productResponse.json();
            return { id: item.id, product };
          })
        );
      } catch (error) {
        console.error('Ошибка при загрузке корзины:', error);
      }
    },
    async removeFromCart(itemId) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        await fetch(`https://ec4cde03eba81a3e.mokky.dev/cart/${itemId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ usersId: user.id })
        });
        this.removedItem = this.cartItems.find((item) => item.id === itemId);
        this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
        this.calculateTotalPrice();
      } catch (error) {
        console.error('Ошибка при удалении товара из корзины:', error);
      }
    },
    calculateTotalPrice() {
      this.totalPrice = this.cartItems.reduce((total, item) => {
        return total + item.product.price;
      }, 0);
    }
  }
}
</script>

<style scoped>
.pageContent{
  min-height: 27.3vw;
}
</style>