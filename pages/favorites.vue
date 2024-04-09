<template>
	<div>
		<h1
			class="text-xl text-neutral-800 font-bold m-2 lg:flex md:grid-cols-2 md:mx-2"
		>
			Избранное /
		</h1>

		<p v-if="!favoritesItems.length" class="text-2xl text-center">
			В выбранной категории пока ничего нет...
		</p>
		<LoaderSpin class="w-14 h-20" v-if="favoritesItems.length === 0" />

		<CardList :dataArray="favoritesItems" />
	</div>
</template>

<script setup>
const favoritesItems = useState('favoritesItems', () => []);

const { recordsArr } = inject('dataProvider', () => []);

watchEffect(() => {
	favoritesItems.value;
});

onMounted(() => {
	favoritesItems.value = recordsArr.value.filter(
		(item) => item.isFavorite || false,
	);
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

<style scoped></style>
