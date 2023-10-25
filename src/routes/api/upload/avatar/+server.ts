/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
	const formData = await request.formData();
	const avatar = formData.get('avatar');
	const name = formData.get('name');

	await supabase.storage.from('avatar').upload(name, avatar);

	const { data } = await supabase.storage.from('avatar').getPublicUrl(name);

	return json({ url: data.publicUrl });
};
