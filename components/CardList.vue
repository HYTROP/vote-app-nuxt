<script setup>
defineProps({
	dataArray: Array,
	isFavorite: Boolean, // for favorites
	onClickFavorite: Function,
	personInfo: Object, //for modal
	showModal: Boolean, // for modal
	selectedPhotoURL: String, // for modal
});
</script>

<template>
	<div
		class="grid grid-flow-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:m-2 gap-8 sm:m-3"
		v-auto-animate>
		<CardComp
			v-for="(record, index) in dataArray"
			:key="record.id"
			:photo="record.photo"
			:fio="record.fio"
			:nomination="record.nomination"
			:onClickFavorite="() => $emit('onClickFavorite', record)"
			:isFavorite="record.isFavorite"
			:index="index"
			:showModal="showModal" />

		<ModalPhoto
			:onClickFavorite="() => $emit('addToFavorites', record)"
			:isFavorite="isFavorite"
			:info="personInfo"
			:show="showModal"
			:selectedPhotoURL="selectedPhotoURL" />
	</div>
</template>
