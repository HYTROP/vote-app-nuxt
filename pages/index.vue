<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { params } from '../API/Api';
import { paramsSheets } from '../API/Api';

import { _API_KEY, _GOOGLE_SHEETS_KEY, sheetRange } from '../API/Api';

const recordsArr = ref([]); // Sheets data
const photos = ref([]); // Drive data

const showModal = ref(false); // Modal show
const selectedPhotoURL = ref(''); // Selected photo modal
const currentIndex = ref(0);
const personInfo = ref([]); // Person info for modal

// ---------------------

onMounted(async () => {
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

	try {
		// -------------------- Google Sheets
		const responseSheets = await axios.get(
			`https://sheets.googleapis.com/v4/spreadsheets/${_GOOGLE_SHEETS_KEY}/values/${sheetRange}?key=${_API_KEY}`,
			{ paramsSheets }
		);

		recordsArr.value = responseSheets.data.values.map((item) => {
			const result = item;
			const separate = result[6].split('/');
			const nameUrl = decodeURIComponent(separate[separate.length - 1]);

			const obj = photos.value.find((photo) => photo.name === nameUrl);
			result[6] = getPhotoUrl(obj.id);

			return result;
		});
	} catch (error) {
		console.error('Ошибка при получении записей из Google SHEETS:', error);
	}
});

const getPhotoUrl = (id) => {
	return `https://lh3.googleusercontent.com/d/${id}=s1620`;
};

const openModal = (recordURL, index) => {
	showModal.value = true;
	selectedPhotoURL.value = recordURL;

	currentIndex.value = index; // получаем индекс текущей фотографии
	console.log('currentIndex', currentIndex.value);

	const findPerson = recordsArr.value.find((item) => item[6] === recordURL);
	personInfo.value = findPerson;
};

const closeModal = () => {
	showModal.value = false;
	selectedPhotoURL.value = null;
};

const nextImage = () => {
	if (currentIndex.value < recordsArr.value.length - 1) {
		currentIndex.value++;
	} else {
		currentIndex.value = 0;
	}
	selectedPhotoURL.value = recordsArr.value[currentIndex.value][6];
	personInfo.value = recordsArr.value[currentIndex.value];
	console.log('nextImage', currentIndex.value);
};

const prevImage = () => {
	if (currentIndex.value > 0) {
		currentIndex.value--;
	} else {
		currentIndex.value = recordsArr.value.length - 1;
	}
	selectedPhotoURL.value = recordsArr.value[currentIndex.value][6];
	personInfo.value = recordsArr.value[currentIndex.value];
	console.log('prevImage', currentIndex.value);
};
</script>

<template>
	<div class="grid grid-flow-cols-1 sm:grid-flow-cols-1 sm:items-center">
		<h1 class="text-xl font-bold m-2 lg:flex md:grid-cols-2 md:m-2">
			ГАЛЕРЕЯ /
		</h1>

		<div
			class="grid grid-flow-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:m-20 sm:m-3"
			v-auto-animate>
			<div v-for="(record, index) in recordsArr" :key="index">
				<div class="flex justify-center items-center">
					<img
						:src="record[6]"
						@click="openModal(record[6], index)"
						class="shadow-2xl md:hover:scale-110 transition duration-400 mb-3 sm:max-h-[143px] sm:max-w-[190px] cursor-pointer"
						alt="photo" />
				</div>
				<div>
					<p class="text-sm ml-3 sm:m-3 text-neutral-700">
						{{ record[0] }}
					</p>
					<p class="text-sm ml-3 sm:m-3 text-neutral-500">({{ record[4] }})</p>
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
