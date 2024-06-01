<template>
	<div
		class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
	>
		<div class="sm:mx-auto sm:w-full sm:max-w-sm">
			<h2
				class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
			>
				Восстановление пароля
				<br />
				Введите Email
			</h2>
		</div>
		<p class="mt-2 text-center text-sm text-red-600">
			{{ errorMsg }}
		</p>

		<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<form class="space-y-6" @submit.prevent="forgotPassword">
				<div>
					<label
						for="email"
						class="block text-sm font-medium leading-6 text-gray-900"
						>Email</label
					>
					<div class="mt-2">
						<input
							id="email"
							v-model="email"
							name="email"
							type="email"
							autocomplete="email"
							required="true"
							class="py-3 px-4 block w-full rounded-lg text-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
						/>
					</div>
				</div>

				<div>
					<button
						type="submit"
						class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800 focus:outline-none focus:ring-gray-600 transition duration-300 transform hover:scale-105"
					>
						Войти
					</button>
					<div class="mt-6 text-center">
						Нет аккаунта?
						<NuxtLink
							to="/signup"
							class="text-indigo-600 decoration-2 hover:underline font-small focus:outline-none focus:ring-1 focus:ring-indigo-200"
						>
							Регистрация
						</NuxtLink>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
const supabase = useSupabaseClient();
const router = useRouter();

const email = ref('');
const password = ref('');
const errorMsg = ref('');

async function forgotPassword() {
	try {
		const { error } = await supabase.auth.resetPasswordForEmail(email.value);
		if (error) {
			throw error;
		}
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
