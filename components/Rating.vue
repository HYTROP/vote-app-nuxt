<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const points = ref(0);

const props = defineProps({
	cardID: String,
});

onMounted(() => {
	loadCardPoints(props.cardID);
});

const loadCardPoints = async (cardID) => {
	try {
		const { data, error } = await supabase
			.from('UserPoints')
			.select('points')
			.eq('cardID', cardID)
			.eq('userID', user.value.id)
			.single();

		if (error) {
			throw error;
		}

		console.log('data', data);

		if (data) {
			points.value = data.points;
		} else {
			points.value = 0;
		}
	} catch (error) {
		console.error('Error loading card points:', error.message);
	}
};

// Обновляем данные о баллах при изменении cardID
watch(
	() => props.cardID,
	async (newVal, oldVal) => {
		if (newVal !== oldVal) {
			await loadCardPoints(newVal);
		}
	},
);

const setCardPoints = async (cardID, pointsValue) => {
	try {
		// Проверяем, существует ли запись для этого cardID
		const { data: existingPoints, error } = await supabase
			.from('UserPoints')
			.select('*')
			.eq('cardID', cardID)
			.eq('userID', user.value.id);
		console.log('existingPoints', existingPoints);

		if (existingPoints.length > 0) {
			// Если запись уже существует, обновляем количество баллов
			await supabase
				.from('UserPoints')
				.update({ points: pointsValue })
				.eq('cardID', cardID)
				.eq('userID', user.value.id);
		} else {
			// Если записи нет, создаем новую
			await supabase
				.from('UserPoints')
				.insert([
					{ cardID: cardID, userID: user.value.id, points: pointsValue },
				]);
		}
		points.value = pointsValue;
	} catch (error) {
		console.error('Error setting card points:', error.message);
	}
};

const decreasePoints = () => {
	if (points.value > 0) {
		console.log('points -', points.value);
		setCardPoints(props.cardID, +points.value - 1);
	}
};

const increasePoints = () => {
	if (points.value < 10) {
		console.log('points +', points.value);
		setCardPoints(props.cardID, +points.value + 1);
	}
};
</script>

<template>
	<div class="flex m-1">
		<div class="flex items-center">
			<button
				@click="decreasePoints"
				class="px-4 py-1 bg-neutral-600 rounded-lg cursor-pointer"
			>
				-
			</button>
			<span class="mx-4">{{ points }}</span>
			<button
				@click="increasePoints"
				class="px-4 py-1 bg-neutral-600 rounded-lg cursor-pointer"
			>
				+
			</button>
			<!-- <button class="px-4 py-1 bg-neutral-600 rounded-lg cursor-pointer">
				OK
			</button> -->
		</div>
	</div>
</template>
