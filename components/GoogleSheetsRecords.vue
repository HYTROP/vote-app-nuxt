<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import { _API_KEY, _GOOGLE_SHEETS_KEY, sheetRange } from '../API/API';

const records = ref([]);

onMounted(async () => {
	try {
		const response = await axios.get(
			`https://sheets.googleapis.com/v4/spreadsheets/${_GOOGLE_SHEETS_KEY}/values/${sheetRange}?key=${_API_KEY}`
		);
		records.value = response.data.values;
	} catch (error) {
		console.error('Ошибка при получении записей из Google Sheets:', error);
	}
});
</script>

<template>
	<div>
		<h1>Список записей из Google Sheets</h1>
		<ul>
			<li v-for="record in records" :key="record.id">
				{{ record[0] }}
				{{ record[1] }}
				{{ record[2] }}
				{{ record[3] }}
				{{ record[4] }}
				{{ record[5] }}
				{{ record[6] }}
				{{ record[7] }}
			</li>
		</ul>
	</div>
</template>
