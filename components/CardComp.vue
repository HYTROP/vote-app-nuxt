<script setup>
import Skeleton from './Skeleton.vue';

defineProps({
	index: Number,
	record: Object,
});

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const { favoritesURLs } = inject('dataProvider');

const { openModal } = inject('modalActions');

const onClickFavorite = async (item) => {
	const updatedURLs = item.isFavorite
		? favoritesURLs.value.filter((url) => url !== item.photo)
		: [...favoritesURLs.value, item.photo];

	const { data, error } = await supabase
		.from('favorites')
		.update({ favoritePhotoURLs: updatedURLs })
		.eq('userID', user.value.id)
		.select('*')
		.single();

	if (error) {
		throw error;
	}
	item.isFavorite = data.favoritePhotoURLs.includes(item.photo);
	favoritesURLs.value = updatedURLs;
};
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
				v-if="record.photo"
				:src="record.photo"
				sizes="xs:100vw sm:100vw md:50vw lg:33vw xl:25vw 2xl:20vw"
				quality="10"
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
					@click="onClickFavorite"
					:isFavorite="record.isFavorite"
					class="m-2 relative right-0 w-6 h-6 cursor-pointer hover:scale-125 transition duration-500 ease-in-out"
				/>
			</div>
		</div>
	</div>
</template>
