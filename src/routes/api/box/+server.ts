/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
	const data = await request.formData();
	const payload: Record<string, any> = {};

	for (const key of data.keys()) {
		if (key === 'dimension' || key === 'id') continue;
		payload[key] = data.get(key);
	}

	const dimension: FormDataEntryValue | null = data.get('size');
	const dimensionArr = (dimension as string).split(',');

	const { data: sizeData } = await supabase
		.from('dimension')
		.insert({
			x: dimensionArr[0],
			y: dimensionArr[1],
			z: dimensionArr[2]
		})
		.select()
		.single();

	payload['size'] = sizeData.id;

	const { data: boxData } = await supabase.from('box_settings').insert(payload).select().single();

	return json({ id: boxData.id });
};
