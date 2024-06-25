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
					<span>Магазин</span>
				</span>
			</div>

			<h1 class="h3 section__title">Магазин</h1>

			<div class="shopWrap">
				<div v-for="category in categories" :key="category.id" @click="goToCategory(category.id)" class="shopItem">
				<span class="shopItem__image">
					<span class="shopItem__padding"></span>
					<img :src="category.image" alt="">
				</span>
				<span class="h5 shopItem__title">{{ category.name }}</span>
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
      categories: []
    }
  },
  mounted() {
    this.fetchCategories()
  },
  methods: {
    fetchCategories() {
      fetch('https://ec4cde03eba81a3e.mokky.dev/category')
        .then(response => response.json())
        .then(data => {
          this.categories = data
        })
        .catch(error => {
          console.error('Error fetching categories:', error)
        })
    },
	goToCategory(categoryId) {
      this.$router.push(`/shop/${categoryId}`)
    }
  }
}
</script>

<style scoped>
  .pageContent{
  min-height: 27.3vw;
}
</style>