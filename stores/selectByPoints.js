export const useMySelectByPointsStore = defineStore('mySelectByPoints', () => {
	//define store
	const itemsWithPointsApp = ref([]);

	const { recordsArr } = storeToRefs(useMyFetchItemsStore());
	const { fetchItemsFromDB } = storeToRefs(useMyFetchItemsStore());

	//getters

	const supabase = useSupabaseClient();

	//actions

	// const fetchFilteredItemsByPoints = async (selectedPointsFilters) => {
	// 	const pointFilter =
	// 		selectedPointsFilters.name === 'Все'
	// 			? useMyFetchItemsStore().fetchItems()
	// 			: selectedPointsFilters.name;
	// 	const { data, error } = await supabase
	// 		.from('UserPoints')
	// 		.select('*')
	// 		.gte('points', 0)
	// 		.select('*');

	// 	if (error) {
	// 		console.error('Error fetching data:', error.message);
	// 		throw error;
	// 	}

	// 	recordsArr.value = data;
	// 	// itemsWithPointsApp.value = data;
	// };

	const marks = [
		{ id: 1, name: 'Все' },
		{ id: 2, name: 'Без оценки' },
		{ id: 3, name: 'С оценкой' },
	];

	const selectedPointsFilters = ref(marks[0].name);

	const filterCardsWithPointsFuc = (item) => {
		switch (selectedPointsFilters.value) {
			case 'Все':
				return true;
			case 'Без оценки':
				return item.points == 0;
			case 'С оценкой':
				return item.points > 0;
		}
	};

	const filterDataByNominations = (item) =>
		selectedPointsFilters.value === 'Все'
			? true
			: item.nomination === selectedPointsFilters.value;

	return {
		selectedPointsFilters,
		itemsWithPointsApp,

		filterCardsWithPointsFuc,
		fetchFilteredItemsByPoints,
	};
});
