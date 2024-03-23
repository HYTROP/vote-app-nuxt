<template>
	<div>
		<h1
			class="text-xl text-neutral-800 font-bold m-2 lg:flex md:grid-cols-2 md:mx-2"
		>
			Результаты /
		</h1>

		<CardList :dataArray="resultsPoints" />
	</div>
</template>

<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();

useHead({
	title: 'Палитра талантов | Результаты',
	meta: [
		{
			name: 'description',
			content: 'Результаты',
		},
	],
});
</script>

<style scoped></style>
