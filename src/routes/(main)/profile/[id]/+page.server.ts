import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const data = await request.formData();
		const name = data.get('name');
		const bio = data.get('bio');
		const avatar = data.get('avatar');
		const user_id = data.get('user_id');

		const { error } = await supabase
			.from('users')
			.update({
				name,
				bio,
				...(avatar && { avatar }),
				isCreated: true
			})
			.eq('user_id', user_id)
			.select();

		if (!name) {
			return fail(400, {
				name,
				missing: true
			});
		}

		if (error) {
			return fail(400, { error });
		}

		return { success: true };
	}
};
