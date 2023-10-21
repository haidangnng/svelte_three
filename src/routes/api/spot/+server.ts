import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
	const data = await request.formData();
	const color = data.get('color');
	const power = data.get('power');
	const intensity = data.get('intensity');
	const position = data.get('position');

	const distance = data.get('distance');
	const angle = data.get('angle');
	const decay = data.get('decay');
	const penumbra = data.get('penumbra');

	const posArr = (position as string).split(',');

	const { data: positionData } = await supabase
		.from('dimension')
		.insert({
			x: posArr[0],
			y: posArr[1],
			z: posArr[2]
		})
		.select();

	const { data: spotlight } = await supabase
		.from('spotlight_settings')
		.insert({
			color,
			intensity,
			power,
			distance,
			angle,
			penumbra,
			decay,
			position: positionData[0].id
		})
		.select();

	return json({ id: spotlight[0].id });
};
