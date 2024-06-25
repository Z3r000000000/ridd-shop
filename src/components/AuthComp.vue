<template>
  <section v-if="isAdmin" class="errorSection">
		<div class="wrapper">
			<div class="errorBlock">
				<h1 class="h1 errorBlock__title">Приветствую, админ!</h1>
				<p class="h4 errorBlock__subtitle">Можете проводить настройку сайта через навигационное меню.</p>
			</div>
		</div>
	</section>
  <section v-if="!isAdmin" class="errorSection">
		<div class="wrapper">
			<div class="errorBlock">
				<h1 class="h1 errorBlock__title">Вы вошли!</h1>
				<p class="h4 errorBlock__subtitle">Можете продолжить использование сайта.</p>

				<div class="buttonWrap center">
					<a href="/" class="btn btn_l">На главную</a>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isAdmin: false
    }
  },
  created() {
    this.checkAdminStatus()
  },
  methods: {
    checkAdminStatus() {
      const user = JSON.parse(localStorage.getItem('user'))
      this.isAdmin = user && user.isAdmin
    }
  }
}
</script>

<style>

</style>