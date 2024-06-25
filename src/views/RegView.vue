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
					<span>Регистрация</span>
				</span>
			</div>

			

			<form v-if="!isLoggedIn" action="#" class="regForm">
        <h1 class="h3 section__title textCenter">Регистрация</h1>
      <div class="inputs">
        <div class="input">
          <input
            type="text"
            name="surname"
            v-model="lastName"
            autocomplete="on"
            placeholder="Фамилия"
            required
          />
        </div>
        <div class="input">
          <input
            type="text"
            name="name"
            v-model="firstName"
            autocomplete="on"
            placeholder="Имя"
            required
          />
        </div>
        <div class="input">
          <input
            type="tel"
            name="phone"
            v-model="phone"
            autocomplete="on"
            placeholder="Номер телефона"
            required
          />
        </div>
        <div class="input">
          <input
            type="email"
            name="mail"
            v-model="email"
            autocomplete="on"
            placeholder="Электронная почта"
            required
          />
        </div>
        <div class="input input_pass">
          <input
            type="password"
            name="password"
            v-model="pass"
            placeholder="Пароль"
            autocomplete="on"
            required
          />
          <div class="input__icon">
            <img
              src="../assets/img/show-password.svg"
              alt=""
              class="show"
              title="Показать пароль"
            />
            <img
              src="../assets/img/hide-password.svg"
              alt=""
              class="hide"
              title="Скрыть пароль"
            />
          </div>
        </div>
        <div class="input input_pass">
          <input
            type="password"
            name="repeat-password"
            v-model="confirmPassword"
            placeholder="Повторите пароль"
            autocomplete="on"
            required
          />
          <div class="input__icon">
            <img
              src="../assets/img/show-password.svg"
              alt=""
              class="show"
              title="Показать пароль"
            />
            <img
              src="../assets/img/hide-password.svg"
              alt=""
              class="hide"
              title="Скрыть пароль"
            />
          </div>
        </div>

        <button @click.prevent="registerUser" class="btn btn_full regForm__submit">
          Зарегистрироваться
        </button>

        <label class="checkbox">
          <input type="checkbox" class="checkbox__input" checked />
          <span class="checkbox__label"
            >Ваши личные данные будут использоваться для обработки ваших заказов,
            упрощения вашей работы с сайтом и для других целей, описанных в нашей
            <a href="#" target="_blank">политике конфиденциальности</a></span
          >
        </label>

        <p class="regForm__p">
          Уже есть аккаунт? <router-link to="/auth">Войти</router-link>
        </p>
      </div>
    </form>
    <div v-else class="errorBlock">
				<h1 class="h1 errorBlock__title">Вы уже авторизованы!</h1>
				<p class="h4 errorBlock__subtitle">Можете продолжить использование сайта.</p>

				<div class="buttonWrap center">
					<a href="/" class="btn btn_l">На главную</a>
				</div>
			</div>
		</div>
	</section>
</main>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const firstName = ref('');
    const lastName = ref('');
    const phone = ref('');
    const email = ref('');
    const pass = ref('');
    const confirmPassword = ref('');
    const isLoggedIn = ref(false);
    const loading = ref(false);
    const error = ref('');
    const user = ref(null);
    const router = useRouter();

    const formattedPhone = computed(() => {
      if (phone.value) {
        return `+7 (${phone.value.slice(0, 3)}) ${phone.value.slice(3, 6)}-${phone.value.slice(6)}`;
      }
      return '';
    });

    async function registerUser() {
      if (pass.value !== confirmPassword.value) {
        alert('Пароли не совпадают');
        return;
      }

      if (pass.value.length < 3) {
        alert('Пароль должен быть длиннее 3 символов');
        return;
      } else {
        try {
          const user = {
            firstName: firstName.value,
            lastName: lastName.value,
            phone: formattedPhone.value,
            email: email.value,
            pass: pass.value
          };

          const response = await axios.post('https://ec4cde03eba81a3e.mokky.dev/users', user);
          if (response.status === 201) {
            // Регистрация успешна, сохранить данные пользователя в localStorage
            alert('Регистрация прошла успешно');
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('isLoggedIn', 'true');
            isLoggedIn.value = true;
            window.history.pushState({}, '', '/');
            router.push('/');
          } else if (response.status === 400) {
            // Ошибка регистрации, вывести сообщение об ошибке
            alert(`Ошибка регистрации: ${response.data.message}`);
          }
        } catch (error) {
          console.error('Ошибка при регистрации:', error);
          alert('Произошла ошибка при регистрации. Попробуйте еще раз.');
        }
      }
    }

    function register() {
      isLoggedIn.value = true;
    }

    function saveUser() {
      const phoneNumber = `+7${phone.value.replace(/\D/g, '').slice(-10)}`;

      const user = {
        firstName: firstName.value,
        lastName: lastName.value,
        phone: phoneNumber,
        email: email.value,
        pass: pass.value,
      };

      localStorage.setItem('user', JSON.stringify(user));
      isLoggedIn.value = false;
    }

    function getUser() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        firstName.value = user.firstName;
        lastName.value = user.lastName;
        phone.value = user.phone.slice(2);
        email.value = user.email;
        pass.value = user.pass;
        confirmPassword.value = user.password;
      }
    }

    onMounted(getUser);
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

    return {
      firstName,
      lastName,
      phone,
      email,
      pass,
      confirmPassword,
      isLoggedIn,
      formattedPhone,
      register,
      saveUser,
      registerUser,
    };
  },
};
</script>

<style scoped>
  .pageContent{
  min-height: 27.3vw;
}
</style>