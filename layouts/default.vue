<template>
	<HeaderComponent />

	<section class="grid lg:flex w-full">
		<!-- <nav
			class="sm:justify-center sm:items-center lg:left-0 lg:top-0 lg:h-screen lg:sticky md:top-0 md:sticky md:bg-white sm:top-0 sm:sticky sm:bg-white">
			<ul class="md:flex sm:flex sm:flex-1 sm:m-2 lg:flex-col">
				<li
					class="text-md font-semibold flex items-center justify-center cursor-pointer m-3 text-indigo-500 hover:text-cyan-700 transition duration-500 hover:outline decoration-indigo-500 p-2 hover:scale-110">
					<NuxtLink to="/">ГАЛЕРЕЯ</NuxtLink>
				</li>
				<li
					class="text-md font-semibold flex items-center justify-center cursor-pointer m-3 text-indigo-500 hover:text-cyan-700 transition duration-500 hover:outline decoration-indigo-500 p-2 hover:scale-110">
					<NuxtLink to="/favorites">ИЗБРАННОЕ</NuxtLink>
				</li>
				<li
					class="text-md font-semibold flex items-center justify-center cursor-pointer m-3 text-indigo-500 hover:text-cyan-700 transition duration-500 hover:outline decoration-indigo-500 p-2 hover:scale-110">
					<NuxtLink to="/results">РЕЗУЛЬТАТЫ</NuxtLink>
				</li>
			</ul>
		</nav> -->

		<div
			class="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
			<slot />
		</div>
	</section>
</template>

<script></script>

<style scoped></style>
