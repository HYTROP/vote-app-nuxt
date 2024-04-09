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
			.eq('userID', user.value.id);

		if (error) {
			throw error;
		}

		if (data && data.length > 0) {
			// Если есть данные, берем первый объект и присваиваем соответствующее значение points
			points.value = data[0].points;
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

const setPoints = (pointsValue) => {
	setCardPoints(props.cardID, pointsValue + 1);
};
</script>

<template>
	<div class="flex m-1">
		<div class="items-center">
			<label for="rating" class="block text-sm font-medium text-white"
				>Ваша оценка:</label
			>
			<div
				v-for="i in 10"
				:key="i"
				@click="setPoints(i - 1)"
				class="inline-block m-1 rounded-full w-6 h-6 border-2 border-indigo-400 text-center text-sm text-orange-100 cursor-pointer"
				:class="{ 'bg-indigo-400': points == i }"
			>
				{{ i }}
			</div>
		</div>
	</div>
</template>
