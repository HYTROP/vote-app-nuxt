<template>
	<header
		class="flex z-20 w-full bg-indigo-600/90 text-sm py-3 px-2 lg:px-8 sm:py-0 sticky top-0 backdrop-blur-lg"
	>
		<nav
			class="relative w-full mx-auto sm:flex sm:items-center"
			aria-label="Global"
		>
			<div class="flex items-center justify-between">
				<NuxtLink to="/" class="flex-none text-xl font-semibold text-white mx-3"
					>Палитра талантов 2024
				</NuxtLink>
				<!-- бургер -->
				<div class="sm:hidden">
					<button
						@click="toggleMenu"
						:class="!isMenuOpen ? 'open' : ''"
						type="button"
						class="hs-collapse-toggle size-9 flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-white/20 text-white hover:border-white/40 disabled:opacity-50 disabled:pointer-events-none"
						data-hs-collapse="#navbar-collapse-with-animation"
						aria-controls="navbar-collapse-with-animation"
						aria-label="Toggle navigation"
					>
						<svg
							class="hs-collapse-open:hidden flex-shrink-0 size-4"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<line x1="3" x2="21" y1="6" y2="6" />
							<line x1="3" x2="21" y1="12" y2="12" />
							<line x1="3" x2="21" y1="18" y2="18" />
						</svg>
						<svg
							class="hs-collapse-open:block hidden flex-shrink-0 size-4"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M18 6 6 18" />
							<path d="m6 6 12 12" />
						</svg>
					</button>
				</div>
				<!-- бургер end -->
			</div>
			<div
				@click="closeMenu"
				:class="!isMenuOpen ? 'open' : 'hidden'"
				id="navbar-collapse-with-animation"
				class="hs-collapse ml-2 overflow-hidden transition-all duration-500 basis-full grow"
			>
				<div
					class="flex flex-col gap-y-4 gap-x-0 mt-4 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-6 sm:mt-0"
				>
					<NuxtLink
						to="/"
						class="font-medium text-white/[.8] hover:text-white hover:scale-105 hover:transition-all sm:py-6"
						>ГАЛЕРЕЯ
					</NuxtLink>
					<NuxtLink
						to="/favorites"
						class="font-medium text-white/[.8] hover:text-white sm:py-6 hover:scale-105 hover:transition-all"
						>ИЗБРАННОЕ
					</NuxtLink>
					<NuxtLink
						to="/results"
						class="font-medium text-white/[.8] hover:text-white sm:py-6 hover:scale-105 hover:transition-all"
						>РЕЗУЛЬТАТЫ
					</NuxtLink>
					<!-- LOGGING -->
					<NuxtLink
						v-if="!user"
						to="/login"
						class="flex items-center gap-x-2 font-medium text-white/[.8] hover:text-white sm:border-s sm:border-white/[.3] sm:my-6 sm:ps-6"
					>
						<svg
							class="flex-shrink-0 size-4"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
							<circle cx="12" cy="7" r="4" />
						</svg>
						Войти
					</NuxtLink>
					<button
						v-if="user"
						@click="logOut"
						type="button"
						class="flex items-center gap-x-2 font-medium text-white/[.8] hover:text-white sm:border-s sm:border-white/[.3] sm:my-6 sm:ps-6"
					>
						Выход &#8594;
					</button>
				</div>
			</div>
		</nav>
	</header>
</template>
<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();
const errorMsg = ref(null);

async function logOut() {
	try {
		const { error } = await supabase.auth.signOut();
		if (error) throw error;
		router.push('/login');
	} catch (error) {
		errorMsg.value = error.message;
	}
}

const isMenuOpen = ref(true);

const toggleMenu = () => {
	isMenuOpen.value = !isMenuOpen.value;
};
const closeMenu = () => {
	isMenuOpen.value = true;
};
</script>

<style scoped>
@media (min-width: 640px) {
	#navbar-collapse-with-animation {
		display: block;
	}
}
</style>
