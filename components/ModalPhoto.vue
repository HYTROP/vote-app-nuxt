<template>
	<div v-if="show" class="modal">
		<span class="close" @click="closeModal">×</span>

		<div class="modal-content">
			<img :src="imageUrl" class="modal-image" />

			<span class="prev" @click="prevImage">&#10094;</span>
			<span class="next" @click="nextImage">&#10095;</span>

			<div class="sm:ml-0 mt-4 max-w-[500px]">
				<p class="text-white text-md mb-1">
					{{ props.info[0] }}
				</p>
				<p class="text-white text-sm mb-1">
					{{ props.info[3] }}
				</p>
				<p class="text-white text-sm mb-1 w-1/2 lg:whitespace-nowrap">
					{{ props.info[5] }}
				</p>
				<p class="text-white text-md">
					{{ props.info[4] }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	closeModal: {
		type: Function,
		default: () => {},
	},
	show: {
		type: Boolean,
		default: false,
	},
	imageUrl: {
		type: String,
		default: '',
	},
	info: {
		type: Array,
		default: () => [],
	},
	photos: {
		type: Array,
		default: () => [],
	},
});

const prevImage = () => {
	if (props.imageUrl[6] > 0) {
		props.imageUrl[6]--;
	}
};
const nextImage = () => {
	if (props.imageUrl[6] < props.imageUrl[7] - 1) {
		props.imageUrl[6]++;
	}
};
</script>

<style scoped>
.modal {
	position: fixed;
	z-index: 20;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.9);
}

.modal-content {
	max-width: 90%;
	display: flex;
	flex-flow: column;
	align-items: center;
	justify-content: center;
	margin: 8% auto;
}
@media (max-width: 768px) {
	.modal-content {
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		margin: 0 auto;
	}
}

.modal-image {
	max-width: 70vw;
	max-height: 70vh;
}
@media (max-width: 768px) {
	.modal-image {
		max-width: 85vw;
		max-height: 85vh;
	}
}
.close {
	position: absolute;
	top: 20px;
	right: 40px;
	color: #aaaaaa;
	font-size: 52px;
	font-weight: bold;
	cursor: pointer;
}

@media (max-width: 768px) {
	.close {
		width: 40px;
		height: 40px;
	}
}

.close:hover,
.close:focus {
	color: #000;
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
	font-size: 20px;
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
