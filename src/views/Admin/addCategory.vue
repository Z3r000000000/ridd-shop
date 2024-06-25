<template>
  <div class="add-category">
    <h3>Добавить новую категорию</h3>
    <div class="form-group">
      <label for="categoryName">Название категории:</label>
      <input type="text" id="categoryName" v-model="categoryName" placeholder="Введите название категории" />
    </div>
    <div class="form-group">
      <label for="categoryImage">Картинка категории URL:</label>
      <input type="text" id="categoryImage" v-model="categoryImage" placeholder="Введите URL картинки" />
    </div>
    <button @click="addCategory" :disabled="!categoryName || !categoryImage">Добавить</button>
  </div>
</template>

<script>
export default {
  name: 'AddCategory',
  data() {
    return {
      categoryName: '',
      categoryImage: ''
    }
  },
  methods: {
    addCategory() {
      // Создание новой категории на сервере
      fetch('https://ec4cde03eba81a3e.mokky.dev/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.categoryName,
          image: this.categoryImage
        })
      })
      .then(response => {
        if (response.ok) {
          // Очистка полей формы после успешного добавления
          this.categoryName = '';
          this.categoryImage = '';
          // Вызов callback-функции для обновления списка категорий
          this.$emit('categoryAdded');
        } else {
          console.error('Error adding category:', response.status, response.statusText);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }
}
</script>

<style scoped>
.add-category {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 4px;
  margin-left: 7vw;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>