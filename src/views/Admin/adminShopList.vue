<template>
  <div id="sus">
    <div class="category-filter">
      <label for="category-select">Фильтр по категории:</label>
      <select id="category-select" v-model="selectedCategory" @change="filterItems">
        <option value="all">Все категории</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>
    <div class="shop-item-List" v-if="filteredItems.length > 0">
      <div v-for="(item, index) in filteredItems" :key="item.id" class="shop-item">
        <div class="shop-item-info">
          <img :src="item.image" class="item-image" />
          <h3>{{ item.title }}</h3>
          <p>{{ item.price }} руб.</p>
          <p>Категория: {{ getCategoryName(item.categoryId) }}</p>
        </div>
        <div class="item-actions">
          <button class="" @click="showEditModal(item)">Изменить</button>
          <button class="" @click="deleteItem(index)">Удалить</button>
        </div>
      </div>
    </div>
    <div class="container" v-else>
    <h1 class="h1 errorBlock__title center">Таких заказов нет.</h1>
  </div>



    <transition name="modal">
      <div v-if="showModal && editedItem" class="modal">
        <div class="modal-content">
          <span class="close-button" @click="closeModal">&times;</span>
          <h2>Редактирование товара</h2>
          <input v-model="editedItem.title" placeholder="Название" />
          <input v-model="editedItem.image" placeholder="URL изображения" />
          <input v-model="editedItem.price" type="number" placeholder="Цена" />
          <select class="sel" v-model="editedItem.categoryId">
            <option v-for="category in categories" :value="category.id" :key="category.id">
              {{ category.name }}
            </option>
          </select>
          <button class="cuc" @click="saveItem(editedItem)">Сохранить</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      items: [],
      categories: [],
      showModal: false,
      editedItem: null,
      selectedCategory: "all",
      filteredItems: []
    };
  },
  watch: {
    items() {
      this.filterItems();
    }
  },
  mounted() {
    this.fetchItems();
    this.fetchCategories();
  },
  methods: {
    fetchItems() {
      fetch("https://ec4cde03eba81a3e.mokky.dev/items")
        .then(response => response.json())
        .then(data => {
          this.items = data;
        })
        .catch(error => {
          console.error("Ошибка при получении данных:", error);
        });
    },
    fetchCategories() {
      fetch("https://ec4cde03eba81a3e.mokky.dev/category")
        .then(response => response.json())
        .then(data => (this.categories = data));
    },
    showEditModal(item) {
      this.editedItem = {
        id: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
        categoryId: item.categoryId
      };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.editedItem = null;
    },
    filterItems() {
      if (this.selectedCategory === "all") {
        this.filteredItems = this.items;
      } else {
        this.filteredItems = this.items.filter(
          item => item.categoryId === this.selectedCategory
        );
      }
    },
    async saveItem(editedItem) {
  try {
    const response = await fetch(
      `https://ec4cde03eba81a3e.mokky.dev/items/${editedItem.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: editedItem.title,
          image: editedItem.image,
          price: editedItem.price,
          categoryId: editedItem.categoryId
        })
      }
    );

    if (response.ok) {
      const updatedItem = await response.json();
      const itemIndex = this.items.findIndex(item => item.id === updatedItem.id);
      if (itemIndex !== -1) {
        this.items.splice(itemIndex, 1, updatedItem);
      } else {
        this.items.push(updatedItem);
      }
      this.filterItems();
      this.closeModal();
    } else {
      console.error("Error updating item:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
},
async deleteItem(index) {
  try {
    const item = this.items[index];
    const response = await fetch(
      `https://ec4cde03eba81a3e.mokky.dev/items/${item.id}`,
      {
        method: "DELETE"
      }
    );

    if (response.ok) {
      this.items.splice(index, 1);
      this.filterItems();
    } else {
      console.error(
        "Error deleting item:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error:", error);
  }
},
    getCategoryName(categoryId) {
      const category = this.categories.find(c => c.id === categoryId);
      return category ? category.name : "Неизвестная категория";
    }
  }
};
</script>

<style scoped>
/* Стили для товаров и модального окна */

.container{
  margin-left: 7vw;
  margin-right: 7vw;
}

.sel{
  padding: 10px;
  border: 1px #111 solid;
  margin: 10px;
  border-radius: 20px;
}

.category-filter{
margin-left:7vw;
}

.btn-ed{
  width: 10vw;
  font-size: 10px;
}

.shop-item-List {
  margin-left: 10vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  margin-bottom: 50px;
}

.shop-item {
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  width: 20vw;
  flex-direction: column;
}

.shop-item-info {
  padding: 20px;
  flex-grow: 1;
}

.item-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 30px;
  padding: 15px;
}

.shop-item h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.shop-item p {
  margin-bottom: 5px;
}

.item-actions {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-top: 1px solid #f0f0f0;
}

.cuc{
  background-color: #6C0FBC;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.item-actions button {
  background-color: #6C0FBC;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.item-actions button:hover {
  background-color: #983aeb;
}

.modal {
  position: fixed;
  z-index: 1000;
  left: 100;
  top: 100;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal-content>input{
  margin: 10px;
}

.close-button {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  
}

.close-button:hover,
.close-button:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>