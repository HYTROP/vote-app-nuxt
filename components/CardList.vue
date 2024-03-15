<script setup>
defineProps({
	dataArray: Array,
	showModal: Boolean,
});
</script>

<template>
	<div
		class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 lg:m-2 gap-8 sm:m-3 my-3"
	>
		<CardComp v-for="record in dataArray" :key="record.id" :record="record" />

		<ModalPhoto
			:showModal="showModal"
			:record="record"
			:onClickFavorite="onClickFavorite"
		/>
	</div>
</template>
