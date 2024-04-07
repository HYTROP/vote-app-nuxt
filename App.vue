<template>
	<NuxtLoadingIndicator color="red" />
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
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
const favoritesURLs = ref([]);
const filteredDataArr = ref([]);

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const fetchItems = async () => {
	try {
		const responseDrive = await axios.get(
			'https://www.googleapis.com/drive/v3/files',
			{ params },
		);
		photosDrive.value = responseDrive.data.files;

		const responseSheets = await axios.get(
			`https://sheets.googleapis.com/v4/spreadsheets/${_GOOGLE_SHEETS_KEY}/values/${sheetRange}?key=${_API_KEY}`,
			{ paramsSheets },
		);
		// декодирование ссылки на фото
		recordsArr.value = responseSheets.data.values.map((item) => {
			const result = item;
			const separate = result[6].split('/');
			const nameUrl = decodeURIComponent(separate[separate.length - 1]);

			const obj = photosDrive.value.find((photo) => photo.name === nameUrl);

			result[6] = getPhotoUrl(obj.id);

			return result;
		});

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
			];
			const arrayOfObjects = arr.map((subArray) => {
				const obj = {};
				subArray.forEach((value, index) => {
					obj[keys[index]] = value;
				});
				obj.isFavorite = favoritesURLs.value.includes(obj.photo);
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

const fetchFavorites = async () => {
	const { data } = await supabase
		.from('favorites')
		.select('favoritePhotoURLs')
		.eq('userID', user.value.id)
		.single();

	favoritesURLs.value = data.favoritePhotoURLs;
};

// --------------------- points filter
const filteredItemsWithPoints = useState('filteredItemsWithPoints', () => []);
const data = ref([]);
const itemsWithPointsApp = ref([]);
const havePoints = ref([]);
const dontHavePoints = ref([]);

const filterIsPointedOptions = ['Все', 'Без оценки', 'С оценкой'];
const selectedPointsFilters = ref(filterIsPointedOptions[0]);

const filterCardsWithPointsFuc = (filteredData) => {
	if (filteredData === undefined) {
		return console.log('Нет данных');
	} else {
		if (selectedPointsFilters.value === 'Все') {
			return filteredData;
		} else if (selectedPointsFilters.value === 'Без оценки') {
			return (itemsWithPointsApp.value = dontHavePoints.value);
		} else if (selectedPointsFilters.value === 'С оценкой') {
			return (itemsWithPointsApp.value = havePoints.value);
		}
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

const filterDataFunc = () => {
	filteredDataArr.value = recordsArr.value.filter((item) => {
		if (selectedFilters.value === 'Все') {
			return recordsArr.value;
		} else {
			return item.nomination === selectedFilters.value;
		}
	});
	// console.log(filteredDataArr.value);
	// filterCardsWithPointsFuc(filteredDataArr.value);
};

// watchEffect(() => {
// 	filterDataFunc();

// });

const fetchingCardsWithPoints = async () => {
	// console.log('fetchingCardsWithPoints');
	const { data: responseData, error } = await supabase
		.from('UserPoints')
		.select('*')
		.eq('userID', user.value.id);

	if (error) {
		console.log('Error loading card points:', error.message);
		throw error;
	}

	data.value = responseData;

	const cardWithPoints = [];
	data.value.forEach((item) => {
		if (!(item.cardID in cardWithPoints)) {
			cardWithPoints[item.cardID] = [];
		}
		cardWithPoints[item.cardID].push(item.points);
	});

	// Добавление поля points к каждому элементу item

	itemsWithPointsApp.value = recordsArr.value.map((item) => {
		return { ...item, points: cardWithPoints[item.photo] || 0 };
	});

	// Фильтрация с учетом обновленных данных
	havePoints.value = itemsWithPointsApp.value.filter((item) => {
		return item.points;
	});
	dontHavePoints.value = itemsWithPointsApp.value.filter((item) => {
		return !item.points;
	});

	// console.log(dontHavePoints.value);

	// filterCardsWithPointsFuc();
};

onMounted(async () => {
	await fetchItems();
	filterDataFunc();
	await fetchingCardsWithPoints();
	filterCardsWithPointsFuc();
});

provide('fetchFavorites', fetchFavorites);

// ---------------------

provide('filteredDataProvider', {
	filteredDataArr,
	selectedFilters,
	filterOptions,
	filterDataFunc,
});

provide('filteredPointsDataProvider', {
	itemsWithPointsApp,
	filteredItemsWithPoints,
	selectedPointsFilters,
	filterIsPointedOptions,
	filterCardsWithPointsFuc,
});

provide('dataProvider', {
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
