<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const rating = ref(0);

const updateRating = async (newValue) => {
	try {
		const { data, error } = await supabase
			.from('ratings')
			.update({ rating: newValue })
			.eq('userId', user.value.id);
	} catch (error) {
		console.error('Error updating rating:', error.message);
	}
};

onMounted(() => {});
</script>

<template>
	<div class="flex m-1">
		<div class="flex items-center">
			<button
				type="submit"
				@click="rating = Math.max(0, rating - 1)"
				class="px-4 py-1 bg-neutral-600 rounded-lg cursor-pointer"
			>
				-
			</button>
			<span class="mx-4">{{ rating }}</span>
			<button
				type="submit"
				@click="rating = Math.min(10, rating + 1)"
				class="px-4 py-1 bg-neutral-600 rounded-lg cursor-pointer"
			>
				+
			</button>
		</div>
	</div>
</template>
