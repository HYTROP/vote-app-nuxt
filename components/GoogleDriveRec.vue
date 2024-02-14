<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import { _API_KEY } from '../API/Api';

const photos = ref([]);

const folderId = '1HTf8I35XQflhavhCRBJSKFqMxZsOLxJu';

const params = {
	q: `'${folderId}' in parents`,
	key: _API_KEY,
};

onMounted(async () => {
	try {
		const response = await axios.get(
			'https://www.googleapis.com/drive/v3/files',
			{ params }
		);
		photos.value = response.data.files;
	} catch (error) {
		console.error('Ошибка при получении записей из Google Drive:', error);
	}
});

const getPhotoUrl = (photoId) => {
	// console.log(photoId);
	return `https://drive.google.com/thumbnail?id=${photoId}`;
};
</script>

<template>
	<div class="p-10 w-full">
		<div class="w-full" v-for="photo in photos" :key="photo.id">
			<img :src="getPhotoUrl(photo.id)" />
		</div>
	</div>
</template>

<style scoped></style>
