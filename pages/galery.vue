<!-- <script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import { _API_KEY, _GOOGLE_SHEETS_KEY, sheetRange } from '../API/Api';

import StarsRate from '../components/StarsRate.vue';

const recordsArr = ref([]);
const showModal = ref(false);

//  --------------------
const photos = ref([]);

const folderId = '1HTf8I35XQflhavhCRBJSKFqMxZsOLxJu';

const params = {
	q: `'${folderId}' in parents`,
	key: _API_KEY,
};
// ---------------------

const openModal = () => {
	showModal.value = true;
};

const closeModal = () => {
	showModal.value = false;
};

const getPhotoUrl = (photoId) => {
	return `https://drive.google.com/thumbnail?id=${photoId}`;
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
		console.error('Ошибка при получении записей из Google Sheets:', error);
	}
});
</script>

<template>
	<div class="mt-6">
		<div class="h-20 fixed bg-white top-0 w-full">
			<h1 class="text-2xl font-bold m-6">ГАЛЕРЕЯ / Участники конкурса</h1>
		</div>
		<div
			class="grid grid-flow-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4 m-20"
			v-auto-animate>
			<div
				v-for="photo in photos"
				:key="photo.id"
				class="min-w-[300px] flex items-center justify-center">
				<img
					:src="getPhotoUrl(photo.id)"
					@click="openModal"
					class="shadow-xl" />

				<div v-if="showModal" class="modal">
					<span class="close" @click="closeModal">&times;</span>
					<img class="modal-content" :src="getPhotoUrl()" />
					<div class="flex items-center absolute top-3/4 right-[43%]">
						<StarsRate />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.modal {
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-color: rgba(0, 0, 0, 0.055);
}
.modal-content {
	margin: 15% auto;
	display: block;
	width: 80%;
	max-width: 700px;
}
.close {
	color: #fff;
	position: absolute;
	top: 25px;
	right: 55px;
	font-size: 60px;
	font-weight: bold;
	transition: 0.4s;
}
.close:hover,
.close:focus {
	color: #bbb;
	text-decoration: none;
	cursor: pointer;
}
</style> -->

<template></template>

<script>
export default {};
</script>

<style></style>
