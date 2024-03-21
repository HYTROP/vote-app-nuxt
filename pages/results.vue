<template>
	<div>
		<h1
			class="text-xl text-neutral-800 font-bold m-2 lg:flex md:grid-cols-2 md:mx-2"
		>
			Результаты /
		</h1>

		<CardList :dataArray="resultsPoints" />

		<!-- <table class="w-full">
			<thead class="text-neutral-800">
				<tr>
					<th>ФИО</th>
					<th>РАБОТА</th>
					<th>БАЛЛЫ</th>
				</tr>
			</thead>
			<tbody class="border border-neutral-300 text-neutral-800"></tbody>
		</table>
		<table>
			<tbody>
				<tr v-for="(participant, index) in participants" :key="index">
					<td>{{ participant.name }}</td>
					<td>{{ participant.score }}</td>
				</tr>
			</tbody>
		</table> -->
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
