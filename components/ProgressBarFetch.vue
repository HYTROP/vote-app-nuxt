<template><div v-if="props.show" class="progress-bar"></div></template>
<script setup>
const props = defineProps({ show: Boolean });
</script>
<style>
.progress-bar {
	z-index: 10000;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 3px;
	background-color: #e9ff7c;
	animation: loading 1.5s infinite;
}
@keyframes loading {
	0% {
		transform: translateX(-100%);
	}
	50% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(100%);
	}
}
</style>
