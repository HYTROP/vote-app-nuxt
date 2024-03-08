<script setup>
defineProps({
	index: Number,
	photo: String,
	fio: String,
	nomination: String,
});
const openModal = inject('openModal');
</script>

<template>
	<div
		class="overflow-hidden border p-2 border-neutral-300 rounded-lg shadow-md flex flex-col justify-between max-h-[283px] sm:max-h-[253px]">
		<div
			@click="openModal(photo, index)"
			class="sm:max-h-[223px] sm:max-w-[317px] mb-8 cursor-pointer md:hover:scale-110 transition duration-500 overflow-hidden">
			<NuxtImg
				:src="photo"
				loading="lazy"
				quality="30"
				alt="photo"
				class="justify-items-stretch" />
		</div>
		<div class="flex justify-between">
			<div>
				<p class="text-sm text-neutral-700 max-w-[160px]">
					{{ fio }}
				</p>
				<p class="text-sm text-neutral-500/90 max-w-[136px] truncate">
					{{ nomination }}
				</p>
			</div>
			<LikeBtn
				class="m-2 relative right-0 z-20 w-6 h-6 cursor-pointer hover:scale-125 transition duration-500 ease-in-out" />
		</div>
	</div>
</template>
