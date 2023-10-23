import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase }, params }) => {
	const { id: postId } = params;

	const { data: postData, error: postErr } = await supabase
		.from('post')
		.select(
			`
        id,
        title,
        description,
        likes,
        users (*),
        box_settings (*, dimension (x, y, z)),
        ambient_settings (*),
        direction_settings (* ,position (x, y, z), target (x, y, z)),
        spotlight_settings (* ,position (x, y, z)),
        model_settings (*)
      `
		)
		.eq('id', postId)
		.single();

	if (postErr || !postData || postData.length <= 0) {
		throw error(404, {
			message: 'Post not found!'
		});
	}

	return {
		postData: postData
	};
};
