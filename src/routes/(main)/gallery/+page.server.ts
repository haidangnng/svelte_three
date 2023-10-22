import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data, error } = await supabase.from('post').select();

	if (error) {
		redirect(300, '/');
	}

	return {
		post: data
	};
};
