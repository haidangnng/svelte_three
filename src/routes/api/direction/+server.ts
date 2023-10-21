/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
	const data = await request.formData();
	const color = data.get('color');
	const intensity = data.get('intensity');
	const target = data.get('target');
	const position = data.get('position');

	const targetArr = (target as string).split(',');
	const posArr = (position as string).split(',');

	const { data: targetData } = await supabase
		.from('dimension')
		.insert({
			x: targetArr[0],
			y: targetArr[1],
			z: targetArr[2]
		})
		.select();

	const { data: positionData } = await supabase
		.from('dimension')
		.insert({
			x: posArr[0],
			y: posArr[1],
			z: posArr[2]
		})
		.select();

	const { data: directionLight } = await supabase
		.from('direction_settings')
		.insert({
			color,
			intensity,
			target: targetData[0].id,
			position: positionData[0].id
		})
		.select();

	return json({ id: directionLight[0].id });
};
