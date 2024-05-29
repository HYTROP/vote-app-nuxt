export const useMySelectByNominationsStore = defineStore(
	'mySelectByNominations',
	() => {
		//define store
		const filteredDataArr = ref([]);
		const itemsWithPointsApp = ref([]);

		const { recordsArr } = storeToRefs(useMyFetchItemsStore());

		//getters

		//actions

		const supabase = useSupabaseClient();

		// const fetchFilteredItemsByNominations = async (
		// 	selectedFilters,
		// 	pageNumber = 1,
		// ) => {
		// 	const nomination =
		// 		selectedFilters.name === 'Все'
		// 			? useMyFetchItemsStore().fetchItemsFromDB()
		// 			: selectedFilters.name;

		// 	const limit = 30;
		// 	const rangeMax = pageNumber * limit - 1;
		// 	const rangeMin = rangeMax - limit + 1;
		// 	const { data, error } = await supabase
		// 		.from('myCollection')
		// 		.select('*')
		// 		.eq('nomination', `${nomination}`)
		// 		.range(rangeMin, rangeMax);

		// 	if (error) {
		// 		console.error('Error fetching data:', error.message);
		// 		throw error;
		// 	}
		// 	recordsArr.value = data;
		// };

		const nominations = [
			{ id: 1, name: 'Все' },
			{ id: 2, name: 'Живопись' },
			{ id: 3, name: 'Рисунок' },
			{ id: 4, name: 'Фотография' },
			{ id: 5, name: 'ДПИ (Декоративно-прикладное искусство)' },
		];

		const selectedFilters = ref(nominations[0]);

		return {
			recordsArr,
			itemsWithPointsApp,
			nominations,
			selectedFilters,

			filterData,
			filterDataByNominations,
			fetchFilteredItemsByNominations,
		};
	},
);
