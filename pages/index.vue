<script setup>
const { recordsArr } = inject('dataProvider');
const filteredDataArr = ref([]);

definePageMeta({
	middleware: ['auth'],
});

// ---------------------
onMounted(() => {
	filterDataFunc();
});

watch(recordsArr, () => {
	filterDataFunc();
});

const filterOptions = [
	'Все',
	'Живопись',
	'Рисунок',
	'Фотография',
	'ДПИ (Декоративно-прикладное искусство)',
];
const selectedFilters = ref(filterOptions[0]);
const filterDataFunc = () => {
	filteredDataArr.value = recordsArr.value.filter((item) => {
		if (selectedFilters.value === 'Все') {
			return recordsArr.value;
		} else {
			return item.nomination === selectedFilters.value;
		}
	});
};

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
	<div v-auto-animate>
		<h1
			class="text-xl text-neutral-800 font-bold m-2 lg:flex md:grid-cols-2 md:mx-2"
		>
			Галерея /
			{{ selectedFilters }} ({{ filteredDataArr.length }})
		</h1>

		<label for="filterSelect" class="flex text-sm text-gray-700" />
		<select
			v-if="filteredDataArr.length > 0"
			id="filterSelect"
			v-model="selectedFilters"
			class="w-[150px] truncate p-1 m-2 border-2 border-indigo-400 rounded-lg appearance-auto"
			@change="filterDataFunc"
		>
			<option v-for="option in filterOptions" :key="option" class="border-none">
				{{ option }}
			</option>
		</select>

		<LoaderSpin v-if="!recordsArr.length" class="w-20 h-14" />

		<!-- grid -->
		<CardList v-if="filteredDataArr.length > 0" :dataArray="filteredDataArr" />
	</div>
</template>

<style scoped></style>
