import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
	const data = await request.formData();
	const color = data.get('color');
	const intensity = data.get('intensity');

	const { data: ambientData } = await supabase
		.from('ambient_settings')
		.insert({
			color,
			intensity
		})
		.select();

	return json({ id: ambientData[0].id });
};
