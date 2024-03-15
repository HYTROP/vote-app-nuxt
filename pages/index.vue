<script setup>
const { recordsArr } = inject('dataProvider');
const filteredDataArr = ref([]);

const showModal = ref(false);
const personInfo = ref([]);
const selectedPhotoURL = ref('');
const currentIndex = ref(0);

definePageMeta({
	middleware: ['auth'],
});
// ---------------------

watch(recordsArr, () => {
	filterDataFunc();
});

const filterOptions = [
	'Все',
	'Живопись',
	'Рисунок',
	'Фотография',
	'ДПИ (Декоративно-прикладное искусство)',
];

const selectedFilters = ref(filterOptions[0]);

const filterDataFunc = () => {
	filteredDataArr.value = recordsArr.value.filter((item) => {
		if (selectedFilters.value === 'Все') {
			return recordsArr.value;
		} else {
			return item.nomination === selectedFilters.value;
		}
	});
};

const openModal = (modalPhotoURL, index) => {
	console.log('CLICK MODAL');
	showModal.value = true;
	selectedPhotoURL.value = modalPhotoURL;

	currentIndex.value = index;

	const findPerson = filteredDataArr.value.find(
		(item) => item.photo === modalPhotoURL,
	);
	personInfo.value = findPerson;

	document.body.style.overflow = 'hidden';
};

const closeModal = () => {
	showModal.value = false;
	selectedPhotoURL.value = null;

	document.body.style.overflow = 'auto';
};

const nextImage = () => {
	const currentPhotoURL = selectedPhotoURL.value;
	const currentIndexInArr = filteredDataArr.value.findIndex(
		(item) => item.photo === currentPhotoURL,
	);

	const nextIndex =
		currentIndexInArr < filteredDataArr.value.length - 1
			? currentIndexInArr + 1
			: 0;

	selectedPhotoURL.value = filteredDataArr.value[nextIndex].photo;
	personInfo.value = filteredDataArr.value[nextIndex];
};

const prevImage = () => {
	const currentPhotoURL = selectedPhotoURL.value;
	const currentIndexInArr = filteredDataArr.value.findIndex(
		(item) => item.photo === currentPhotoURL,
	);

	const prevIndex =
		currentIndexInArr > 0
			? currentIndexInArr - 1
			: filteredDataArr.value.length - 1;

	selectedPhotoURL.value = filteredDataArr.value[prevIndex].photo;
	personInfo.value = filteredDataArr.value[prevIndex];
};

provide('modalActions', {
	showModal,
	openModal,
	closeModal,
	nextImage,
	prevImage,
	personInfo,
	selectedPhotoURL,
	currentIndex,
});

useHead({
	title: 'Палитра талантов | Галерея',
	meta: [
		{
			name: 'description',
			content: 'Галерея',
		},
	],
});
</script>

<template>
	<div v-auto-animate>
		<h1
			class="text-xl text-neutral-800 font-bold m-2 lg:flex md:grid-cols-2 md:mx-2"
		>
			Галерея /
			{{ selectedFilters }} ({{ filteredDataArr.length }})
		</h1>

		<label for="filterSelect" class="flex text-sm text-gray-700" />
		<select
			v-if="filteredDataArr.length > 0"
			id="filterSelect"
			v-model="selectedFilters"
			class="w-[150px] truncate p-1 m-2 border-2 border-indigo-400 rounded-lg appearance-auto"
			@change="filterDataFunc"
		>
			<option v-for="option in filterOptions" :key="option" class="border-none">
				{{ option }}
			</option>
		</select>

		<LoaderSpin v-if="recordsArr.length === 0" class="w-20 h-14" />

		<!-- grid -->
		<CardList :data-array="filteredDataArr" />
	</div>
</template>

<style scoped></style>
