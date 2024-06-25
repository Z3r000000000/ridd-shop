<template>
<div class="mobileHeader">
	<div class="wrapper">
		<div class="mobileHeader__wrap">
			<div class="mobileHeader__side">
				<div class="burger">
					<img src="../assets/img/burger.svg" alt="">
				</div>

				<div class="mobileLogo">
					<img src="../assets/img/mobile-logo-icon.svg" alt="" class="mobileLogo__image">
					<span class="mobileLogo__text">Ridd</span>
				</div>
			</div>

			<div class="mobileHeader__side">				
				<a href="#" class="mobileHeaderSearchIcon">
					<svg width="24" height="24">
						<use xlink:href="../assets/img/sprites.svg#search"></use>
					</svg>
				</a>

				<router-link to="#" class="mobileHeaderIcon">
					<img src="../assets/img/account-icon-white.svg" alt="">
				</router-link>
				<router-link to="/checkout/:id" class="mobileHeaderIcon">
					<img src="../assets/img/mobile-header-wishlist-icon.svg" alt="">
				</router-link>
				<router-link to="#" class="mobileHeaderIcon">
					<img src="../assets/img/mobile-header-cart-icon.svg" alt="">
				</router-link>				
			</div>
		</div>
	</div>
</div>

<form action="#" class="mobileSearch">
	<div class="wrapper">
		<div class="mobileSearch__wrap">
			<input type="text" name="s" placeholder="Поиск" autocomplete="off" required class="mobileSearch__input">
			<button type="submit" class="mobileSearch__submit" title="Искать">
				<img src="../assets/img/search-icon-base.svg" alt="">
			</button>
		</div>
	</div>	
</form>

<div class="mobMenuOverlay"></div>

<section class="mobMenu">
	<div class="mobMenuBlock">
		<div class="mobMenuBlockTitle">
			<p class="mobMenuBlockTitle__text">Магазин</p>
			<img src="../assets/img/mob-menu-side-arrow.svg" alt="" class="mobMenuBlockTitle__arrow">
		</div>
		<ul class="mobMenuBlockList">
			<li><a href="#">Смартфоны</a></li>
			<li><a href="#">Планшеты</a></li>
			<li><a href="#">ПК и ноутбуки</a></li>
			<li><a href="#">Аксессуары</a></li>
			<li><a href="#">Наушники</a></li>
			<li><a href="#">Мышки</a></li>
			<li><a href="#">Клавиатуры</a></li>
			<li><a href="#">Игровые консоли</a></li>
			<li><a href="#">Офисная мебель</a></li>
			<li><a href="#">Микрофоны</a></li>
			<li><a href="#">Игровые стулья</a></li>
			<li><a href="#">Новинки</a></li>
		</ul>
	</div>

	<div class="mobMenuBlock">
		<div class="mobMenuBlockTitle">
			<p class="mobMenuBlockTitle__text">Подборки товаров</p>
			<img src="../assets/img/mob-menu-side-arrow.svg" alt="" class="mobMenuBlockTitle__arrow">
		</div>
		<ul class="mobMenuBlockList">
			<li><a href="#">Apple</a></li>
			<li><a href="#">Gamers</a></li>
			<li><a href="#">В хороший офис</a></li>
			<li><a href="#">Для творческой натуры</a></li>
			<li><a href="#">В быту</a></li>
		</ul>
	</div>

	<div class="mobMenuBlock">
		<div class="mobMenuBlockTitle">
			<p class="mobMenuBlockTitle__text">Сервисы</p>
			<img src="../assets/img/mob-menu-side-arrow.svg" alt="" class="mobMenuBlockTitle__arrow">
		</div>
		<ul class="mobMenuBlockList">
			<li><a href="#">Trade-in</a></li>
			<li><a href="#">Ремонт</a></li>
			<li><a href="#">Сборка ПК</a></li>
		</ul>
	</div>



	<div class="mobMenu__items">
		<a href="#" class="mobMenuItem">
			<img src="../assets/img/account-icon-dark.svg" alt="" class="mobMenuItem__icon">
			<span class="mobMenuItem__text">Мой аккаунт</span>
		</a>

		<a href="#" class="mobMenuItem">
			<img src="../assets/img/header-wishlist-icon.svg" alt="" class="mobMenuItem__icon">
			<span class="mobMenuItem__text">Корзина</span>
		</a>

		<a href="#" class="mobMenuItem">
			<img src="../assets/img/header-cart-icon.svg" alt="" class="mobMenuItem__icon">
			<span class="mobMenuItem__text">Избранное</span>
		</a>
	</div>

	<div class="mobMenuContacts">
		<a href="tel:+7 (965) 311-22-51" class="mobMenuContacts__phone">+7 (965) 311-22-51</a>
		<div class="mobMenuContacts__links">
			<a href="https://t.me/Z3r000000000" target="_blank" class="mobMenuContacts__link" title="Telegram">
				<img src="../assets/img/telegram-dark.svg" alt="">
			</a>
		</div>
	</div>
</section>

<section class="headerHead">
	<div class="wrapper">
		<div class="headerHead__wrap">
			<div class="headerHead__left">
				<a href="tel:++7 (965) 311-22-51" class="headerHead__phone">+7 (965) 311-22-51</a>
				<div class="headerHead__links">
					<a href="https://t.me/Z3r000000000" target="_blank" class="headerHead__link" title="Telegram">
						<img src="../assets/img/telegram-white.svg" alt="">
					</a>
				</div>
			</div>

			<router-link v-if="!isLoggedIn" to="/auth" class="headerAccount">
				<span class="headerAccount__top">
					<img src="../assets/img/account-icon-white.svg" alt="" class="headerAccount__icon">
					<span class="headerAccount__text">Войти в аккаунт</span>
				</span>
			</router-link>

			<div v-else class="headerAccount">
				<div class="headerAccount__top">
					<img src="../assets/img/account-icon-white.svg" alt="" class="headerAccount__icon">
					<div class="headerAccount__text">Мой аккаунт</div>
				</div>
				<div class="headerAccount__list">
					<router-link to="/lkOrder" class="headerAccount__item">Мои заказы</router-link>
					<router-link to="/lkPass" class="headerAccount__item">Сменить пароль</router-link>

					<a href="#" class="headerAccountLogout">
						<span class="headerAccountLogout__icon">
							<svg width="20" height="20">
								<use xlink:href="../assets/img/sprites.svg#logout"></use>
							</svg>
						</span>
						<span @click="logout" class="headerAccountLogout__text">Выйти из аккаунта</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="headerCenter">
	<div class="wrapper">
		<div class="headerCenter__wrap">
			<a href="/" class="headerLogo">
				<img src="../assets/img/logo-icon.svg" alt="" class="headerLogo__image">
				<span class="headerLogo__text">Ridd</span>
			</a>

			<div class="headerCenter__links">
				<router-link to="/wishlist/:id" class="headerCenterLink" title="Избранное">
					<img src="../assets/img/header-wishlist-icon.svg" alt="" class="headerCenterLink__icon">
				</router-link>
				<router-link to="/cart" class="headerCenterLink" title="Корзина">
					<img src="../assets/img/header-cart-icon.svg" alt="" class="headerCenterLink__icon">
				</router-link>
			</div>
		</div>
	</div>
</section>

<section class="headerBottom">
	<div class="wrapper">
		<nav class="headerMenu">
			<router-link to="/shop" class="headerMenuItem">
				<span class="headerMenuItem__text">Магазин</span>
			</router-link>
			<router-link to="/about" class="headerMenuItem">
				<span class="headerMenuItem__text">О нас</span>
			</router-link>
		</nav>
	</div>
</section>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const isLoggedIn = ref(false);
    const user = ref(null);
	const username = ref(null);
	const router = useRouter();

    function logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      isLoggedIn.value = false;
      user.value = null;
      window.location.reload();
	  router.push('/auth');
    }


          // Проверка авторизации
		  const userFromStorage = localStorage.getItem('user');
    const isLoggedInString = localStorage.getItem('isLoggedIn');
    const isLoggedInBool = isLoggedInString === 'true';
    if (userFromStorage && isLoggedInBool) {
      isLoggedIn.value = true;
      username.value = JSON.parse(userFromStorage);
	  console.log(username.value.firstName);
    }



    return {
      isLoggedIn,
      user,
      logout,
    };
  },
};
</script>

<style scoped>

</style>