import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals: { supabase } }) => {
	// const { data } = await supabase.from('test').select('*');
	// return json({ data });
};
