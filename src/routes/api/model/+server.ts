import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
	const data = await request.formData();
	const scale = data.get('scale');
	const isRotating = data.get('isRotating');
	const rotationSpeed = data.get('rotationSpeed');
	const url = data.get('url');

	const { data: modelData } = await supabase
		.from('model_settings')
		.insert({
			scale,
			isRotating,
			rotationSpeed,
			url
		})
		.select()
		.single();

	return json({ id: modelData.id });
};
