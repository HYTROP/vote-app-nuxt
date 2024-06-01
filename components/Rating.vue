<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const points = ref(0);

const props = defineProps({
	cardURL: String,
});
const { cardURL } = toRefs(props);

const loadCardPoints = async (cardURL) => {
	try {
		const { data, error } = await supabase
			.from('UserPoints')
			.select('points')
			.eq('cardURL', cardURL)
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

// Обновляем данные о баллах при изменении cardURL
watch(
	cardURL,
	async (newValue) => {
		await loadCardPoints(newValue);
	},
	{ immediate: true },
);

const setCardPoints = async (cardURL, pointsValue) => {
	try {
		// Проверяем, существует ли запись для этого cardURL
		const { data: existingPoints, error } = await supabase
			.from('UserPoints')
			.select('*')
			.eq('cardURL', cardURL.value)
			.eq('userID', user.value.id);

		if (error) {
			throw error;
		}

		if (existingPoints.length > 0) {
			// Если запись уже существует, обновляем количество баллов
			await supabase
				.from('UserPoints')
				.update({ points: pointsValue })
				.eq('cardURL', cardURL.value)
				.eq('userID', user.value.id);
		} else {
			// Если записи нет, создаем новую
			await supabase
				.from('UserPoints')
				.insert([
					{ cardURL: cardURL, userID: user.value.id, points: pointsValue },
				]);
		}
		points.value = pointsValue;
	} catch (error) {
		console.error('Error setting card points:', error.message);
	}
};

const setPoints = (pointsValue) => {
	setCardPoints(cardURL.value, pointsValue + 1);
};
</script>

<template>
	<div class="flex">
		<div class="items-center">
			<label for="rating" class="block text-sm font-medium text-white"
				>Ваша оценка:</label
			>
			<div
				v-for="i in 10"
				:key="i"
				@click="setPoints(i - 1)"
				class="inline-block ml-1.5 rounded-full hover:scale-125 hover:transition-all hover:duration-300 w-6 h-6 border-2 border-indigo-400 text-center text-sm text-orange-100 cursor-pointer"
				:class="{ 'bg-indigo-400 scale-125': points == i }"
			>
				{{ i }}
			</div>
		</div>
	</div>
</template>
