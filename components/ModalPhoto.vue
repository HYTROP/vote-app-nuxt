<script setup>
defineProps({
	onClickFavorite: Function,
	showModal: Boolean,
	isFavorite: Boolean,
});

const {
	closeModal,
	nextImage,
	prevImage,
	selectedPhotoURL,
	personInfo,
	showModal,
} = inject('modalActions');
</script>

<template>
	<div v-if="showModal" class="modal">
		<span class="close fixed top-0 right-10" @click="closeModal">×</span>

		<span class="prev text-2xl" @click="prevImage">&#10094;</span>
		<span class="next text-2xl" @click="nextImage">&#10095;</span>

		<div class="flex-col justify-center items-center">
			<div
				class="flex justify-center items-center pt-20 pr-8 pb-0 pl-8 sm:justify-center md:max-h-[80%]"
			>
				<div class="md:max-w-[90%]">
					<NuxtImg
						:src="selectedPhotoURL"
						quality="100"
						alt="photo"
						class="md:min-h-[45vh] md:min-w-[45vh] box-border"
					/>
					<div class="flex justify-center">
						<LikeBtn
							@click="onClickFavorite(personInfo)"
							:isFavorite="personInfo.isFavorite"
							class="m-2 relative right-0 w-5 h-6 cursor-pointer hover:scale-125 transition duration-500 ease-in-out"
						/>
					</div>
					<Rating class="text-xl text-yellow-100" :cardID="selectedPhotoURL" />
				</div>
			</div>

			<div class="flex pl-10 pr-10">
				<div class="sm:ml-0 mt-4">
					<p class="text-white text-md mb-1 max-w-[250px]">
						{{ personInfo.fio }}
					</p>
					<p class="text-white text-sm mb-1">
						{{ personInfo.age }}
					</p>
					<p class="text-white text-sm mb-1 max-w-[250px]">
						{{ personInfo.info }}
					</p>
					<p class="text-white text-sm mb-1 max-w-[250px]">
						{{ personInfo.nomination }}
					</p>
					<p class="text-white text-sm mb-4 max-w-[250px]">
						{{ personInfo.city }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.modal {
	overflow: auto;
	position: fixed;
	z-index: 20;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.87);
}

.close {
	top: 0px;
	right: 0px;
	color: #aaaaaa;
	font-size: 52px;
	font-weight: bold;
	cursor: pointer;
}

.close:hover,
.close:focus {
	color: #f4a6a6;
	text-decoration: none;
	cursor: pointer;
	position: fixed;
}

.prev,
.next {
	position: fixed;
	top: 33%;
	width: auto;
	margin-top: -22px;
	padding: 16px;
	color: white;
	font-weight: bold;
	font-size: 32px;
	transition: 0.5s ease-in-out;
	border-radius: 12px 12px 12px 12px;
	user-select: none;
	cursor: pointer;
}

.prev {
	left: 0;
}

.next {
	right: 0;
}

.prev:hover,
.next:hover {
	background-color: rgba(0, 0, 0, 0.8);
}
</style>
