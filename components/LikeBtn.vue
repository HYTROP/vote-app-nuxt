<template>
	<div>
		<svg
			v-if="!isFavorite"
			xmlns="http://www.w3.org/2000/svg"
			width="34"
			height="34"
			viewBox="0 0 24 24"
			fill="none"
			stroke="grey"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path
				d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
			></path>
		</svg>
		<svg
			v-else
			xmlns="http://www.w3.org/2000/svg"
			width="34"
			height="34"
			viewBox="0 0 24 24"
			fill="none"
			stroke="red"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path
				d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
			></path>
		</svg>
	</div>
</template>

<script setup>
const props = defineProps({
	isFavorite: Boolean,
});
</script>
