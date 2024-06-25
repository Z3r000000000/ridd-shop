<template>
  <form action="#" class="headerSearch" @submit.prevent="handleSearch">
    <input
      type="text"
      name="s"
      placeholder="Поиск"
      autocomplete="off"
      required
      class="headerSearch__input"
      v-model="searchTerm"
      @input="handleSearchInput"
    />
    <button type="submit" class="headerSearch__submit" title="Искать">
      <img src="../assets/img/search-icon-base.svg" alt="" />
    </button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchTerm: '',
      categories: [],
    };
  },
  methods: {
    handleSearchInput() {
      // Проверяем, находится ли пользователь на странице /shop/:id
      if (this.$route.name === 'catalog') {
        // Если да, то выводим товары из категории
        this.fetchProductsByCategory();
      } else {
        // Если нет, то выводим категории
        this.fetchCategories();
      }
    },
    handleSearch() {
      // Выполняем поиск и переходим на соответствующую страницу
      this.$router.push({ name: 'Shop', query: { search: this.searchTerm } });
    },
    fetchCategories() {
      axios.get('https://ec4cde03eba81a3e.mokky.dev/category')
        .then(response => {
          this.categories = response.data;
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
    },
    fetchProductsByCategory() {
      // Получаем ID категории из текущего маршрута
      const categoryId = this.$route.params.id;
      
      axios.get(`https://ec4cde03eba81a3e.mokky.dev/items?title=${this.searchTerm}&categoryId=${categoryId}`)
        .then(response => {
          // Отображаем продукты из категории
          this.products = response.data;
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    },
  },
};
</script>