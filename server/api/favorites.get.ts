import supabase from '../supabaseClient.js';
import { serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const { page } = getQuery(event);

	const limit = 30;
	const rangeMax = +page! * limit - 1;
	const rangeMin = rangeMax - limit + 1;

	const cursor = supabase
		.from('favorites')
		.select('favoritePhotoURLs')
		.eq('userID', user.value.id)
		.single();

	const { data, error, count } = await cursor.range(rangeMin, rangeMax);

	if (error) {
		if (error.message === 'Requested range not satisfiable') {
			const { data, error, count } = await cursor.range(0, 30);

			return { data, count };
		}
	}

	return { data, count };
});
