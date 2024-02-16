<template>
	<div v-if="show" class="modal">
		<div class="modal-content">
			<span class="close" @click="closeModal">×</span>
			<img :src="imageUrl" class="modal-image" />
		</div>
		<div class="infoText">
			<p class="text-white text-xl">{{ info }}</p>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const currentPhoto = ref(0);

const images = ref([]);

const showNext = () => {
	if (currentPhoto.value < images.value.length - 1) {
		currentPhoto.value++;
	}
};

const showPrev = () => {
	if (currentIndex.value > 0) {
		currentIndex.value--;
	}
};

const props = defineProps({
	show: {
		type: Boolean,
		default: false,
	},
	imageUrl: {
		type: String,
		default: '',
	},

	info: {
		type: String,
		default: '',
	},
});

onMounted(() => {
	window.addEventListener('keydown', (event) => {
		if (event.key === 'ArrowRight') {
			showNext();
		} else if (event.key === 'ArrowLeft') {
			showPrev();
		}
	});
});

const nextImage = () => {
	showNext();
};

const prevImage = () => {
	showPrev();
};

const { closeModal } = defineEmits(['closeModal']);
</script>

<style scoped>
/* Стили для модального окна */
.modal {
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.8);
}

.modal-content {
	max-width: 80%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 6% auto;
	max-height: 1000px;
}

.close {
	position: absolute;
	top: 20px;
	right: 40px;
	color: #aaaaaa;
	font-size: 48px;
	font-weight: bold;
	cursor: pointer;
}
.infoText {
	display: flex;
	justify-content: center;
	align-items: center;
	bottom: 40px;
	left: 40px;
	color: #aaaaaa;
	font-size: 12px;
}

/* .close:hover,
.close:focus {
	color: #000;
	text-decoration: none;
	cursor: pointer;
} */

.modal-image {
	max-width: 90vw;
	max-height: 80vh;
}

.modal-content:before,
.modal-content:after {
	content: '';
	display: block;
	position: absolute;
	top: 50%;
	width: 30px;
	height: 30px;
	background: #ffffff;
	transform: translateY(-50%);
	cursor: pointer;
}

/* Стили для стрелки влево */
.modal-content:before {
	left: 10px; /* Установите расположение по вашему усмотрению */
	clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
}

/* Стили для стрелки вправо */
.modal-content:after {
	right: 10px; /* Установите расположение по вашему усмотрению */
	clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
}
</style>
