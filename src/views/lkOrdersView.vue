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
						<a href="lk.html">Мой аккаунт</a>
					</span>
					/
					<span>Мои заказы</span>
				</span>
			</div>

			<h1 class="h3 section__title">Мои заказы</h1>

			<div class="account">


				<div class="account__content">
          <div class="lk-orders">
      <div class="lkOrder" v-for="order in orders" :key="order.id">
        <div class="lkOrder__head" @click="toggleOrderContent(order)">
          <div class="lkOrder__info">
            <p>{{ formatDate(order.createdAt) }}</p>
            <p>{{ order.status }}</p>
          </div>
          <p class="lkOrder__number">№{{ order.id }}</p>
          <p class="lkOrder__amount">{{ order.items.length }} товара</p>
          <p class="lkOrder__cost">{{ calculateTotalPrice(order.items) }} ₽</p>
          <div class="lkOrder__arrow" :class="{ 'lkOrder__arrow_open': order.isOpen }">
            <img src="../assets/img/lk-order-arrow.svg" alt="">
          </div>
        </div>
        <transition name="slide">
          <div class="lkOrder__content" v-if="order.isOpen">
            <div v-if="order.items && order.items.length > 0">
              <transition-group name="item" tag="div">
                <div class="lkOrderItem" v-for="item in order.items" :key="item.id">
                  <a :href="`/product/${item.product.id}`" class="lkOrderItem__left">
                    <transition name="image">
                      <span class="lkOrderItem__image" v-if="order.isOpen">
                        <img :src="item.product.image" :alt="item.product.title">
                      </span>
                    </transition>
                    <span class="lkOrderItem__title">{{ item.product.title }}</span>
                  </a>
                  <p class="lkOrderItem__right">{{ item.product.price }} ₽</p>
                </div>
              </transition-group>
            </div>
            <div v-else>
              <p>Нет товаров в этом заказе</p>
            </div>
          </div>
        </transition>
      </div>
    </div>
				</div>
			</div>
		</div>
	</section>
</main>
</template>

<script>
export default {
  data() {
    return {
      orders: []
    }
  },
  async mounted() {
    await this.loadOrders();
  },
  methods: {
    async loadOrders() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(`https://ec4cde03eba81a3e.mokky.dev/orders?userId=${user.id}`);
        const orderData = await response.json();

        this.orders = await Promise.all(
          orderData.map(async (order) => {
            const orderItems = await this.getOrderItems(order.id);
            return { ...order, items: orderItems, isOpen: false };
          })
        );
      } catch (error) {
        console.error('Ошибка при загрузке заказов:', error);
      }
    },
    async getOrderItems(orderId) {
      try {
        const response = await fetch(`https://ec4cde03eba81a3e.mokky.dev/orderitems?orderId=${orderId}`);
        const itemData = await response.json();

        return await Promise.all(
          itemData.map(async (item) => {
            const productResponse = await fetch(`https://ec4cde03eba81a3e.mokky.dev/items/${item.itemId}`);
            const product = await productResponse.json();
            return { id: item.id, product };
          })
        );
      } catch (error) {
        console.error('Ошибка при загрузке товаров заказа:', error);
        return [];
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    },
    calculateTotalPrice(items) {
      return items.reduce((total, item) => {
        return total + item.product.price;
      }, 0);
    },
    toggleOrderContent(order) {
      order.isOpen = !order.isOpen;
    }
  }
}
</script>

<style scoped>
.pageContent{
  min-height: 27.3vw;
}
.lk-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 0;
}

.lkOrder {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.lkOrder__head {
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  cursor: pointer;
}

.lkOrder__info p {
  font-size: 14px;
  line-height: 18px;
  color: #8c8c8c;
}

.lkOrder__number {
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
}

.lkOrder__amount, .lkOrder__cost {
  font-size: 14px;
  line-height: 18px;
  color: #8c8c8c;
}

.lkOrder__arrow {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
}

.lkOrder__arrow_open {
  transform: rotate(180deg);
}

.lkOrder__content {
  display: block;
  padding: 16px 24px;
}

.lkOrderItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.lkOrderItem__left {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.lkOrderItem__image {
  width: 80px;
  height: 80px;
  margin-right: 16px;
}

.lkOrderItem__image img {
  margin: 15px;
  width: 100%;
  height: 100%;
  border-radius: 25%;
  object-fit: contain;
}

.lkOrderItem__title {
  font-size: 14px;
  line-height: 18px;
}

.lkOrderItem__right {
  font-size: 14px;
  line-height: 18px;
  color: #8c8c8c;
}

.lk-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 0;
}

.lkOrder {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.lkOrder__head {
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  cursor: pointer;
}

.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.5s ease-out, opacity 0.5s ease-out;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.item-enter-active,
.item-leave-active {
  transition: opacity 0.3s ease-out;
}

.item-enter,
.item-leave-to {
  opacity: 0;
}

.image-enter-active,
.image-leave-active {
  transition: opacity 0.2s ease-out;
}

.image-enter,
.image-leave-to {
  opacity: 0;
}
</style>