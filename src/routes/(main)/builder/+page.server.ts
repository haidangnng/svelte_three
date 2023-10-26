import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const actions: Actions = {
	create_post: async ({ request, locals: { supabase } }) => {
		const data = await request.formData();
		const id = data.get('id');
		const title = data.get('title');
		const description = data.get('description');
		const owner = data.get('owner');
		const box_setting = data.get('box_setting');
		const direction_setting = data.get('direction_setting');
		const model_setting = data.get('model_setting');
		const spotlight_setting = data.get('spotlight_setting');
		const ambient_setting = data.get('ambient_setting');
		const thumbnail = data.get('thumbnail');

		if (id !== null) {
			const { data: postData } = await supabase
				.from('post')
				.update({
					title,
					description,
					owner,
					box_setting,
					direction_setting,
					spotlight_setting,
					model_setting,
					ambient_setting,
					thumbnail
				})
				.eq('id', id)
				.select();

			return { post: postData[0] };
		} else {
			const { data: postData } = await supabase
				.from('post')
				.insert({
					title,
					description,
					owner,
					box_setting,
					direction_setting,
					spotlight_setting,
					model_setting,
					ambient_setting,
					thumbnail
				})
				.select();

			return { post: postData[0] };
		}
	}
};

export const load: PageServerLoad = ({ url }) => {
	const isEditable = url.searchParams.get('isEdit');
	return { isEditable };
};
