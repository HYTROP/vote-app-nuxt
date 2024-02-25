<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import { _API_KEY, _GOOGLE_SHEETS_KEY, sheetRange } from '../API/Api';

const recordsArr = ref([]); // Sheets data
const photos = ref([]); // Drive data

const showModal = ref(false); // Modal show
const selectedPhotoId = ref(null); // Selected photo modal
const personInfo = ref([]); // Person info for modal

const folderId = '1HTf8I35XQflhavhCRBJSKFqMxZsOLxJu';

const params = {
	q: `'${folderId}' in parents`,
	key: _API_KEY,
	pageSize: 1000,
};
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
			`https://sheets.googleapis.com/v4/spreadsheets/${_GOOGLE_SHEETS_KEY}/values/${sheetRange}?key=${_API_KEY}`
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
	return `https://lh3.googleusercontent.com/d/${id}=s2620`;
};

const openModal = (photoId) => {
	// record[6] inside foo
	showModal.value = true;
	selectedPhotoId.value = photoId;

	const findPerson = recordsArr.value.find((item) => item[6] === photoId);
	personInfo.value = findPerson;
};

const closeModal = () => {
	showModal.value = false;
	selectedPhotoId.value = null;
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
			<div v-for="record in recordsArr" :key="record">
				<div class="flex items-center justify-center">
					<img
						:src="record[6]"
						@click="openModal(record[6])"
						class="shadow-2xl md:hover:scale-110 transition duration-400 mb-3"
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
				:imageUrl="selectedPhotoId"
				:closeModal="closeModal" />
		</div>
	</div>
</template>

<style scoped></style>
