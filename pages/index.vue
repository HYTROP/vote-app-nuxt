<script setup>
import SelectByNomination from '../components/SelectByNomination.vue';
definePageMeta({
	middleware: ['auth'],
});

const isLoaded = ref(true);

const recordsArr = useMyFetchItemsStore().getApiData;
const user = useSupabaseUser();

onMounted(async () => {
	if (user.value) {
		await useMyFetchItemsStore().fetchFavorites();
		await useMyFetchItemsStore().fetchItems();
	}

	isLoaded.value = false;
});

// ---------------------
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
		<div class="flex flex-col" v-if="recordsArr.length">
			<ProgressBarFetch :show="isLoaded" />
			<h1
				class="text-xl text-neutral-800 font-bold mx-0 my-3 sm:m-2 lg:flex md:grid-cols-2 md:mx-2"
			>
				Галерея /
				<!-- {{ selectedFilters }} ({{ recordsArr.length }}) / -->
				<!-- {{ selectedPointsFilters }} -->
				<!-- ({{ itemsWithPointsApp.length }}) -->
			</h1>

			<div class="gap-5 sm:m-2 sm:my-2 sm:flex justify-end items-center">
				<span class="text-sm text-gray-700">Выберите фильтр</span>
				<SelectByNomination v-if="recordsArr.length > 0" />

				<SelectByPoints v-if="recordsArr.length > 0" />
			</div>
		</div>

		<!-- 
		<select
			v-if="itemsWithPointsApp.length > 0"
			id="points"
			v-model="selectedPointsFilters"
			class="w-[150px] truncate p-1 m-2 border-2 border-indigo-400 rounded-lg appearance-auto"
			@change="filterData"
		>
			<option
				v-for="option in filterIsPointedOptions"
				:key="option"
				class="border-none"
			>
				{{ option }}
			</option>
		</select> -->

		<LoaderSpin v-if="!recordsArr.length" class="w-20 h-14" />
		<CardList v-if="recordsArr.length" :recordsArr="recordsArr" />

		<Pagination v-if="!isLoaded" class="my-12" />
	</div>
</template>

<style scoped></style>
