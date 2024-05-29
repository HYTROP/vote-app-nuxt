<template>
	<NuxtLoadingIndicator color="yellow" />
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
// --------------------- points filter
// const filteredItemsWithPoints = useState('filteredItemsWithPoints', () => []);
// const itemsWithPointsApp = ref([]);

// const fetchItemsStore = useMyFetchItemsStore();
// const recordsArr = fetchItemsStore.getApiData;

// const filterIsPointedOptions = ['Все', 'Без оценки', 'С оценкой'];
// const selectedPointsFilters = ref(filterIsPointedOptions[0]);

// const filterCardsWithPointsFuc = (item) => {
// 	switch (selectedPointsFilters.value) {
// 	case 'Все':
// 		return true;
// 	case 'Без оценки':
// 		return item.points == 0;
// 	case 'С оценкой':
// 		return item.points > 0;
// 	}
// };

// ---------------------

// provide('filteredDataProvider', {
// 	filteredDataArr,
// 	// selectedFilters,
// 	// filterOptions,
// 	filterDataFunc: filterData,
// });

// provide('filteredPointsDataProvider', {
// 	itemsWithPointsApp,
// 	filteredItemsWithPoints,
// 	selectedPointsFilters,
// 	filterIsPointedOptions,
// 	filterData,
// });

// ---------------------

useHead({
	title: 'Палитра талантов',
	meta: [
		{
			name: 'description',
			content: 'Палитра талантов 2024',
		},
	],
});
</script>

<style scoped></style>
