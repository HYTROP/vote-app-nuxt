<script setup>
const props = defineProps({
	dataArray: Array,
	showModal: Boolean,
});

onMounted(() => {
	// console.log('dataArray cardlist:', props.dataArray);
});

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const { favoritesURLs } = inject('dataProvider');

const onClickFavorite = async (item) => {
	console.log('CLICK FAVORITE', item);
	const updatedURLs = item.isFavorite
		? favoritesURLs.value.filter((url) => url !== item.photo)
		: [...favoritesURLs.value, item.photo];

	const { data, error } = await supabase
		.from('favorites')
		.update({ favoritePhotoURLs: updatedURLs })
		.eq('userID', user.value.id)
		.select('*')
		.single();

	if (error) {
		throw error;
	}
	item.isFavorite = data.favoritePhotoURLs.includes(item.photo);
	favoritesURLs.value = updatedURLs;
};
</script>

<template>
	<Skeleton v-if="!dataArray" />
	<div
		class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 lg:m-2 gap-8 sm:m-3 my-3"
	>
		<div v-for="record in dataArray" :key="record.id">
			<CardComp
				:record="record"
				:onClickFavorite="onClickFavorite"
				:isFavorite="record.isFavorite"
			/>

			<ModalPhoto
				:showModal="showModal"
				:onClickFavorite="onClickFavorite"
				:isFavorite="record.isFavorite"
			/>
		</div>
	</div>
</template>
