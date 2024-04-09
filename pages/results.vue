<template>
	<LoaderSpin class="w-14 h-20" v-if="recordsArr.length === 0" />

	<div v-else>
		<div class="flex mb-2">
			<h1
				class="text-xl text-neutral-800 font-bold m-2 lg:flex md:grid-cols-2 md:mx-3"
			>
				Результаты /
			</h1>

			<div class="m-2">
				<label for="filterNominations" class="flex text-sm text-gray-700" />
				<select
					id="filterNominations"
					v-model="selectFilter"
					class="w-[150px] truncate p-1 border-2 border-indigo-400 rounded-lg appearance-auto"
					@change="filterNominationsPoints"
				>
					<option
						v-for="option in filterOptionsPoints"
						:key="option"
						class="border-none"
					>
						{{ option }}
					</option>
				</select>
			</div>
		</div>

		<div class="overflow-x-auto pl-2">
			<table class="w-full">
				<thead class="text-left text-sm md:text-xl text-neutral-600">
					<tr>
						<th class="min-w-[50px]">Место</th>
						<th class="min-w-[100px]">Баллы</th>
						<th class="min-w-[100px]">ФИО</th>
						<th class="w-[300px]">Номинация</th>
						<th>Работа</th>
					</tr>
				</thead>
				<tbody v-for="(item, index) in filteredItems" class="border-b-2">
					<tr>
						<td class="text-md md:text-xl font-bold text-indigo-600">
							#
							{{ index + 1 }}
						</td>
						<td class="text-lg md:text-xl font-bold text-neutral-700">
							{{ item.points }}
						</td>
						<td class="text-sm md:text-xl">
							{{ item.fio }}
						</td>
						<td class="text-sm md:text-xl">
							{{ item.nomination }}
						</td>
						<td>
							<div>
								<NuxtImg
									:src="item.photo"
									alt="photo"
									class="max-w-[200px] max-h-[150px] cursor-pointer hover:scale-150 transition duration-500 ease-in-out"
								/>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
// const recordsArr = useState('recordsArr', () => []);
const { recordsArr } = inject('dataProvider', () => []);
console.log('recordsArr', recordsArr);

const filteredItems = useState('filteredItems', () => []);
const matchItems = ref([]);

const supabase = useSupabaseClient();

const filterOptionsPoints = [
	'Живопись',
	'Рисунок',
	'Фотография',
	'ДПИ (Декоративно-прикладное искусство)',
];
const selectFilter = ref(filterOptionsPoints[0]);

const fetchAllUsersPoints = async () => {
	const { data: responseData, error } = await supabase
		.from('UserPoints')
		.select('*');

	if (error) {
		console.error('Error fetching data:', error.message);
		return;
	}
	console.log('fetchAllUsersPoints', responseData);

	const cardAverages = [];
	responseData.forEach((item) => {
		if (!(item.cardID in cardAverages)) {
			cardAverages[item.cardID] = [];
		}
		cardAverages[item.cardID].push(item.points);
	});

	// среднее арифметическое
	for (const cardID in cardAverages) {
		const pointsArray = cardAverages[cardID];
		const average =
			pointsArray.reduce((acc, curr) => acc + curr, 0) / pointsArray.length;
		cardAverages[cardID] = average.toFixed(1);
	}
	// Добавление поля points к каждому элементу item
	const itemsWithPoints = recordsArr.value.map((item) => {
		const points = cardAverages[item.photo] || 0;
		return { ...item, points };
	});

	// Сортировка по баллам
	const sortedItemsByPoints = itemsWithPoints.sort(
		(a, b) => b.points - a.points,
	);

	// console.log(sortedItemsByPoints);

	// Фильтрация с учетом обновленных данных
	matchItems.value = sortedItemsByPoints.filter((item) => {
		return item.points > 0;
	});
};

const filterNominationsPoints = () => {
	filteredItems.value = matchItems.value.filter(
		(item) => item.nomination === selectFilter.value,
	);
};

onMounted(async () => {
	await fetchAllUsersPoints();
	filterNominationsPoints();
});

watchEffect(() => {
	fetchAllUsersPoints();
});

useHead({
	title: 'Палитра талантов | Результаты',
	meta: [
		{
			name: 'description',
			content: 'Результаты',
		},
	],
});
</script>

<style scoped></style>
