<script>
export default {
    data() {
        return {
            items: [],
            categories: [],
            displayedItems: []
        }
    },
    mounted() {
        this.fetchCategories();
        this.fetchItems();
    },
    methods: {
        fetchCategories() {
            fetch('https://ec4cde03eba81a3e.mokky.dev/category')
                .then(response => response.json())
                .then(data => {
                    this.categories = data;
                    this.getOneItemPerCategory();
                })
                .catch(error => {
                    console.error('Ошибка при получении категорий:', error);
                });
        },
        fetchItems() {
            fetch('https://ec4cde03eba81a3e.mokky.dev/items')
                .then(response => response.json())
                .then(data => {
                    this.items = data;
                    this.getOneItemPerCategory();
                })
                .catch(error => {
                    console.error('Ошибка при получении товаров:', error);
                });
        },
        getOneItemPerCategory() {
            if (this.categories.length > 0 && this.items.length > 0) {
                this.displayedItems = [];
                this.categories.forEach(category => {
                    const item = this.items.find(item => item.categoryId === category.id);
                    if (item) {
                        this.displayedItems.push(item);
                    }
                });
            }
        }
    }
}
</script>

<template>
<main class="pageContent pageContent_noPadB">
    <section class="section mainBanner">
        <div class="wrapper">
            <div class="mainBanner__wrap">
                <div class="mainBannerContent">
                    <div class="mainBannerContent__text">
                        <h1 class="h2 mainBannerContent__title">Первая покупка дешевле в&nbsp;криптовалюте</h1>
                    </div>
                    <div class="mainBannerContent__image">
                        <img src="../assets/img/main-banner-figure.webp" alt="">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="wrapper">
            <h2 class="h3 section__title">Весьма выгодно</h2>

            <div class="productsList">
                <div v-for="product in displayedItems" :key="product.id" class="productsItem">
                    <a href="#" class="productsItem__wishlist" title="Добавить в избранное">
                        <img src="../assets/img/product-wishlist.svg" alt="">
                    </a>
                    <a href="#" class="productsItemImage">
                        <span class="productsItemImage__padding"></span>
                        <img :src="product.image" :alt="product.title">
                    </a>
                    <a href="#" class="productsItem__title">{{ product.title }}</a>
                    <p class="productsItem__price">{{ product.price }} ₽</p>
                    <div class="productsItem__cart">
                        <a href="#" class="btn btn_s btn_full">В корзину</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

</main>
</template>

<style scoped>
.pageContent{
  min-height: 27.3vw;
}
</style>