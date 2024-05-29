<script setup>
const { showModal, personInfo, selectedPhotoURL } = defineProps([
	'showModal',
	'personInfo',
	'selectedPhotoURL',
]);

const useStore = useMyFetchItemsStore();
const actClickFavorite = useStore.actClickFavorite;

const emit = defineEmits(['closeModal', 'nextImage', 'prevImage']);
</script>

<template>
	<div v-if="showModal" class="modal">
		<div class="close fixed">
			<span @click="$emit('closeModal')">×</span>
		</div>

		<span class="prev text-2xl" @click="$emit('prevImage')">&#10094;</span>
		<span class="next text-2xl" @click="$emit('nextImage')">&#10095;</span>

		<div class="flex-col justify-center items-center">
			<div
				class="flex justify-center items-center pt-20 pr-8 pb-0 pl-8 sm:justify-center md:max-h-[80%]"
			>
				<div class="md:max-w-[90%]">
					<NuxtImg
						:src="personInfo.photo"
						quality="100"
						alt="photo"
						class="md:min-h-[45vh] md:min-w-[45vh] box-border"
					/>
					<div class="flex justify-center">
						<LikeBtn
							@click="actClickFavorite(personInfo)"
							:isFavorite="personInfo.isFavorite"
							class="m-2 relative right-0 w-5 h-6 cursor-pointer hover:scale-125 transition duration-500 ease-in-out"
						/>
					</div>
					<Rating class="text-xl text-yellow-100" :cardURL="personInfo.photo" />
				</div>
			</div>

			<div class="flex px-10 py-10">
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
	background-color: rgba(0, 0, 0, 0.88);
}

.close {
	top: 0px;
	right: 10px;
	color: #aaaaaa;
	font-size: 62px;
	font-weight: bold;
	cursor: pointer;
}

.close:hover,
.close:focus {
	color: #e9e9e9;
	text-decoration: none;
	transition: all 0.3s ease-in-out;
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
