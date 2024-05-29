<script setup>
const { favoritePhotoURLs } = storeToRefs(useMyFetchItemsStore());

const { allRecordsFromDBREF } = storeToRefs(useMyFetchItemsStore());

watchEffect(() => {
	favoritePhotoURLs.value;
});

const isLoaded = ref(true);

const favoritesItems = ref([]);

onMounted(async () => {
	await useMyFetchItemsStore().fetchFavorites();
	await useMyFetchItemsStore().fetchItems();
	await useMyFetchItemsStore().fetchItemsFromDB();

	favoritesItems.value = allRecordsFromDBREF.value.filter((item) =>
		favoritePhotoURLs.value.includes(item.photo),
	);

	isLoaded.value = false;
});

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

<template>
	<div>
		<ProgressBarFetch :show="isLoaded" />
		<h1
			class="text-xl text-neutral-800 font-bold my-2 mb-6 lg:flex md:grid-cols-2 md:mx-2"
		>
			Избранное /
		</h1>

		<LoaderSpin class="w-14 h-20" v-if="!favoritesItems.length" />
		<div v-if="!isLoaded">
			<CardList v-if="favoritesItems.length" :recordsArr="favoritesItems" />
			<div v-else class="text-2xl text-center">Здесь пока ничего нет</div>
		</div>
	</div>
</template>

<style scoped></style>
