<script setup>
const props = defineProps({
	dataArray: Array,
	showModal: Boolean,
});

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const { favoritesURLs } = inject('dataProvider');

const onClickFavorite = async (item) => {
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
// const checkCardPoints = async (cardID) => {
// 	try {
// 		const { data: existingPoints, error } = await supabase
// 			.from('UserPoints')
// 			.select('*')
// 			.eq('cardID', cardID)
// 			.eq('userID', user.value.id);
// 	} catch (error) {
// 		console.error('Error checking if card has points:', error.message);
// 	}
// };
</script>

<template>
	<Skeleton v-if="!dataArray" />
	<div
		class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:m-2 gap-8 sm:m-3 my-3"
	>
		<CardComp
			v-for="record in dataArray"
			:key="record.id"
			:record="record"
			:onClickFavorite="onClickFavorite"
			:isFavorite="record.isFavorite"
		/>
		<ModalPhoto :showModal="showModal" :onClickFavorite="onClickFavorite" />
	</div>
</template>
