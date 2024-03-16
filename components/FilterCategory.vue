<script setup>
const { recordsArr } = inject('dataProvider');
const filteredDataArr = ref([]);

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
</script>

<template>
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
</template>
