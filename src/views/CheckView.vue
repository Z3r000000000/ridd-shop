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
					<span>Оформление заказа</span>
				</span>
			</div>

			<h1 class="h3 section__title checkoutPageTitle">Оформление заказа</h1>			

      <form @submit.prevent="submitOrder" class="checkout">
      <div class="checkout__left">
        <div class="checkoutBlock">
          <div class="inputs">
            <div class="input input_half">
              <input type="number" v-model="orderAddress.postcode" name="postcode" placeholder="Почтовый индекс*" autocomplete="off" required>
            </div>
            <div class="input input_half">
              <div class="select">
                <select v-model="orderAddress.region" name="region" required>
                  <option value="default" disabled selected>Страна/регион*</option>
                  <option value="rus">Россия</option>
                  <option value="bel">Беларусь</option>
                  <option value="kax">Казахстан</option>
                </select>
              </div>
            </div>
            <div class="input">
              <input type="text" v-model="orderAddress.address" name="address" placeholder="Область, город, улица, дом*" autocomplete="off" required>
            </div>
            <div class="input input_third">
              <input type="text" v-model="orderAddress.flat" name="flat" placeholder="Квартира/офис" autocomplete="off" required>
            </div>
            <div class="input input_third">
              <input type="number" v-model="orderAddress.podezd" name="podezd" placeholder="Подъезд" autocomplete="off" required>
            </div>
            <div class="input input_third">
              <input type="number" v-model="orderAddress.floor" name="floor" placeholder="Этаж" autocomplete="off" required>
            </div>
            <div class="input">
              <textarea v-model="orderAddress.comment" name="comment" rows="4" placeholder="Комментарий к заказу"></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="checkout__right">
        <div class="checkout__products">
          <div class="checkoutProduct" v-for="item in cartItems" :key="item.id">
            <p class="checkoutProduct__title">{{ item.product.title }}</p>
            <p class="checkoutProduct__info">{{ item.product.price }} ₽</p>
          </div>
        </div>

        <div class="checkout__info">
          <p class="checkout__total">Итого: <strong>{{ totalPrice }} ₽</strong></p>
        </div>

        <button type="submit" class="btn btn_full">Подтвердить заказ</button>
      </div>
    </form>
  </div>
	</section>
</main>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [],
      orderAddress: {
        postcode: '',
        region: 'default',
        address: '',
        flat: '',
        podezd: '',
        floor: '',
        comment: ''
      },
      totalPrice: 0
    }
  },
  async mounted() {
    await this.loadCartItems();
    this.calculateTotalPrice();
  },
  methods: {
    async loadCartItems() {
      try {
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
    calculateTotalPrice() {
      this.totalPrice = this.cartItems.reduce((total, item) => {
        return total + item.product.price;
      }, 0);
    },
    async submitOrder() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const currentDate = new Date().toISOString();
        const orderData = {
          userId: user.id,
          status: 'Заказ зарегистрирован',
          createdAt: currentDate
        };

        const orderResponse = await fetch('https://ec4cde03eba81a3e.mokky.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderData)
        });
        const order = await orderResponse.json();

        for (const item of this.cartItems) {
          await fetch('https://ec4cde03eba81a3e.mokky.dev/orderitems', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: item.id, itemId: item.product.id, orderId: order.id })
          });
          await this.removeFromCart(item.id);
        }

        const orderAddressData = {
          id: order.id,
          postcode: this.orderAddress.postcode,
          region: this.orderAddress.region,
          address: this.orderAddress.address,
          flat: this.orderAddress.flat,
          podezd: this.orderAddress.podezd,
          floor: this.orderAddress.floor,
          comment: this.orderAddress.comment
        };

        await fetch('https://ec4cde03eba81a3e.mokky.dev/ordersadress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderAddressData)
        });

        // Перенаправить на страницу заказа или показать сообщение об успешном оформлении
        this.$router.push('/order-success');
      } catch (error) {
        console.error('Ошибка при оформлении заказа:', error);
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
        this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
        this.calculateTotalPrice();
      } catch (error) {
        console.error('Ошибка при удалении товара из корзины:', error);
      }
    }
  }
}
</script>

<style scoped>
  .pageContent{
  min-height: 27.3vw;
}
</style>