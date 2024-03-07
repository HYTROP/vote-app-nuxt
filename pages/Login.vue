<template>
	<div
		class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
		<div class="sm:mx-auto sm:w-full sm:max-w-sm">
			<h2
				class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
				Войдите в аккаунт
			</h2>
		</div>
		<p class="mt-2 text-center text-sm text-red-600">
			{{ errorMsg }}
		</p>

		<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<form @submit.prevent="signIn" class="space-y-6">
				<div>
					<label
						for="email"
						class="block text-sm font-medium leading-6 text-gray-900"
						>Email</label
					>
					<div class="mt-2">
						<input
							v-model="email"
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							required="true"
							class="py-3 px-4 block w-full rounded-lg text-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 focus:ring-1 text-gray-800" />
					</div>
				</div>

				<div>
					<div class="flex items-center justify-between">
						<label
							for="password"
							class="block text-sm font-medium leading-6 text-gray-900"
							>Пароль</label
						>
						<div class="text-sm">
							<a
								href="#"
								class="font-semibold text-indigo-600 hover:text-indigo-500"
								>Забыли пароль?</a
							>
						</div>
					</div>
					<div class="mt-2">
						<input
							v-model="password"
							id="password"
							name="password"
							type="password"
							autocomplete="current-password"
							required="true"
							class="py-3 px-4 block w-full rounded-lg text-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 focus:ring-1 text-gray-800" />
					</div>
				</div>

				<div>
					<button
						type="submit"
						class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
						Войти
					</button>
					<div class="mt-6 text-center">
						Нет аккаунта?
						<NuxtLink
							to="/signup"
							class="text-indigo-600 decoration-2 hover:underline font-small focus:outline-none focus:ring-1 focus:ring-indigo-200"
							>Регистрация</NuxtLink
						>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
const client = useSupabaseClient();
const router = useRouter();

const email = ref('');
const password = ref('');
const errorMsg = ref('');

async function signIn() {
	try {
		const { error } = await client.auth.signInWithPassword({
			email: email.value,
			password: password.value,
		});
		if (error) throw error;

		router.push('/');
	} catch (error) {
		errorMsg.value = error.message;
	}
}

useHead({
	title: 'Палитра талантов | Логин',
	meta: [
		{
			name: 'description',
			content: 'Логин',
		},
	],
});
</script>
