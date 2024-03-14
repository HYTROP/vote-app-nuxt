<script setup>
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {
	params,
	paramsSheets,
	_API_KEY,
	_GOOGLE_SHEETS_KEY,
	sheetRange,
} from '../API/Api';

const recordsArr = ref([]);
const filteredDataArr = ref([]);
const photosDrive = ref([]);

const showModal = ref(false);
const selectedPhotoURL = ref('');
const currentIndex = ref(0);
const personInfo = ref([]);

const isFavorite = ref(false);
const favoritesItems = ref([]);

definePageMeta({
	middleware: ['auth'],
});
// ---------------------

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

const getPhotoUrl = (id) => {
	return `https://lh3.googleusercontent.com/d/${id}=s1620`;
};

onMounted(async () => {
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
			return obj;
		});
		return arrayOfObjects;
	};

	recordsArr.value = convertToObjects(recordsArr.value);

	filteredDataArr.value = recordsArr.value.map((obj) => {
		return {
			...obj,
			itemId: uuidv4(),
			isFavorite: false,
		};
	});
});

const filterOptions = [
	'Все',
	'Живопись',
	'Рисунок',
	'Фотография',
	'ДПИ (Декоративно-прикладное искусство)',
];

const selectedFilters = ref(filterOptions[0]);
const filterData = () => {
	filteredDataArr.value = recordsArr.value.filter((item) => {
		if (selectedFilters.value === 'Все') {
			return recordsArr.value;
		} else {
			return item.nomination === selectedFilters.value;
		}
	});
};

const openModal = (recordURL, index) => {
	showModal.value = true;
	selectedPhotoURL.value = recordURL;

	currentIndex.value = index; // получаем индекс текущей фотографии

	const findPerson = filteredDataArr.value.find(
		(item) => item.photo === recordURL,
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
	if (currentIndex.value < filteredDataArr.value.length - 1) {
		currentIndex.value++;
	} else {
		currentIndex.value = 0;
	}
	selectedPhotoURL.value = filteredDataArr.value[currentIndex.value].photo;
	personInfo.value = filteredDataArr.value[currentIndex.value];
};

const prevImage = () => {
	if (currentIndex.value > 0) {
		currentIndex.value--;
	} else {
		currentIndex.value = filteredDataArr.value.length - 1;
	}
	selectedPhotoURL.value = filteredDataArr.value[currentIndex.value].photo;
	personInfo.value = filteredDataArr.value[currentIndex.value];
};

provide('closeModal', closeModal);
provide('openModal', openModal);
provide('nextImage', nextImage);
provide('prevImage', prevImage);

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const onClickFavorite = async (item) => {
	if (isFavorite.value) {
		return;
	}
	item.isFavorite = true;

	console.log('CLICKED');
	console.log('item', item);

	const { data } = await supabase
		.from('favorites')
		.insert([{ userId: user.value.id, itemId: item.itemId, isFavorite: true }])
		.select('userId, itemId, isFavorite')
		.single();
	// console.log("data", data);

	favoritesItems.value.push(data);
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
			@change="filterData"
		>
			<option v-for="option in filterOptions" :key="option" class="border-none">
				{{ option }}
			</option>
		</select>

		<LoaderSpin v-if="recordsArr.length === 0" class="w-20 h-14" />

		<!-- grid -->
		<CardList
			:data-array="filteredDataArr"
			:show-modal="showModal"
			:person-info="personInfo"
			:selected-photo-u-r-l="selectedPhotoURL"
			@on-click-favorite="onClickFavorite"
			@open-modal="openModal"
		/>
	</div>
</template>

<style scoped></style>
