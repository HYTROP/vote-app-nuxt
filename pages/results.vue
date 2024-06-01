<script setup>
const { matchItems } = storeToRefs(useMyFetchItemsStore());

const fetchAllUsersPoints = useMyFetchItemsStore().fetchAllUsersPoints;
const filteredItems = ref([]);

const filterNominationsPoints = () => {
	filteredItems.value = matchItems.value.filter(
		(item) => item.nomination === selectFilterResults.value,
	);
};

const filterOptionsPoints = [
	'Живопись',
	'Рисунок',
	'Фотография',
	'ДПИ (Декоративно-прикладное искусство)',
];

const selectFilterResults = ref(filterOptionsPoints[0]);

onMounted(async () => {
	await fetchAllUsersPoints();
});

watchEffect(() => {
	filterNominationsPoints();
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

<template>
	<div>
		<p v-if="matchItems.length == 0" class="text-2xl text-center">
			Ни одной фотографии не было оценено
		</p>
		<LoaderSpin class="w-14 h-20" v-if="matchItems.length == 0" />

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
						v-model="selectFilterResults"
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

			<div class="overflow-x-auto pl-2 p-4" v-auto-animate>
				<table class="w-full">
					<thead class="text-left text-sm md:text-xl text-neutral-600">
						<tr class="border-b">
							<th class="">Место</th>
							<th class="">Баллы</th>
							<th class="">ФИО</th>
							<th class="">Номинация</th>
							<th>Работа</th>
						</tr>
					</thead>
					<tbody v-for="(item, index) in filteredItems" class="border-b-2">
						<tr class="gap-x-2">
							<td
								class="text-xl md:text-2xl font-bold h-20 text-indigo-600"
								:class="{ 'text-yellow-600': index == 0 }"
							>
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
										class="max-w-[200px] max-h-[150px] cursor-pointer hover:scale-125 transition duration-500 ease-in-out"
									/>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
