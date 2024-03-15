<template>
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
const recordsArr = ref([]);
const favoritesURLs = ref([]);

const supabase = useSupabaseClient();
const user = useSupabaseUser();

provide('dataProvider', { favoritesURLs, recordsArr });

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
	} catch (error) {
		throw new Error('Ошибка при получении записей:', error);
	}
};
const fetchFavorites = async () => {
	const { data } = await supabase
		.from('favorites')
		.select('favoritePhotoURLs')
		.eq('userID', user.value.id)
		.single();

	favoritesURLs.value = data.favoritePhotoURLs;
};

const getPhotoUrl = (id) => {
	return `https://lh3.googleusercontent.com/d/${id}=s1620`;
};

onMounted(async () => {
	await fetchFavorites();
	await fetchItems();

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
});

useHead({
	title: 'Палитра талантов',
	meta: [
		{
			name: 'description',
			content: 'Палитра талантов',
		},
	],
});
</script>

<style scoped></style>
