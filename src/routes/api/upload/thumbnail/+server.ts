/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, type RequestHandler } from '@sveltejs/kit';
import { decode } from 'base64-arraybuffer';

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
	const form = await request.formData();

	const imgData: FormDataEntryValue | null = String(form.get('imgData'));
	const title: FormDataEntryValue | null = form.get('title');

	const base64 = imgData.split('base64,')[1];
	supabase.storage.from('thumbnail').upload(title, decode(base64), {
		contentType: 'image/png'
	});

	const { data } = await supabase.storage.from('thumbnail').getPublicUrl(title);

	return json({ url: data.publicUrl });
};
