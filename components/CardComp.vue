<script setup>
const props = defineProps({
	record: Object,
	onClickFavorite: Function,
	isFavorite: Boolean,
});

const { openModal } = inject('modalActions');
</script>

<template>
	<div
		class="overflow-hidden border p-2 border-neutral-300 rounded-lg shadow-md flex flex-col justify-between max-h-[283px] sm:max-h-[253px]"
	>
		<div
			@click="openModal(record.photo, index)"
			class="sm:max-h-[223px] sm:max-w-[317px] mb-8 cursor-pointer md:hover:scale-125 transition duration-500 overflow-clip"
		>
			<Skeleton v-if="!record.photo" />
			<NuxtImg
				:src="record.photo"
				sizes="xs:90vw sm:100vw md:100vw lg:50vw xl:33vw 2xl:25vw"
				quality="10"
				preload
				loading="lazy"
				alt="photo"
				class="justify-items-stretch"
			/>
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
			<div>
				<LikeBtn
					@click="onClickFavorite(record)"
					:isFavorite="record.isFavorite"
					class="m-4 relative right-0 w-6 h-6 cursor-pointer hover:scale-125 transition duration-500 ease-in-out"
				/>
			</div>
		</div>
	</div>
</template>
