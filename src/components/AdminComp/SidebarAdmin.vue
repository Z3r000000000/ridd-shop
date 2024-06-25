<template>
  <div class="container">
    <div class="sidebar">
      <ul class="sidebar-menu">
        <li class="sidebar-item" v-for="item in sidebarItems" :key="item.id">
          <router-link :to="item.link" class="sidebar-link">{{ item.title }}</router-link>
        </li>
        <div class="sidebar-item sidebar-link" @click="logout">
          Выйти
        </div>
      </ul>
    </div>
    <!-- <div class="content">
      Ваш основной контент
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
      function logout() {
        const isLoggedIn = ref(false);
        const user = ref(null);
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      isLoggedIn.value = false;
      user.value = null;
      window.location.reload();
    }
</script>

<script>
export default {
  name: 'SidebarLayout',
  data() {
    return {
      sidebarItems: [
        { id: 1, title: 'Товары', link: '/adminShop' },
        { id: 2, title: 'Заказы', link: '/adminOrder' },
      ]
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  position: fixed;

}

.sidebar {
  background-color: #333;
  color: #fff;
  padding: 20px;
  width: 200px;
}

.sidebar-menu {
  list-style-type: none;
  padding: 0;
  margin-top: 3vh;
}

.sidebar-item {
  margin-bottom: 3vh;
  cursor: pointer; 
  font-size: 30px;
}

.sidebar-link {
  color: #fff;
  text-decoration: none;
}

.sidebar-link:hover {
  color: #ccc;
}

.content {
  flex-grow: 1;
  padding: 20px;
}
</style>