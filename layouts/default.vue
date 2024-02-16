<template>
	<header>
		<nav>
			<div>
				<div
					class="bg-neutral-200/30 w-full fixed top-0 left-0 h-full p-4 shadow-lg">
					<nav
						class="flex items-center absolute top-[33%] left-0 overflow-x-clip">
						<ul class="pl-10">
							<li
								class="text-lg font-semibold flex items-center justify-center cursor-pointer m-6 text-indigo-500 hover:text-cyan-700 transition duration-500 hover:outline decoration-indigo-500 p-2 hover:scale-110">
								<NuxtLink to="/">ГАЛЕРЕЯ</NuxtLink>
							</li>
							<li
								class="text-lg font-semibold flex items-center justify-center cursor-pointer m-6 text-indigo-500 hover:text-cyan-700 transition duration-500 hover:outline decoration-indigo-500 p-2 hover:scale-110">
								<NuxtLink to="/favorites">ИЗБРАННОЕ</NuxtLink>
							</li>
							<li
								class="text-lg font-semibold cursor-pointer m-6 text-indigo-500 hover:text-cyan-700 transition duration-500 hover:outline decoration-indigo-500 p-2 hover:scale-110">
								<NuxtLink to="/results">РЕЗУЛЬТАТЫ</NuxtLink>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</nav>
	</header>

	<div class="ml-[16%]">
		<slot />
	</div>
</template>

<script setup></script>

<style></style>
