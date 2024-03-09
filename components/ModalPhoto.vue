<script setup>
defineProps({
	nextImage: Function,
	prevImage: Function,
	closeModal: Function,
	show: Boolean,
	selectedPhotoURL: String,
	info: Object,
	onClickFavorite: Function,
});

const closeModal = inject('closeModal');
const nextImage = inject('nextImage');
const prevImage = inject('prevImage');
</script>

<template>
	<div v-if="show" class="modal">
		<span class="close" @click="closeModal">×</span>

		<div>
			<span class="prev z-20 text-9xl" @click="prevImage">&#10094;</span>
			<span class="next z-20 text-lg" @click="nextImage">&#10095;</span>
		</div>
		<div class="flex-col justify-center items-center">
			<div
				class="flex justify-center items-center pt-20 pr-8 pb-0 pl-8 sm:justify-center md:max-h-[80%]">
				<div class="md:max-w-[90%]">
					<NuxtImg
						loading="lazy"
						quality="100"
						:src="selectedPhotoURL"
						alt="photo"
						class="md:min-h-[45vh] md:min-w-[45vh] box-border" />

					<LikeBtn
						@click="onClickFavorite"
						class="m-2 relative right-0 z-20 w-6 h-6 cursor-pointer hover:scale-125 transition duration-500 ease-in-out" />
				</div>
			</div>

			<div class="flex pl-10 pr-10">
				<div class="sm:ml-0 mt-4">
					<p class="text-white text-md mb-1 max-w-[250px]">
						{{ info.fio }}
					</p>
					<p class="text-white text-sm mb-1">
						{{ info.age }}
					</p>
					<p class="text-white text-sm mb-1 max-w-[250px]">
						{{ info.info }}
					</p>
					<p class="text-white text-sm mb-1 max-w-[250px]">
						{{ info.nomination }}
					</p>
					<p class="text-white text-sm mb-4 max-w-[250px]">
						{{ info.city }}
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
	background-color: rgba(0, 0, 0, 0.9);
}

.close {
	position: absolute;
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
}

.prev,
.next {
	position: absolute;
	top: 50%;
	width: auto;
	margin-top: -22px;
	padding: 16px;
	color: white;
	font-weight: bold;
	font-size: 28px;
	transition: 0.6s ease;
	border-radius: 0 3px 3px 0;
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
