<template>
  <div id="app">
    <div class="rar">
      <nav>
        <div class="shop-toggle">
          <button class="btn btn_s btn_full admin-btn" @click="toggleShop">Добавить товар</button>
          <button class="btn btn_s btn_full admin-btn" @click="toggleCategory">Добавить категорию</button>
        </div>
      </nav>
    <transition name="scale-down">
      <AddItems v-if="showShopAdd"/>
    </transition>
    <transition name="scale-down">
      <AddCategory v-if="showCategoryAdd"/>
    </transition>
    <transition name="slide-up-down">
      <ItemList v-if="!showShopAdd && !showCategoryAdd" />
    </transition>
    </div>
  </div>

</template>

<script setup>
  import AddItems from "./addItemsList.vue"
  import AddCategory from './addCategory.vue'
  import ItemList from './adminShopList.vue'
  
</script>
<script>
export default {
  name: "App",
  components: {
    AddItems,
    AddCategory,
    ItemList,
  },
  data() {
    return {
      showShopAdd: false,
      showCategoryAdd: false,
    };
  },
  methods: {
    toggleShop() {
      if (this.showCategoryAdd) {
        this.showCategoryAdd = false;
      }
      this.showShopAdd = !this.showShopAdd;
    },
    toggleCategory() {
      if (this.showShopAdd) {
        this.showShopAdd = false;
      }
      this.showCategoryAdd = !this.showCategoryAdd;
    },
  },
};
</script>
<style>
nav{
  display: flex;
  padding: 30px;
  justify-content: center;
  margin-bottom: 40px;
  width: 100vw;
  background-color: #333;
}

.shop-toggle{
  margin-right: 5vw;
}

.slide-up-down-enter-active,
.slide-up-down-leave-active {
  transition: transform 0.3s ease;
}
.slide-up-down-enter,
.slide-up-down-leave-to {
  transform: translateY(50px);
}

.scale-down-enter-active,
.scale-down-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.scale-down-enter,
.scale-down-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
.scale-down-enter-active {
  transition: all 0.5s ease;
  transform-origin: top;
  opacity: 0;
  transform: scaleY(0);
}

.scale-down-enter-to {
  opacity: 1;
  transform: scaleY(1);
}

.scale-down-leave-active {
  transition: all 0.5s ease;
  transform-origin: top;
}

.scale-down-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
.rar{
  width: 85vw;
  margin-left: 10vw;
}
.admin-btn{
    width: 200px;
  }
</style>