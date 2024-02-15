<template>
	<div v-if="show" class="modal">
		<div class="modal-content">
			<span class="close" @click="closeModal">×</span>
			<img :src="imageUrl" class="modal-image" />
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	show: {
		type: Boolean,
		default: false,
	},
	imageUrl: {
		type: String,
		default: '',
	},
});

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

.close:hover,
.close:focus {
	color: #000;
	text-decoration: none;
	cursor: pointer;
}

.modal-image {
	max-width: 90vw;
	max-height: 90vh;
}
</style>
