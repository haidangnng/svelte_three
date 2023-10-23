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
        box_settings (*),
        ambient_settings (*),
        direction_settings (*),
        spotlight_settings (*),
        model_settings (*)
      `
		)
		.eq('id', postId);

	console.log('data', {
		postData: postData,
		postErr
	});

	if (postErr || !postData || postData.length <= 0) {
		throw error(404, {
			message: 'Post not found!'
		});
	}

	return {
		postData: postData[0]
	};
};
