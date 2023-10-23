import { decodeJwt } from 'jose';

import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies, locals: { supabase } }) => {
	const token = cookies.get('hanko');
	// const jwt = cookies.get('jwt');

	if (!token) {
		return;
	}

	const payload = decodeJwt(token ?? '');
	const userID = payload.sub;

	if (!userID) {
		throw redirect(303, '/');
	}

	const { data: userData } = await supabase.from('users').select().eq('user_id', userID);

	let user = userData?.[0];

	if (!userData || userData.length <= 0) {
		// const newUser = await createNewUser({ user_id: userID });
		const newUser = await supabase.from('users').insert({ user_id: userID });
		user = newUser;
	}
	// return userID;
	return { user, session: await supabase.auth.getSession() };
};
