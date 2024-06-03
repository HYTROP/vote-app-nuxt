<template>
	<div>
		<button
			@click="$router.go(0)"
			type="button"
			class="w-full mt-4 flex items-center justify-center px-5 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors duration-300 bg-white border rounded-lg gap-x-2 sm:w-auto"
		>
			<svg
				class="w-6 h-6 rtl:rotate-180 animate-pulse"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
				/>
			</svg>
			<span>Вернуться</span>
		</button>
	</div>
</template>

<script lang="ts" setup></script>

<style></style>
