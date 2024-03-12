<template>
	<div>
		<h1>FAVORITES</h1>
		<p>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad ipsum totam
			error nulla quibusdam soluta quae enim assumenda dignissimos. Dolorem ea
			consectetur quos, pariatur dignissimos explicabo recusandae sequi mollitia
			porro!
		</p>
	</div>
</template>

<script setup>
// const client = useSupabase();

// const fetchFavorites = async () => {
// 	try {
// 		const { data: favorites } = await client.from('favorites').select('*');
// 		filteredDataArr.value = filteredDataArr.value.map((item) => {
// 			const favoriteItem = favorites.find((obj) => obj.parentId === item.id);

// 			if (!favoriteItem) {
// 				return item;
// 			}

// 			return {
// 				...item,
// 				isFavorite: true,
// 				favoriteId: favoriteItem.id,
// 			};
// 		});
// 	} catch (error) {
// 		console.error(error);
// 	}
// };
// onMounted(async () => {
// 	// await fetchFavorites();
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
