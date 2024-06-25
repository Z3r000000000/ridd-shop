<template>
  <div class="bl">
    <nav>
      <div class="shop-toggle">
        <div class="filters">
          <div class="filter-status">
            <select v-model="selectedStatus">
              <option value="">Все</option>
              <option value="Заказ зарегистрирован">Заказ зарегистрирован</option>
              <option value="Подготавливается">Подготавливается</option>
              <option value="Отправлено">Отправлено</option>
              <option value="Выполнено">Выполнено</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
    <div class="container" v-if="filteredOrders.length > 0">
      <h1>Заказы пользователей</h1>
      <div class="orders" v-for="order in filteredOrders" :key="order.id">
        <div class="order-header">
          <div class="order-id">Заказ #{{ order.id }}</div>
          <div class="order-user">
            {{ getUserFullName(order.userId) }}
            <div class="user-details">
              {{ getUserPhone(order.userId) }} | {{ getUserEmail(order.userId) }}
            </div>
          </div>
          <div class="order-status">
            <select v-model="order.status">
              <option value="Заказ зарегистрирован">Заказ зарегистрирован</option>
              <option value="Подготавливается">Подготавливается</option>
              <option value="Отправлено">Отправлено</option>
              <option value="Выполнено">Выполнено</option>
            </select>
            <button @click="updateOrderStatus(order)">Обновить статус</button>
          </div>
        </div>
        <div class="order-items">
          <div class="order-item" v-for="item in getOrderItems(order.id)" :key="item.id">
            <div class="item-name">{{ item.title }}</div>
            <div class="item-price">{{ item.price }} руб.</div>
          </div>
          <button class="order-address-toggle" @click="toggleOrderAddressVisibility">
            {{ isOrderAddressVisible ? 'Скрыть' : 'Показать' }} адрес заказа
          </button>
        </div>
        <div class="order-address order-items"
          v-if="isOrderAddressVisible && orderAddress && orderAddress.length > 0 && orderAddress[0].orderId === order.id">
          <h3 class="order-address-items item-name">Адрес заказа</h3>
          <p class="order-address-items item-price">Почтовый индекс: {{ orderAddress[0].postcode }}</p>
          <p class="order-address-items item-price">Регион: {{ orderAddress[0].region }}</p>
          <p class="order-address-items item-price">Адрес: {{ orderAddress[0].address }}</p>
          <p class="order-address-items item-price">Квартира: {{ orderAddress[0].flat }}</p>
          <p class="order-address-items item-price">Подъезд: {{ orderAddress[0].podezd }}</p>
          <p class="order-address-items item-price">Этаж: {{ orderAddress[0].floor }}</p>
          <p class="order-address-items item-price">Комментарий: {{ orderAddress[0].comment }}</p>
        </div>
      </div>
    </div>
    <div class="container" v-else>
      <h1 class="h1 errorBlock__title center">Таких заказов нет.</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrdersPage',
  data() {
    return {
      orders: [],
      users: [],
      orderItems: [],
      items: [],
      selectedStatus: '',
      orderAddress: null,
      error: '',
      success: '',
      isOrderAddressVisible: false
    }
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    filteredOrders() {
      return this.selectedStatus
        ? this.orders.filter(order => order.status === this.selectedStatus)
        : this.orders;
    }
  },
  methods: {
    async fetchData() {
      try {
        const [usersResponse, orderItemsResponse, ordersResponse, itemsResponse] = await Promise.all([
          fetch('https://ec4cde03eba81a3e.mokky.dev/users'),
          fetch('https://ec4cde03eba81a3e.mokky.dev/orderitems'),
          fetch('https://ec4cde03eba81a3e.mokky.dev/orders'),
          fetch('https://ec4cde03eba81a3e.mokky.dev/items')
        ]);

        this.users = await usersResponse.json();
        this.orderItems = await orderItemsResponse.json();
        this.orders = await ordersResponse.json();
        this.items = await itemsResponse.json();

        this.logOrderDetails();
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
        this.error = 'Произошла ошибка. Попробуйте снова позже.';
      }
    },
    toggleOrderAddressVisibility() {
      this.isOrderAddressVisible = !this.isOrderAddressVisible
    },
    async logOrderDetails() {
      for (const order of this.orders) {
        const user = this.users.find(u => u.id.toString() === order.userId.toString());
        if (user) {
          const orderItemsForOrder = this.orderItems.filter(i => i.orderId.toString() === order.id.toString());
          const itemsForOrder = orderItemsForOrder.map(oi => {
            const item = this.items.find(i => i.id.toString() === oi.itemId.toString());
            return item ? { ...item, quantity: parseInt(oi.quantity) } : null;
          }).filter(item => item !== null);

          console.log(`Заказ #${order.id} - ${this.getUserFullName(order.userId)}:`);
          console.log(`Телефон: ${this.getUserPhone(order.userId)} | Email: ${this.getUserEmail(order.userId)}`);
          console.log('Товары:');
          itemsForOrder.forEach(item => {
            console.log(`- ${item.title} (${item.price} руб.)`);
          });
          console.log(`Статус: ${order.status}`);
          console.log(`Общая цена: ${this.formatPrice(this.calculateOrderTotal(order.id))} руб.`);

          try {
            await this.fetchOrderAddress(order.id);
            console.log('Адрес заказа:');
            console.log(`Почтовый индекс: ${this.orderAddress?.postcode || ''}`);
            console.log(`Регион: ${this.orderAddress?.region || ''}`);
            console.log(`Адрес: ${this.orderAddress?.address || ''}`);
            console.log(`Квартира: ${this.orderAddress?.flat || ''}`);
            console.log(`Подъезд: ${this.orderAddress?.podezd || ''}`);
            console.log(`Этаж: ${this.orderAddress?.floor || ''}`);
            console.log(`Комментарий: ${this.orderAddress?.comment || ''}`);
          } catch (error) {
            console.error(`Ошибка при получении адреса заказа #${order.id}:`, error);
          }

          console.log('---');
        } else {
          console.log(`Заказ #${order.id} - Пользователь не найден`);
        }
      }
    },
    async fetchOrderAddress(orderId) {
      const response = await fetch(`https://ec4cde03eba81a3e.mokky.dev/ordersadress?orderId=${orderId}`);
      if (response.ok) {
        this.orderAddress = await response.json();
        console.log('Ответ с сервера:', this.orderAddress[0]);
      } else {
        throw new Error('Ошибка при получении адреса заказа.');
      }
    },
    async updateOrderStatus(order) {
      try {
        const response = await fetch(`https://ec4cde03eba81a3e.mokky.dev/orders/${order.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: order.status })
        });
        if (response.ok) {
          console.log(`Статус заказа #${order.id} обновлен: ${order.status}`);
        } else {
          console.error(`Ошибка при обновлении статуса заказа #${order.id}: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error(`Ошибка при обновлении статуса заказа #${order.id}: ${error}`);
      }
    },
    getOrderItems(orderId) {
      const orderItems = this.orderItems.filter(item => item.orderId.toString() === orderId.toString());
      return orderItems.map(oi => {
        const item = this.items.find(i => i.id.toString() === oi.itemId.toString());
        return item ? { ...item, quantity: parseInt(oi.quantity) } : null;
      }).filter(item => item !== null);
    },
    getItemQuantity(orderId, itemId) {
      const orderItem = this.orderItems.find(oi => oi.orderId.toString() === orderId.toString() && oi.itemId.toString() === itemId.toString());
      return orderItem ? orderItem.quantity : 0;
    },
    calculateOrderTotal(orderId) {
      const orderItems = this.getOrderItems(orderId);
      return orderItems.reduce((total, item) => total + (item.price || 0) * this.getItemQuantity(orderId, item.id), 0);
    },
    formatPrice(price) {
      return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');
    },
    getUserFullName(userId) {
      const user = this.users.find(u => u.id.toString() === userId.toString());
      return user ? `${user.firstName} ${user.lastName}` : 'Неизвестный пользователь';
    },
    getUserPhone(userId) {
      const user = this.users.find(u => u.id.toString() === userId.toString());
      return user ? user.phone : 'Неизвестный номер';
    },
    getUserEmail(userId) {
      const user = this.users.find(u => u.id.toString() === userId.toString());
      return user ? user.email : 'Неизвестный email';
    }
  }
}
</script>

<style scoped>
.center {
  margin-top: 10vh;
  margin: 0 auto;
  text-align: center;
}

nav {
  display: flex;
  padding: 30px;
  justify-content: center;
  margin-bottom: 40px;
  width: 100vw;
  background-color: #333;
  margin-left: 10vw;
}

.bl {
  display: block;
}

.shop-toggle {
  margin-right: 5vw;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.order-user {
  font-weight: bold;
}

.user-details {
  font-size: 0.8rem;
  color: #666;
}

.order-status {
  display: flex;
  align-items: center;
}

.order-status button {
  margin-left: 0.5rem;
}

.order-items {
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.item-name {
  font-weight: bold;
}

.item-price {
  color: #666;
}

.item-quantity {
  font-size: 0.8rem;
  color: #666;
}

.order-total {
  text-align: right;
  font-weight: bold;
}

.order-address-container {
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
}

.order-address-toggle {
  display: block;
  width: 100%;
  text-align: left;
  background-color: #f5f5f5;
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

.order-address-toggle:hover {
  background-color: #e0e0e0;
}

.order-address {
  margin-top: 10px;
  padding: 10px;
}

.order-address-items{
  font-size: 20px;
  margin-bottom: 6px;
}
</style>