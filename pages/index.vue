<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import { _API_KEY, _GOOGLE_SHEETS_KEY, sheetRange } from '../API/Api';

const recordsArr = ref([]);
const showModal = ref(false);
const photos = ref([]);

const selectedPhotoId = ref(null);

const folderId = '1HTf8I35XQflhavhCRBJSKFqMxZsOLxJu';

const params = {
	q: `'${folderId}' in parents`,
	key: _API_KEY,
	size: 'full',
};
// ---------------------

const selectedPhotoUrl = computed(() => {
	const selectedPhoto = photos.value.find(
		(photo) => photo.id === selectedPhotoId.value
	);
	return selectedPhoto ? getPhotoUrl(selectedPhoto.id) : null;
});
const getPhotoUrl = (photoId) => {
	return `https://lh3.googleusercontent.com/d/${photoId}=s2620`;
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
		recordsArr.value = responseSheets.data.values;
	} catch (error) {
		console.error('Ошибка при получении записей из Google :', error);
	}
});
</script>

<template>
	<div>
		<div class="absolute left-[22%] top-0 mb-10">
			<h1 class="text-2xl font-bold m-6">ГАЛЕРЕЯ / Участники конкурса</h1>
		</div>
		<div
			class="grid grid-flow-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 m-20"
			v-auto-animate>
			<div
				v-for="photo in photos"
				:key="photo.id"
				class="flex items-center justify-center">
				<img
					:src="getPhotoUrl(photo.id)"
					@click="openModal(photo.id)"
					class="shadow-xl" />
			</div>
			<ModalPhoto
				:show="showModal"
				:imageUrl="selectedPhotoUrl"
				@click="closeModal" />
		</div>
	</div>
</template>

<style scoped></style>
