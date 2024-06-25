<template>
  <header class="admin-header">
    <nav class="admin-nav-list">
      <router-link class="btn btn_s btn_full admin-btn headerAccount__item" to="/adminShop">Товары</router-link>
      <router-link class="btn btn_s btn_full admin-btn headerAccount__item" to="/adminOrder">Заказы</router-link>
      <button class="btn btn_s btn_full admin-btn" @click="logout">Выйти</button>
    </nav>
  </header>
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
      window.history.pushState({}, '', '/auth');
    }
</script>

<style scoped>
  .admin-header {
    padding: 20px;
  }
  .admin-nav-list{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .admin-btn{
    width: 200px;
  }
</style>