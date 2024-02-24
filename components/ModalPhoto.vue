<template>
	<div v-if="show" class="modal">
		<span class="close" @click="closeModal">×</span>
		<div class="modal-content">
			<img :src="imageUrl" class="modal-image" />

			<div class="sm:ml-0 mt-4 md:lg:ml-[5%]">
				<p class="text-white text-md mb-4">
					{{ props.info[0] }}
				</p>
				<p class="text-white text-sm">
					{{ props.info[3] }}
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
});
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
	max-width: 70%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 7% auto;
}
@media (max-width: 768px) {
	.modal-content {
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
		/* width: 100vw; */
		height: 100vh;
		margin: 0 auto;
	}
}

.modal-image {
	max-width: 70vw;
	max-height: 80vh;
	all: calc();
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

.modal-content:before,
.modal-content:after {
	content: '';
	display: block;
	position: absolute;
	top: 50%;
	width: 30px;
	height: 30px;
	background: #929292;
	transform: translateY(-50%);
	cursor: pointer;
}

@media (max-width: 768px) {
	.modal-content:before,
	.modal-content:after {
		display: none;
	}
}

/* Стили для стрелки влево */
.modal-content:before {
	width: 40px;
	height: 40px;
	left: 40px;
	clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
	color: #000;
}

/* Стили для стрелки вправо */
.modal-content:after {
	width: 40px;
	height: 40px;
	right: 40px;
	clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
}
</style>
