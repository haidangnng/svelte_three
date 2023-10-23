/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
	const data = await request.formData();
	const payload: Record<string, any> = {};

	for (const key of data.keys()) {
		payload[key] = data.get(key);
	}

	const dimension: FormDataEntryValue | null = data.get('size');
	const dimensionArr = (dimension as string).split(',');

	const { data: sizeData, error } = await supabase
		.from('dimension')
		.insert({
			x: dimensionArr[0],
			y: dimensionArr[1],
			z: dimensionArr[2]
		})
		.select()
		.single();

	payload['size'] = sizeData.id;

	const { data: boxData, error: boxError } = await supabase
		.from('box_settings')
		.insert(payload)
		.select()
		.single();

	console.log({ boxData, boxError });
	return json({ id: boxData.id });
};
