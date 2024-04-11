<template>
	<NuxtLoadingIndicator color="red" />
	<NuxtLayout />
</template>

<script setup>
import axios from 'axios';

import {
	params,
	paramsSheets,
	_API_KEY,
	_GOOGLE_SHEETS_KEY,
	sheetRange,
} from '../API/Api';

const photosDrive = ref([]);
const recordsArr = useState('recordsArr', () => []);
const favoritesURLs = useState('favoritesURLs', () => []);
const filteredDataArr = useState('filteredDataArr', () => []);

// --------------------- points filter
const filteredItemsWithPoints = useState('filteredItemsWithPoints', () => []);
const itemsWithPointsApp = ref([]);

const matchItems = useState('matchItems', () => []);

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const fetchDataDrive = async () => {
	try {
		const responseDrive = await axios.get(
			'https://www.googleapis.com/drive/v3/files',
			{ params },
		);
		return responseDrive.data.files;
	} catch (error) {
		console.error(error);
	}
};

const fetchDataSheets = async () => {
	try {
		const responseSheets = await axios.get(
			`https://sheets.googleapis.com/v4/spreadsheets/${_GOOGLE_SHEETS_KEY}/values${sheetRange}?key=${_API_KEY}`,
			{ paramsSheets },
		);
		return responseSheets.data.values;
	} catch (error) {
		throw new Error('Ошибка при получении данных из Google Sheets:', error);
	}
};

const fetchItems = async () => {
	try {
		const filesFromDrive = await fetchDataDrive();
		photosDrive.value = filesFromDrive;

		const valuesFromSheets = await fetchDataSheets();

		// декодирование ссылки на фото и фильтрация
		recordsArr.value = valuesFromSheets
			.map((item) => {
				if (item[6] === undefined || item[6] === '') return null;
				const result = item;
				const separate = result[6].split('/');
				const nameUrl = decodeURIComponent(separate[separate.length - 1]);

				const obj = photosDrive.value.find((photo) => photo.name === nameUrl);

				if (obj) {
					result[6] = getPhotoUrl(obj.id);
					return result;
				} else {
					return null;
				}
			})
			.filter((item) => item !== null);

		console.log('записи получены>>', recordsArr.value);

		const convertToObjects = (arr) => {
			const keys = [
				'fio',
				'email',
				'phone',
				'age',
				'nomination',
				'info',
				'photo',
				'bio',
				'city',
				'points',
			];
			const arrayOfObjects = arr.map((subArray) => {
				const obj = {};
				subArray.forEach((value, index) => {
					obj[keys[index]] = value;
				});
				obj.isFavorite = favoritesURLs.value.includes(obj.photo);
				obj.points = 0;
				return obj;
			});
			return arrayOfObjects;
		};
		recordsArr.value = convertToObjects(recordsArr.value);
	} catch (error) {
		throw new Error('Ошибка при получении записей:', error);
	}
};
const getPhotoUrl = (id) => {
	return `https://lh3.googleusercontent.com/d/${id}=s1620`;
};

const fetchingCardsWithPoints = async () => {
	const { data: responseData, error } = await supabase
		.from('UserPoints')
		.select('*')
		.eq('userID', user.value.id);

	if (error) {
		console.log('Error loading card points:', error.message);
		throw error;
	}

	const cardWithPoints = {};
	responseData.forEach((item) => {
		cardWithPoints[item.cardID] = item.points;
	});

	// Добавление поля points к каждому элементу item
	recordsArr.value = recordsArr.value?.map((item) => {
		return { ...item, points: cardWithPoints[item.photo] || 0 };
	});
};

const fetchFavorites = async () => {
	const { data } = await supabase
		.from('favorites')
		.select('favoritePhotoURLs')
		.eq('userID', user.value.id)
		.single();

	favoritesURLs.value = data.favoritePhotoURLs;
};

const fetchAllUsersPoints = async () => {
	const { data: responseData, error } = await supabase
		.from('UserPoints')
		.select('*');

	if (error) {
		console.error('Error fetching data:', error.message);
		return;
	}

	const cardAverages = [];
	responseData.forEach((item) => {
		if (!(item.cardID in cardAverages)) {
			cardAverages[item.cardID] = [];
		}
		cardAverages[item.cardID].push(item.points);
	});

	// Среднее арифметическое
	for (const cardID in cardAverages) {
		const pointsArray = cardAverages[cardID];
		const average =
			pointsArray.reduce((acc, curr) => acc + curr, 0) / pointsArray.length;
		cardAverages[cardID] = average.toFixed(1);
	}

	// Добавление поля points к каждому элементу item
	const itemsWithPoints = recordsArr.value.map((item) => {
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

const filterIsPointedOptions = ['Все', 'Без оценки', 'С оценкой'];
const selectedPointsFilters = ref(filterIsPointedOptions[0]);

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

const filterOptions = [
	'Все',
	'Живопись',
	'Рисунок',
	'Фотография',
	'ДПИ (Декоративно-прикладное искусство)',
];
const selectedFilters = ref(filterOptions[0]);

const filterDataByNominations = (item) =>
	selectedFilters.value === 'Все'
		? true
		: item.nomination === selectedFilters.value;

const filterData = () => {
	const temp = recordsArr.value.filter(filterDataByNominations);
	itemsWithPointsApp.value = temp.filter(filterCardsWithPointsFuc);
	filteredDataArr.value = temp;
};

watchEffect(() => {
	user.value;
	filterData();
});

onMounted(async () => {
	if (user.value) {
		await fetchFavorites();
		await fetchItems();
		await fetchingCardsWithPoints();
		await fetchAllUsersPoints();
	}
});

provide('fetchItems', fetchItems);
provide('fetchFavorites', fetchFavorites);
provide('filterData', filterData);

// ---------------------

provide('filteredDataProvider', {
	filteredDataArr,
	selectedFilters,
	filterOptions,
	filterDataFunc: filterData,
});

provide('filteredPointsDataProvider', {
	itemsWithPointsApp,
	filteredItemsWithPoints,
	selectedPointsFilters,
	filterIsPointedOptions,
	filterData,
});

provide('dataProvider', {
	matchItems,
	recordsArr,
	favoritesURLs,
});

const showModal = ref(false);
const personInfo = ref([]);
const selectedPhotoURL = ref('');
const currentIndex = ref(0);

// ---------------------

const openModal = (modalPhotoURL, index) => {
	showModal.value = true;
	selectedPhotoURL.value = modalPhotoURL;

	currentIndex.value = index;

	const findPerson = filteredDataArr.value.find(
		(item) => item.photo === modalPhotoURL,
	);
	personInfo.value = findPerson;

	document.body.style.overflow = 'hidden';
};
const closeModal = () => {
	showModal.value = false;
	selectedPhotoURL.value = null;

	document.body.style.overflow = 'auto';
};

const nextImage = () => {
	const currentPhotoURL = selectedPhotoURL.value;
	const currentIndexInArr = filteredDataArr.value.findIndex(
		(item) => item.photo === currentPhotoURL,
	);
	const nextIndex =
		currentIndexInArr < filteredDataArr.value.length - 1
			? currentIndexInArr + 1
			: 0;

	selectedPhotoURL.value = filteredDataArr.value[nextIndex].photo;
	personInfo.value = filteredDataArr.value[nextIndex];
};

const prevImage = () => {
	const currentPhotoURL = selectedPhotoURL.value;
	const currentIndexInArr = filteredDataArr.value.findIndex(
		(item) => item.photo === currentPhotoURL,
	);
	const prevIndex =
		currentIndexInArr > 0
			? currentIndexInArr - 1
			: filteredDataArr.value.length - 1;

	selectedPhotoURL.value = filteredDataArr.value[prevIndex].photo;
	personInfo.value = filteredDataArr.value[prevIndex];
};

provide('modalActions', {
	showModal,
	openModal,
	closeModal,
	nextImage,
	prevImage,
	personInfo,
	selectedPhotoURL,
	currentIndex,
});
//---------------------

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
