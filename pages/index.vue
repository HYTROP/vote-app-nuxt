<script setup>
definePageMeta({
	middleware: ['auth'],
});

// ---------------------

const { filteredDataArr, filterDataFunc, selectedFilters, filterOptions } =
	inject('filteredDataProvider');

const {
	selectedPointsFilters,
	filterIsPointedOptions,
	filterCardsWithPointsFuc,
	filteredItemsWithPoints,
	itemsWithPointsApp,
} = inject('filteredPointsDataProvider');

// console.log('filteredItemsWithPoints', filteredItemsWithPoints.value);

useHead({
	title: 'Палитра талантов | Галерея',
	meta: [
		{
			name: 'description',
			content: 'Галерея',
		},
	],
});
</script>

<template>
	<div>
		<h1
			class="text-xl text-neutral-800 font-bold m-2 lg:flex md:grid-cols-2 md:mx-2"
		>
			Галерея / {{ selectedFilters }} ({{ filteredDataArr.length }}) /
			{{ selectedPointsFilters }} ({{ itemsWithPointsApp.length }})
		</h1>
		<div class="flex justify-stretch">
			<label for="nominations" class="text-sm text-gray-700" />
			<select
				v-if="filteredDataArr.length > 0"
				id="nominations"
				v-model="selectedFilters"
				class="w-[150px] truncate p-1 m-2 border-2 border-indigo-400 rounded-lg appearance-auto"
				@change="filterDataFunc"
			>
				<option
					v-for="option in filterOptions"
					:key="option"
					class="border-none"
				>
					{{ option }}
				</option>
			</select>

			<!-- points filter -->
			<label for="points" class="text-sm text-gray-700" />
			<select
				v-if="filteredDataArr.length > 0"
				id="points"
				v-model="selectedPointsFilters"
				class="w-[150px] truncate p-1 m-2 border-2 border-indigo-400 rounded-lg appearance-auto"
				@change="filterCardsWithPointsFuc"
			>
				<option
					v-for="option in filterIsPointedOptions"
					:key="option"
					class="border-none"
				>
					{{ option }}
				</option>
			</select>
		</div>

		<LoaderSpin v-if="!itemsWithPointsApp.length" class="w-20 h-14" />

		<CardList :dataArray="itemsWithPointsApp" />
	</div>
</template>

<style scoped></style>
