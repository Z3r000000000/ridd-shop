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
					<span>Сменить пароль</span>
				</span>
			</div>

			<h1 class="h3 section__title">Мой аккаунт</h1>

			<div class="account">

				<div class="account__content">
					<h1 class="h4 account__title">Сменить пароль</h1>

          <form @submit.prevent="updatePassword" class="accountForm">
            <div class="inputs">
              <div class="input input_pass">
                <input v-model="newPassword" type="password" name="new-password" placeholder="Новый пароль" autocomplete="off" required>
                <div class="input__icon">
                  <img src="../assets/img/show-password.svg" alt="" class="show" title="Показать пароль">
                  <img src="../assets/img/hide-password.svg" alt="" class="hide" title="Скрыть пароль">
                </div>
              </div>
              <div class="input input_pass">
                <input v-model="repeatPassword" type="password" name="repeat-password" placeholder="Повторите новый пароль" autocomplete="off" required>
                <div class="input__icon">
                  <img src="../assets/img/show-password.svg" alt="" class="show" title="Показать пароль">
                  <img src="../assets/img/hide-password.svg" alt="" class="hide" title="Скрыть пароль">
                </div>
              </div>

              <div v-if="error" class="error">{{ error }}</div>
              <div v-if="success" class="success">{{ success }}</div>

              <button type="submit" class="btn btn_full accountForm__submit">Сохранить изменения</button>
            </div>
          </form>
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
      newPassword: '',
      repeatPassword: '',
      error: '',
      success: ''
    }
  },
  methods: {
    async updatePassword() {
      try {
        if (!this.validatePasswords()) {
          return;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(`https://ec4cde03eba81a3e.mokky.dev/users/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ pass: this.newPassword })
        });

        if (response.ok) {
          this.success = 'Пароль успешно изменен!';
          this.error = '';
          this.newPassword = '';
          this.repeatPassword = '';
        } else {
          this.error = 'Ошибка при изменении пароля. Попробуйте снова.';
          this.success = '';
        }
      } catch (error) {
        console.error('Ошибка при обновлении пароля:', error);
        this.error = 'Произошла ошибка. Попробуйте снова позже.';
        this.success = '';
      }
    },
    validatePasswords() {
      if (this.newPassword.length < 3) {
        this.error = 'Пароль должен быть не менее 3 символов.';
        this.success = '';
        return false;
      }

      if (this.newPassword !== this.repeatPassword) {
        this.error = 'Новый пароль и повторный пароль должны совпадать.';
        this.success = '';
        return false;
      }

      this.error = '';
      return true;
    }
  }
}
</script>

<style scoped>
  .pageContent{
  min-height: 27.3vw;
}
</style>