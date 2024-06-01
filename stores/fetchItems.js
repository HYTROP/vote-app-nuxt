export const useMyFetchItemsStore = defineStore('myFetchItemsStore', () => {
	//define state
	const recordsArr = ref([]);
	const favoritePhotoURLs = ref([]);
	const matchItems = ref([]);
	const currentPage = ref(1);
	const someFilterDataByNomination = ref({ name: 'Все' });
	const someFilterByPoints = ref({ name: 'Все' });
	const totalPages = ref(0);

	const allRecordsFromDBREF = ref([]);

	//getters
	const getApiData = computed(() => {
		return recordsArr;
	});

	const supabase = useSupabaseClient();
	const user = useSupabaseUser();

	//actions

	const fetchItems = async () => {
		const { data } = await useFetch(
			`/api/getHello?page=${currentPage.value}&nomination=${someFilterDataByNomination.value?.name}&points=${someFilterByPoints.value?.name}`,
		);

		const { data: responseData, count } = data.value;

		totalPages.value = Math.ceil(count / 30);
		recordsArr.value = responseData;

		currentPage.value =
			currentPage.value > totalPages.value
				? totalPages.value
				: currentPage.value;
		recordsArr.value.forEach((item) => {
			item.isFavorite = favoritePhotoURLs.value.includes(item.photo);
		});
	};

	watchEffect(fetchItems);

	const fetchFavorites = async () => {
		// const { data } = await useFetch(`/api/favorites?userID=${user.value?.id}`);
		// favoritePhotoURLs.value = data.value;

		if (!user.value) return;
		const { data, error } = await supabase
			.from('favorites')
			.select('favoritePhotoURLs')
			.eq('userID', user.value.id)
			.single();

		if (error) {
			throw error;
		}

		favoritePhotoURLs.value = data.favoritePhotoURLs;
	};

	const fetchItemsFromDB = async () => {
		const { data, error } = await supabase.from('myCollection').select('*');

		if (error) {
			console.error('Error fetching data:', error.message);
			throw error;
		}
		allRecordsFromDBREF.value = data;
		allRecordsFromDBREF.value.forEach((item) => {
			item.isFavorite = favoritePhotoURLs.value.includes(item.photo);
		});
	};

	const actClickFavorite = async (item) => {
		const updatedFavoritesPhotoURLs = item.isFavorite
			? favoritePhotoURLs.value.filter((url) => url !== item.photo)
			: [...favoritePhotoURLs.value, item.photo];

		const { data, error } = await supabase
			.from('favorites')
			.update({ favoritePhotoURLs: updatedFavoritesPhotoURLs })
			.eq('userID', user.value.id)
			.select('*')
			.single();

		if (error) {
			console.error('Error updating favorites:', error.message);
			throw error;
		}

		item.isFavorite = data.favoritePhotoURLs.includes(item.photo);

		favoritePhotoURLs.value = data.favoritePhotoURLs;
	};

	const fetchAllUsersPoints = async () => {
		const { data: allRecordsFromDB } = await supabase
			.from('myCollection')
			.select('*')
			.order('points', { ascending: true });

		const { data: responseData, error } = await supabase
			.from('UserPoints')
			.select('*');

		if (error) {
			console.error('Error fetching data:', error.message);
			return;
		}

		const cardAverages = [];
		responseData.forEach((item) => {
			if (!(item.cardURL in cardAverages)) {
				cardAverages[item.cardURL] = [];
			}
			cardAverages[item.cardURL].push(item.points);
		});

		// Среднее арифметическое
		for (const cardURL in cardAverages) {
			const pointsArray = cardAverages[cardURL];
			const average =
				pointsArray.reduce((acc, curr) => acc + curr, 0) / pointsArray.length;
			cardAverages[cardURL] = average.toFixed(1);
		}

		// Добавление поля points к каждому элементу item
		const itemsWithPoints = allRecordsFromDB.map((item) => {
			const points = cardAverages[item.photo] || 0;
			return { ...item, points };
		});

		// Сортировка по баллам
		matchItems.value = itemsWithPoints
			.sort((a, b) => b.points - a.points)
			.filter((item) => {
				return item.points > 0;
			});
	};

	return {
		currentPage,
		someFilterDataByNomination,
		someFilterByPoints,
		recordsArr,
		favoritePhotoURLs,
		matchItems,
		getApiData,
		allRecordsFromDBREF,
		totalPages,

		fetchItems,
		actClickFavorite,
		fetchFavorites,
		fetchItemsFromDB,
		fetchAllUsersPoints,
	};
});
