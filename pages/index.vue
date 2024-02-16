<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import { _API_KEY, _GOOGLE_SHEETS_KEY, sheetRange } from '../API/Api';

const recordsArr = ref([]);
const URLs = ref([]);
const PersonInfo = ref([]);
const showModal = ref(false);
const photos = ref([]);

const selectedPhotoId = ref(null);

const folderId = '1HTf8I35XQflhavhCRBJSKFqMxZsOLxJu';

const params = {
	q: `'${folderId}' in parents`,
	key: _API_KEY,
};
// ---------------------

const selectedPhotoUrl = computed(() => {
	const selectedPhoto = photos.value.find(
		(photo) => photo.id === selectedPhotoId.value
	);
	return selectedPhoto ? getPhotoUrl(selectedPhoto.id) : null;
});
const getPhotoUrl = (id) => {
	return `https://lh3.googleusercontent.com/d/${id}=s2620`;
};

const openModal = (photoId) => {
	showModal.value = true;
	selectedPhotoId.value = photoId;
};

const closeModal = () => {
	showModal.value = false;
	selectedPhotoId.value = null;
};

onMounted(async () => {
	try {
		// -------------------- Google Drive
		const responseDrive = await axios.get(
			'https://www.googleapis.com/drive/v3/files',
			{ params }
		);
		photos.value = responseDrive.data.files;

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

		const fullInfoArr = recordsArr.value.map((subArray, index) => {
			const photoToAdd = photos.value[index];
			return { ...subArray, ...photoToAdd };
		});
		recordsArr.value = fullInfoArr;

		const getUrlFromSheets = recordsArr.value.map((item) => item.id);
		URLs.value = getUrlFromSheets;
	} catch (error) {
		console.error('Ошибка при получении записей из Google :', error);
	}
});
</script>

<template>
	<div>
		<div class="top-0 left-[10%] w-full fixed bg-neutral-200/5 h-20 z-10">
			<h1 class="text-2xl font-bold m-6">ГАЛЕРЕЯ /</h1>
		</div>

		<div
			class="grid grid-flow-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 m-20"
			v-auto-animate>
			<div v-for="record in recordsArr" :key="record" class="group block">
				<img
					:src="record[6]"
					@click="openModal(record[6])"
					class="shadow-2xl hover:scale-110 transition duration-400 mb-3 group-hover:stroke-white" />
				<p
					class="active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300">
					{{ record[0] }}
				</p>
			</div>

			<ModalPhoto
				:photos="recordsArr"
				:show="showModal"
				:imageUrl="selectedPhotoId"
				:info="PersonInfo"
				@click="closeModal" />
		</div>
	</div>
</template>

<style scoped></style>
