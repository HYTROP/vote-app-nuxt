<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import { _API_KEY, _GOOGLE_SHEETS_KEY, sheetRange } from '../API/Api';

import StarsRate from './StarsRate.vue';

const records = ref([]);
const imageSrc = ref('');
const showModal = ref(false);

const openModal = () => {
	showModal.value = true;
};

const closeModal = () => {
	showModal.value = false;
};

onMounted(async () => {
	try {
		const response = await axios.get(
			`https://sheets.googleapis.com/v4/spreadsheets/${_GOOGLE_SHEETS_KEY}/values/${sheetRange}?key=${_API_KEY}`
		);
		records.value = response.data.values;
	} catch (error) {
		console.error('Ошибка при получении записей из Google Sheets:', error);
	}
	// console.log(records.value);
	imageSrc.value =
		'https://img.freepik.com/free-vector/gradient-grainy-texture_23-2148981502.jpg?w=2000&t=st=1707585926~exp=1707586526~hmac=3feb2904596c984dd3a63d75b279d70f8aac8363285995ea8d2ec3989c327240';
});
</script>

<template>
	<div class="p-10 sticky top-0 left-0">
		<h2 class="text-xl font-bold mb-4">Участники конкурса</h2>
		<div class="overflow-scroll scrollbar-hide relative">
			<div v-if="showModal" class="modal">
				<span class="close" @click="closeModal">&times;</span>
				<img class="modal-content" :src="imageSrc" />
				<div class="flex items-center absolute top-3/4 right-[43%]">
					<StarsRate />
				</div>
			</div>

			<table class="border border-black">
				<thead>
					<tr>
						<th class="border border-black px-4 py-2">ФИО</th>
						<th class="border border-black px-4 py-2">Email</th>
						<th class="border border-black px-4 py-2">Phone</th>
						<th class="border border-black px-4 py-2">Age</th>
						<th class="border border-black px-4 py-2">Nomination</th>
						<th class="border border-black px-4 py-2">Info</th>
						<th class="border border-black px-4 py-2">Работа</th>
						<th class="border border-black px-4 py-2">Bio</th>
						<th class="border border-black px-4 py-2">Город</th>
						<th class="border border-black px-4 py-2">Откуда</th>
						<th class="border border-black px-4 py-2">OrderId</th>
						<th class="border border-black px-4 py-2">PaymentId</th>
						<th class="border border-black px-4 py-2">Products</th>
						<th class="border border-black px-4 py-2">Price</th>
						<th class="border border-black px-4 py-2">Currency</th>
						<th class="border border-black px-4 py-2">Payment Status</th>
						<th class="border border-black px-4 py-2">Referer</th>
						<th class="border border-black px-4 py-2">FormId</th>
						<th class="border border-black px-4 py-2">Form name</th>
						<th class="border border-black px-4 py-2">Sent</th>
						<th class="border border-black px-4 py-2">RequestId</th>
						<th class="border border-black px-4 py-2">Teacher</th>
						<th class="border border-black px-4 py-2">School</th>
					</tr>
				</thead>
				<tbody>
					<tr
						class="border border-black"
						v-for="(record, index) in records"
						:key="index">
						<td class="border border-black px-4 py-2">
							{{ record[0] }}
						</td>
						<td class="border border-black px-4 py-2">
							{{ record[1] }}
						</td>
						<td class="border border-black px-4 py-2 whitespace-nowrap">
							{{ record[2] }}
						</td>
						<td class="border border-black px-4 py-2">
							{{ record[3] }}
						</td>
						<td class="border border-black px-4 py-2">
							{{ record[4] }}
						</td>
						<td class="border border-black px-4 py-2 min-w-[200px]">
							{{ record[5] }}
						</td>
						<td class="border border-black px-4 py-10 w-auto">
							<div class="w-44">
								<img :src="imageSrc" @click="openModal" />
							</div>
						</td>

						<td class="border border-black px-4 py-2 min-w-[350px]">
							{{ record[7] }}
						</td>
						<td class="border border-black px-4 py-2">
							{{ record[8] }}
						</td>
						<td class="border border-black px-4 py-2">
							{{ record[9] }}
						</td>
						<td class="border border-black px-4 py-2">
							{{ record[10] }}
						</td>
						<td class="border border-black px-4 py-2 min-w-[180px]">
							{{ record[11] }}
						</td>
						<td class="border border-black px-4 py-2 min-w-[200px]">
							{{ record[12] }}
						</td>
						<td class="border border-black px-4 py-2">
							{{ record[13] }}
						</td>
						<td class="border border-black px-4 py-2">
							{{ record[14] }}
						</td>
						<td class="border border-black px-4 py-2">
							{{ record[15] }}
						</td>
						<td class="border border-black px-4 py-2">
							{{ record[16] }}
						</td>
						<td class="border border-black px-4 py-2">
							{{ record[17] }}
						</td>
						<td class="border border-black px-4 py-2">
							{{ record[18] }}
						</td>
						<td class="border border-black px-4 py-2 whitespace-nowrap">
							{{ record[19] }}
						</td>
						<td class="border border-black px-4 py-2">
							{{ record[20] }}
						</td>
						<td class="border border-black px-4 py-2">
							{{ record[21] }}
						</td>
						<td class="border border-black px-4 py-2">
							{{ record[22] }}
						</td>
					</tr>
				</tbody>
			</table>
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
	background-color: rgba(0, 0, 0, 0.8);
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
</style>
