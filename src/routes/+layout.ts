// src/routes/+layout.js
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import { env } from '$env/dynamic/public';
import type { LayoutLoad } from './$types';

const supabaseUrl = env.PUBLIC_SUPABASE_URL;
const supabaseKey = env.PUBLIC_SUPABASE_API_KEY;

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient({
		supabaseUrl: supabaseUrl,
		supabaseKey: supabaseKey,
		event: { fetch },
		serverSession: data?.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { supabase, session, user: data?.user };
};
