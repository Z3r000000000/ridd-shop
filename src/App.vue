<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Header from './components/Header.vue';
import AdminHeader from './components/AdminComp/SidebarAdmin.vue';
import Footer from './components/Footer.vue';
</script>

<script>
import { ref, onMounted } from 'vue';
export default {
  name: 'AdminDashboard',
  data() {
    return {
      isAdmin: false
    }
  },
  created() {
    this.checkAdminStatus()
  },
  methods: {
    checkAdminStatus() {
      const userFromStorage = JSON.parse(localStorage.getItem('user'))
      if (userFromStorage && userFromStorage.isAdmin) {
        this.isAdmin = true
      }
    }
  }
}
</script>

<script>
</script>

<template>
  <div >
    <div v-if="!isAdmin">
      <Header/>
      <RouterView />
      <Footer  />
    </div>
    <div v-else class="flex-ad">
      <AdminHeader />
      <RouterView class="ad-cont"/>
    </div>
  </div>
</template>

<style scoped>
  .flex-ad{
    display: flex;
  }
</style>
