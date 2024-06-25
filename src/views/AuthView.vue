<template>
<main class="pageContent">
	<section class="section section_noPadT">
		<div class="wrapper">

      <div v-if="!isAdmin" class="crumbs">
				<span>
					<span>
						<a href="/">Главная</a>
					</span>
					/
					<span>Вход</span>
				</span>
			</div>
			

			<form action="#" v-if="!isLoggedIn" class="regForm" @submit.prevent="login">

				<h1 class="h3 section__title textCenter">Вход</h1>
    <div class="inputs">
      <div class="input">
        <input
          type="email"
          name="mail"
          autocomplete="off"
          placeholder="Электронная почта"
          v-model="email"
          required
        />
      </div>
      <div class="input input_pass">
        <input
          :type="showPassword ? 'text' : 'pass'"
          name="pass"
          placeholder="Пароль"
          autocomplete="off"
          v-model="pass"
          required
        />
        <div class="input__icon">
          <img
            src="../assets/img/show-password.svg"
            alt=""
            class="show"
            title="Показать пароль"
            @click="togglePassword"
          />
          <img
            src="../assets/img/hide-password.svg"
            alt=""
            class="hide"
            title="Скрыть пароль"
            @click="togglePassword"
          />
        </div>
      </div>

      <button type="submit" class="btn btn_full regForm__submit">Войти</button>

      <p class="regForm__p">
        Впервые у нас?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
	  <div v-if="error" class="error-message">{{ error }}</div>
    </div>
  </form>
  <auth-comp v-if="isLoggedIn"/>
		</div>
	</section>
</main>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AuthComp from '../components/AuthComp.vue';

export default {
  components: { AuthComp },
  setup() {
    const data = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const email = ref('');
    const pass = ref('');
    const isLoggedIn = ref(false);
    const showPassword = ref(false);
    const user = ref(null);
    const router = useRouter();
    const isAdmin = ref(false);

    async function fetchData() {
      try {
        loading.value = true;
        const response = await fetch('https://ec4cde03eba81a3e.mokky.dev/users');
        const fetchedData = await response.json();

        if (!response.ok) {
          throw new Error(fetchedData.message || 'Something went wrong');
        }

        data.value = fetchedData;
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    }

    async function login() {
		try {
      const userString = localStorage.getItem('user');
    
    const encodedEmail = email.value;
    const encodedPassword = pass.value;

    const response = await fetch(`https://ec4cde03eba81a3e.mokky.dev/users?email=${encodedEmail}&pass=${encodedPassword}`);
      
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    } else{
      window.location.reload();
    }
	console.log(response);

  function checkAdminStatus() {
      const user = JSON.parse(localStorage.getItem('user'))
      const isAdmin = userString && userString.isAdmin
      
    }

        const userData = await response.json();

        if (!response.ok) {
          throw new Error(userData.message || 'Something went wrong');
        }

        if (userData.length > 0 && userData[0].email === email.value && userData[0].pass === pass.value) {
          // Пользователь найден и данные совпадают, разрешить вход

          localStorage.setItem('user', JSON.stringify(userData[0]));
          localStorage.setItem('isLoggedIn', 'true');
          isLoggedIn.value = true;
          user.value = userData[0];
          window.history.pushState({}, '', '/');
        } else {
          // Пользователь не найден или данные не совпадают, запретить вход
          error.value = 'Неверный логин или пароль';
          throw new Error('Invalid email or password');
        }
      } catch (err) {
        error.value = err.message;
      }
    }



    onMounted(() => {
      // Проверяем существование пользователя при загрузке компонента
      const userString = localStorage.getItem('user');
      const isLoggedInString = localStorage.getItem('isLoggedIn');

      const isLoggedInBool = isLoggedInString === 'true';

      if (userString && isLoggedInBool) {
        user.value = JSON.parse(userString);
        isLoggedIn.value = true;
      } else {
        user.value = null;
        isLoggedIn.value = false;
      }
    });

    function togglePassword() {
      showPassword.value = !showPassword.value;
    }

    return {
      data,
      loading,
      error,
      email,
      pass,
      isLoggedIn,
      showPassword,
      user,
      login,
      togglePassword,
      fetchData,
    };
  },
  
};
</script>

<style scoped>
.pageContent{
  min-height: 27.3vw;
}
</style>