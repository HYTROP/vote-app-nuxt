<template>
	<div class="bg-gray-100 flex h-full items-center">
		<main class="w-full max-w-md mx-auto p-2">
			<div>
				<div class="p-4 sm:p-7">
					<div class="text-center">
						<h1 class="block text-2xl font-bold text-gray-800">Регистрация</h1>
						<p class="mt-2 text-sm text-gray-600">
							Уже зарегистрированы?
							<NuxtLink
								to="/login"
								class="text-blue-600 decoration-2 hover:underline font-medium focus:outline-none focus:ring-1 focus:ring-indigo-200">
								Войти
							</NuxtLink>
						</p>
					</div>

					<div class="mt-5">
						<!-- Form -->
						<form @submit.prevent="signUp" method="POST">
							<div class="grid gap-y-4">
								<div>
									<label for="email" class="block text-sm text-black mb-2"
										>Ваше имя</label
									>
									<div class="relative">
										<input
											type="first-name"
											id="first-name"
											name="first-name"
											v-model="firstName"
											class="py-3 px-4 block w-full rounded-lg text-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 focus:ring-1 text-gray-800"
											required
											aria-describedby="email-error" />
									</div>
								</div>
								<div>
									<label for="email" class="block text-sm text-black mb-2"
										>Фамилия</label
									>
									<div class="relative">
										<input
											type="last-name"
											id="last-name"
											name="last-name"
											v-model="lastName"
											class="py-3 px-4 block w-full rounded-lg text-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 focus:ring-1 text-gray-800"
											required
											aria-describedby="email-error" />
									</div>
								</div>
								<div>
									<label for="email" class="block text-sm text-black mb-2"
										>Email адрес</label
									>
									<div class="relative">
										<input
											type="email"
											id="email"
											name="email"
											v-model="email"
											class="py-3 px-4 block w-full rounded-lg text-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 focus:ring-1 text-gray-800"
											required
											aria-describedby="email-error" />
									</div>
									<p class="hidden text-xs text-red-600 mt-2" id="email-error">
										Please include a valid email address so we can get back to
										you
									</p>
								</div>

								<div>
									<label for="password" class="block text-sm mb-2 text-black"
										>Придумайте пароль
										<span class="text-xs text-neutral-600">
											(больше 6 символов)
										</span>
									</label>
									<div class="relative">
										<input
											type="password"
											v-model="password"
											id="password"
											name="password"
											class="py-3 px-4 block w-full rounded-lg text-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 focus:ring-1 text-gray-800"
											minlength="6"
											required
											aria-describedby="password-error" />
									</div>
								</div>

								<div class="text-green-600 animate__animated animate__fadeIn">
									{{ successMsg }}
								</div>
								<button
									type="submit"
									class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600">
									Зарегистрироваться
								</button>
							</div>
						</form>
						<!-- End Form -->
						{{ errorMsg }}
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup>
const client = useSupabaseClient();
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref(null);
const errorMsg = ref(null);
const successMsg = ref('');

async function signUp() {
	try {
		const { data, error } = await client.auth.signUp({
			firstName: firstName.value,
			lastName: lastName.value,
			email: email.value,
			password: password.value,
			options: {
				emailRedirectTo: 'https://vote-app-nuxt.vercel.app/login',
			},
		});

		if (error) throw error;

		successMsg.value = 'На ваш email было отправлено письмо для подтверждения!';

		const timer = setTimeout(() => {
			router.push('/login');
		}, 2000);

		clearTimeout(timer);

		// clear form
		firstName.value = '';
		lastName.value = '';
		email.value = '';
		password.value = '';
		errorMsg.value = null;
	} catch (error) {
		errorMsg.value = error.message;
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
