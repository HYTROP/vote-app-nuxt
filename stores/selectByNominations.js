export const useMySelectByNominationsStore = defineStore(
	'mySelectByNominations',
	() => {
		//define store

		const itemsWithPointsApp = ref([]);

		const { recordsArr } = storeToRefs(useMyFetchItemsStore());

		//actions

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
