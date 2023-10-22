/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
	const formData = await request.formData();
	const model = formData.get('model');
	const name = formData.get('name');

	await supabase.storage.from('models').upload(name, model, {
		contentType: 'model/gltf-binary '
	});

	const { data } = await supabase.storage.from('models').getPublicUrl(name);

	return json({ url: data.publicUrl });
};
