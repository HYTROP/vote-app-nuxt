<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { params } from '../API/Api';
import { paramsSheets } from '../API/Api';

import { _API_KEY, _GOOGLE_SHEETS_KEY, sheetRange } from '../API/Api';

const recordsArr = ref({});
const photos = ref([]);

const showModal = ref(false);
const selectedPhotoURL = ref('');
const currentIndex = ref(0);
const personInfo = ref([]);

const filters = reactive({
	sortBy: 'record[6]',
});

// ---------------------

const fetchDriveItems = async () => {
	try {
		// -------------------- Google Drive
		const responseDrive = await axios.get(
			'https://www.googleapis.com/drive/v3/files',
			{ params }
		);
		photos.value = responseDrive.data.files;
	} catch (error) {
		console.error('Ошибка при получении записей из Google DRIVE:', error);
	}
};

const fetchSheetsItems = async () => {
	try {
		// -------------------- Google Sheets
		const responseSheets = await axios.get(
			`https://sheets.googleapis.com/v4/spreadsheets/${_GOOGLE_SHEETS_KEY}/values/${sheetRange}?key=${_API_KEY}`,
			{ paramsSheets }
		);

		// преобразование ссылки на фото
		recordsArr.value = responseSheets.data.values.map((item) => {
			const result = item;
			const separate = result[6].split('/');
			const nameUrl = decodeURIComponent(separate[separate.length - 1]);

			const obj = photos.value.find((photo) => photo.name === nameUrl);

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
				return obj;
			});
			return arrayOfObjects;
		};

		const newRecordsArr = convertToObjects(recordsArr.value);

		console.log(newRecordsArr.map((item) => item));
	} catch (error) {
		console.error('Ошибка при получении записей из Google SHEETS:', error);
	}
};

const getPhotoUrl = (id) => {
	return `https://lh3.googleusercontent.com/d/${id}=s1620`;
};

onMounted(async () => {
	// const localStorageFavorites = localStorage.getItem('favourites');
	// favorites.value = localStorageFavorites
	// 	? JSON.parse(localStorageFavorites)
	// 	: [];

	await fetchDriveItems();
	await fetchSheetsItems();
});

const onChangeSelect = (event) => {
	filters.sortBy = event.target.value;
};

const openModal = (recordURL, index) => {
	showModal.value = true;
	selectedPhotoURL.value = recordURL;

	currentIndex.value = index; // получаем индекс текущей фотографии

	const findPerson = recordsArr.value.find((item) => item[6] === recordURL);
	personInfo.value = findPerson;

	document.body.style.overflow = 'hidden';
};

const closeModal = () => {
	showModal.value = false;
	selectedPhotoURL.value = null;

	document.body.style.overflow = 'auto';
};

const nextImage = () => {
	if (currentIndex.value < recordsArr.value.length - 1) {
		currentIndex.value++;
	} else {
		currentIndex.value = 0;
	}
	selectedPhotoURL.value = recordsArr.value[currentIndex.value][6];
	personInfo.value = recordsArr.value[currentIndex.value];
};

const prevImage = () => {
	if (currentIndex.value > 0) {
		currentIndex.value--;
	} else {
		currentIndex.value = recordsArr.value.length - 1;
	}
	selectedPhotoURL.value = recordsArr.value[currentIndex.value][6];
	personInfo.value = recordsArr.value[currentIndex.value];
};

watch(filters, fetchSheetsItems);
</script>

<template>
	<div class="grid grid-flow-cols-1 sm:grid-flow-cols-1 sm:items-center">
		<h1 class="text-xl font-bold m-2 lg:flex md:grid-cols-2 md:m-2">
			ГАЛЕРЕЯ / {{ photos.length }}
		</h1>

		<select @change="onChangeSelect" class="w-[120px] bg-neutral-200/20">
			<option value="all">Все</option>
			<option value="paint">Живопись</option>
			<option value="draw">Рисунок</option>
			<option value="photo">Фотография</option>
			<option value="dpi">ДПИ</option>
		</select>

		<div
			class="grid grid-flow-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:m-20 sm:m-3"
			v-auto-animate>
			<div
				v-for="(record, index) in recordsArr"
				:key="index"
				class="grid items-center m-2 box-sizing overflow-hidden">
				<div class="">
					<img
						:src="record[6]"
						@click="openModal(record[6], index)"
						class="md:hover:scale-110 transition duration-400 mb-3 sm:max-h-[143px] sm:max-w-[190px] cursor-pointer"
						alt="photo" />
				</div>
				<div>
					<p class="text-sm text-neutral-700 max-w-[160px]">
						{{ record[0] }}
					</p>
					<p class="text-sm text-neutral-500">({{ record[4] }})</p>
				</div>
			</div>

			<ModalPhoto
				:info="personInfo"
				:show="showModal"
				:selectedPhotoURL="selectedPhotoURL"
				:closeModal="closeModal"
				:prevImage="prevImage"
				:nextImage="nextImage" />
		</div>
	</div>
</template>

<style scoped></style>
