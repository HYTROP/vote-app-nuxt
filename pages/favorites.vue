<template>
	<div>
		<h1
			class="text-xl text-neutral-800 font-bold m-2 lg:flex md:grid-cols-2 md:mx-2"
		>
			Избранное /
		</h1>

		<!-- <label for="filterSelect" class="flex text-sm text-gray-700" />
		<select
			id="filterSelect"
			v-model="selectedFilters"
			class="w-[150px] truncate p-1 m-2 border-2 border-indigo-400 rounded-lg appearance-auto"
			@change="filterDataFavorites"
		>
			<option v-for="option in filterOptions" :key="option" class="border-none">
				{{ option }}
			</option>
		</select> -->

		<!-- <p v-if="favoritesItems.length === 0" class="text-2xl text-center">
			В избранном пока ничего нет
		</p> -->

		<p v-if="favoritesItems.length === 0" class="text-2xl text-center">
			В выбранной категории пока ничего нет
		</p>
		<LoaderSpin class="w-14 h-20" v-if="favoritesItems.length === 0" />

		<CardList :dataArray="favoritesItems" />

		<!-- <ModalPhoto
			:onClickFavorite="onClickFavorite"
			:isFavorite="isFavorite"
			:selectedPhotoURL="selectedPhotoURL"
		/> -->
	</div>
</template>

<script setup>
const favoritesItems = ref([]);

const { recordsArr } = inject('dataProvider');

favoritesItems.value = recordsArr.value.filter(
	(item) => item.isFavorite || false,
);

// const filterOptions = [
// 	'Все',
// 	'Живопись',
// 	'Рисунок',
// 	'Фотография',
// 	'ДПИ (Декоративно-прикладное искусство)',
// ];
// const selectedFilters = ref(filterOptions[0]);

// const filterDataFavorites = () => {
// 	console.log('CLICKED', selectedFilters.value);
// 	favoritesItems.value = favoritesItems.value.filter((item) => {
// 		if (selectedFilters.value === 'Все') {
// 			return favoritesItems.value;
// 		} else {
// 			return item.nomination === selectedFilters.value;
// 		}
// 	});
// };

watchEffect(() => {
	favoritesItems.value = recordsArr.value.filter(
		(item) => item.isFavorite || false,
	);
});

// watch(recordsArr, () => {
// 	filterDataFavorites();
// });

useHead({
	title: 'Палитра талантов | Избранное',
	meta: [
		{
			name: 'description',
			content: 'Избранное',
		},
	],
});
</script>

<style scoped></style>
