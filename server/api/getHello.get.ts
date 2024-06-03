import supabase from '../supabaseClient.js';
import { serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);

	const { page, nomination, points, age } = getQuery(event);

	const limit = 30;
	const rangeMax = +page! * limit - 1;
	const rangeMin = rangeMax - limit + 1;

	const cursor = supabase.from('myCollection').select('*', { count: 'exact' });

	if (nomination !== 'Все') {
		cursor.eq('nomination', nomination);
	}

	if (age !== 'Все') {
		cursor.eq('age', age);
	}

	if (points !== 'Все') {
		const { data, error } = await supabase
			.from('UserPoints')
			.select<'*', any>('*')
			.eq('userID', user!.id);
		if (error) throw error;
		if (points == 'С оценкой') {
			cursor.filter(
				'photo',
				'in',
				`(${data.map((e) => `"${e.cardURL}"`).join(',')})`,
			);
		}
		if (points == 'Без оценки') {
			cursor.filter(
				'photo',
				'not.in',
				`(${data.map((e) => `"${e.cardURL}"`).join(',')})`,
			);
		}
	}

	const { data, error, count } = await cursor.range(rangeMin, rangeMax);

	if (error) {
		if (error.message === 'Requested range not satisfiable') {
			const { data, error, count } = await cursor.range(0, 30);
			return { data, count };
		}
		console.error('Error fetching data:', error.message);
		throw error;
	}

	return { data, count };
});
