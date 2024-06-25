<script>
import { ref } from 'vue'

export default {
  setup() {
    const title = ref('')
    const image = ref('')
    const price = ref(0)
    const categoryId = ref(0)
    const categories = ref([])

    async function fetchCategories() {
      try {
        const response = await fetch('https://ec4cde03eba81a3e.mokky.dev/category')
        categories.value = await response.json()
      } catch (error) {
        console.error('Ошибка получения категорий:', error)
      }
    }

    async function createItem() {
      try {
        const response = await fetch('https://ec4cde03eba81a3e.mokky.dev/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: title.value,
            image: image.value,
            price: price.value,
            categoryId: categoryId.value
          })
        })

        if (!response.ok) {
          throw new Error(await response.json())
        }

        // Сброс полей формы
        title.value = ''
        image.value = ''
        price.value = 0
        categoryId.value = 0
      } catch (error) {
        console.error('Ошибка при создании товара:', error)
      }
    }

    fetchCategories()

    return {
      title,
      image,
      price,
      categoryId,
      categories,
      createItem
    }
  }
}
</script>

<template>
  <div class="main-block">
    <form @submit.prevent="createItem">
      <h1>Добавить новый товар</h1>
      <div>
        <label for="title">Название:</label>
        <input id="title" v-model="title" type="text" required>
      </div>
      <div>
        <label for="image">URL картинки:</label>
        <input id="image" v-model="image" type="text" required>
      </div>
      <div style="margin-bottom: 20px;">
        <label for="price">Цена:</label>
        <input id="price" v-model="price" type="number" required>
      </div>
      <div id="cat">
        <label for="category">Категория:</label>
        <select id="category" v-model="categoryId" required>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </div>
      <button class="btn btn_s btn_full" type="submit">Добавить</button>
    </form>
  </div>
</template>

<style scoped>
.main-block{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
}
form {
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
}
form>*{
  margin-top: 30px;
  text-align: center;
  font-size: 30px;
}
form>*>input{
  text-align: center;
}

#cat {
  display: contents;
  
}

#category{

  text-align: center;
  border-radius: 30px;
  padding: 15px;
}

</style>