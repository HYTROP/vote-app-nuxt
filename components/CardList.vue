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
		<!-- <div
			v-for="(record, index) in dataArray"
			:key="record.id"
			class="overflow-hidden border p-2 border-neutral-300 rounded-lg shadow-md flex flex-col justify-between max-h-[283px] sm:max-h-[253px]">
			<div
				@click="$emit('openModal', record.photo, index)"
				class="sm:max-h-[223px] sm:max-w-[317px] mb-8 cursor-pointer md:hover:scale-110 transition duration-500 overflow-hidden">
				<NuxtImg
					:src="record.photo"
					loading="lazy"
					quality="30"
					alt="photo"
					class="justify-items-stretch" />
			</div>
			<div class="flex justify-between">
				<div>
					<p class="text-sm text-neutral-700 max-w-[160px]">
						{{ record.fio }}
					</p>
					<p class="text-sm text-neutral-500/90 max-w-[136px] truncate">
						{{ record.nomination }}
					</p>
				</div>
				<LikeBtn
					class="m-2 relative right-0 z-20 w-6 h-6 cursor-pointer hover:scale-125 transition duration-500 ease-in-out" />
			</div>
		</div> -->

		<ModalPhoto
			:onClickFavorite="() => $emit('addToFavorites', record)"
			:isFavorite="isFavorite"
			:info="personInfo"
			:show="showModal"
			:selectedPhotoURL="selectedPhotoURL" />
	</div>
</template>
