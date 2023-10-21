import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	create_post: async ({ request, locals: { supabase } }) => {
		const data = await request.formData();
		const title = data.get('title');
		const description = data.get('description');
		const owner = data.get('owner');
		const box_setting = data.get('box_setting');
		const direction_setting = data.get('direction_setting');
		const model_setting = data.get('model_setting');
		const spotlight_setting = data.get('spotlight_setting');
		const ambient_setting = data.get('ambient_setting');

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
				ambient_setting
			})
			.select();

		return { post: postData[0] };
	}

	// create_ambient: async ({ request }) => {
	// 	const data = await request.formData();
	// },
	//
	// create_spot: async ({ request }) => {
	// 	const data = await request.formData();
	// },
	//
	// create_direction: async ({ request }) => {
	// 	const data = await request.formData();
	// },
	//
	// create_box: async ({ request }) => {
	// 	const data = await request.formData();
	// },
	//
	// create_box: async ({ request }) => {
	// 	const data = await request.formData();
	// }
};