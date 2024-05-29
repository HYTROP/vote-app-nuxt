<template>
	<div class="bg-gray-100 flex h-full items-center">
		<main class="w-full max-w-md mx-auto p-2">
			<div>
				<div class="p-4 sm:p-7">
					<div class="text-center">
						<h1 class="block text-2xl font-bold text-gray-800">Регистрация</h1>
						<p class="mt-2 text-md text-gray-600">
							Уже зарегистрированы?
							<NuxtLink
								to="/login"
								class="text-blue-600 decoration-2 hover:underline font-medium focus:outline-none focus:ring-1 focus:ring-indigo-200"
							>
								Войти
							</NuxtLink>
						</p>
					</div>

					<div class="mt-5">
						<!-- Form -->
						<form @submit.prevent="signUp">
							<div class="grid gap-y-4">
								<div>
									<label for="userName" class="block text-sm text-black mb-2"
										>Ваше ФИО</label
									>
									<div class="relative">
										<input
											id="userName"
											v-model="userName"
											type="userName"
											name="userName"
											class="py-3 px-4 block w-full rounded-lg text-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
											required
											aria-describedby="email-error"
										/>
									</div>
								</div>
								<div>
									<label for="email" class="block text-sm text-black mb-2"
										>Email адрес</label
									>
									<div class="relative">
										<input
											id="email"
											v-model="email"
											type="email"
											name="email"
											class="py-3 px-4 block w-full rounded-lg text-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
											required
											aria-describedby="email-error"
										/>
									</div>
									<p id="email-error" class="hidden text-xs text-red-600 mt-2">
										Пожалуйста, укажите действующий адрес электронной почты
									</p>
								</div>

								<div>
									<label for="password" class="block text-sm mb-2 text-black"
										>Придумайте пароль
										<span class="text-xs text-neutral-600">
											(6 или более символов)
										</span>
									</label>
									<div class="relative">
										<input
											id="password"
											v-model="password"
											type="password"
											name="password"
											class="py-3 px-4 block w-full rounded-lg text-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
											minlength="6"
											required
											aria-describedby="password-error"
										/>
									</div>
								</div>

								<div class="text-green-600 animate__animated animate__fadeIn">
									{{ successMsg }}
								</div>

								<button
									type="submit"
									class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-gray-600"
								>
									Зарегистрироваться
								</button>
							</div>
						</form>
						<!-- End Form -->
						<div class="text-red-600 m-4">
							{{ errorMsg }}
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup>
const router = useRouter();
const supabase = useSupabaseClient();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref(null);
const errorMsg = ref(null);
const successMsg = ref('');

async function signUp() {
	try {
		const { data: userData, error } = await supabase.auth.signUp({
			userName: userName.value,
			email: email.value,
			password: password.value,
			options: {
				emailRedirectTo: 'https://localhost:3000/login',
			},
		});

		if (error) {
			throw error;
		}

		if (userData) {
			const { error } = await supabase
				.from('favorites')
				.insert([
					{
						userName: userData.user.username,
						userID: userData.user.id,
						favoritePhotoURLs: [],
					},
				])
				.select();

			if (error) {
				throw error;
			}
		}

		successMsg.value = 'На ваш email было отправлено письмо для подтверждения!';

		setTimeout(() => {
			router.push({ path: '/login' });
		}, 2000);

		// clear form
		userName.value = '';
		email.value = '';
		password.value = '';
		errorMsg.value = '';
	} catch (error) {
		if (error.code === '23505') {
			errorMsg.value = 'Пользователь с таким email уже существует';
		} else {
			errorMsg.value = error.message;
		}
	}
}

useHead({
	title: 'Палитра талантов | Регистрация',
	meta: [
		{
			name: 'description',
			content: 'Регистрация',
		},
	],
});
</script>
