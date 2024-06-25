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
					<span>Личные данные</span>
				</span>
			</div>

			<h1 class="h3 section__title">Мой аккаунт</h1>

			<div class="account">

				<div class="account__content">
					<h1 class="h4 account__title">Личные данные</h1>

					<form action="#" class="accountForm">
						<div class="inputs">
							<div class="input">
								<input type="text" name="surname" placeholder="Фамилия" autocomplete="off" required>
							</div>
							<div class="input">
								<input type="text" name="name" placeholder="Имя" autocomplete="off" required>
							</div>

							<div class="accountForm__dateGender">
								<div class="input accountForm__birthDate">
									<input type="text" name="birth-date" placeholder="Дата рождения">
								</div>

								<div class="accountForm__gender">
									<label class="radio">
										<input type="radio" name="gender" value="male" class="radio__input" checked>
										<span class="radio__label">Мужской</span>
									</label>
									<label class="radio">
										<input type="radio" name="gender" value="female" class="radio__input">
										<span class="radio__label">Женский</span>
									</label>
								</div>
							</div>							

							<div class="input">
								<input type="tel" name="phone" placeholder="Номер телефона" autocomplete="off" required>
							</div>
							<div class="input">
								<input type="email" name="mail" placeholder="Электронная почта" autocomplete="off" required>
							</div>

							<button type="submit" class="btn btn_full accountForm__submit">Сохранить</button>
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