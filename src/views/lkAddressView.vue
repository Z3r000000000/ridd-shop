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
					<span>
						<a href="lk.html">Мой аккаунт</a>
					</span>
					/
					<span>Адреса доставки</span>
				</span>
			</div>

			<h1 class="h3 section__title">Мой аккаунт</h1>

			<div class="account">

				<div class="account__content">
					<h1 class="h4 account__title">Адреса доставки</h1>

					<div class="addressCards">
						<div class="addressCard main">
							<a href="#" class="addressCard__delete" title="Удалить">
								<img src="../assets/img/close.svg" alt="">
							</a>
							<p class="addressCard__title">Основной</p>
							<p class="addressCard__address">Россия, г. Москва, ул. Малая Грузинская, д.24, кор. 3, кв. 115</p>
							<div class="addressCard__buttons">
								<a href="#" class="addressCard__btn">Изменить</a>
							</div>
						</div>
						<div class="addressCard">
							<a href="#" class="addressCard__delete" title="Удалить">
								<img src="../assets/img/close.svg" alt="">
							</a>
							<p class="addressCard__title">Дополнительный</p>
							<p class="addressCard__address">Россия, г. Рязань, пр-д. Машиностроителей, д.4, кв. 46</p>
							<div class="addressCard__buttons">
								<a href="#" class="addressCard__btn">Сделать основным</a>
								<a href="#" class="addressCard__btn">Изменить</a>
							</div>
						</div>
					</div>

					<form action="#" class="accountForm">
						<p class="h5 accountForm__title">Добавление адреса</p>

						<div class="inputs">
							<div class="input">
								<input type="text" name="country" placeholder="Страна" autocomplete="off" required>
							</div>
							<div class="input">
								<input type="text" name="city" placeholder="Город" autocomplete="off" required>
							</div>
							<div class="input">
								<input type="text" name="street" placeholder="Улица" autocomplete="off" required>
							</div>
							<div class="input input_third">
								<input type="text" name="house" placeholder="Дом" autocomplete="off" required>
							</div>
							<div class="input input_third">
								<input type="text" name="korpus" placeholder="Корпус" autocomplete="off" required>
							</div>
							<div class="input input_third">
								<input type="text" name="flat" placeholder="Квартира" autocomplete="off" required>
							</div>

							<button type="submit" class="btn btn_full accountForm__submit">Добавить</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
</main>
</template>

<script>

</script>

<style scoped>
  .pageContent{
  min-height: 27.3vw;
}
</style>