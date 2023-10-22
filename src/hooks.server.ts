/* eslint-disable @typescript-eslint/no-explicit-any */
import { type RequestEvent, redirect, type Handle } from '@sveltejs/kit';

import { jwtVerify, createRemoteJWKSet, SignJWT } from 'jose';
import { env } from '$env/dynamic/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';

const hankoApiUrl = env.PUBLIC_HANKO_API_URL;
const supabaseJwt = env.PUBLIC_SUPABASE_JWT;
const supabaseUrl = env.PUBLIC_SUPABASE_URL;
const supabaseKey = env.PUBLIC_SUPABASE_API_KEY;

const authenticatedUser = async (event: RequestEvent) => {
	const { cookies } = event;
	const hanko = cookies.get('hanko');
	const JWKS = createRemoteJWKSet(new URL(`${hankoApiUrl}/.well-known/jwks.json`));

	try {
		const {
			payload: { sub }
		}: Record<string, any> = await jwtVerify(hanko ?? '', JWKS);

		const secret = new TextEncoder().encode(supabaseJwt);
		const alg = 'HS256';

		const jwt = await new SignJWT({ user_id: sub })
			.setProtectedHeader({ alg })
			.setExpirationTime('2h')
			.sign(secret);

		// const token = jsonwebtoken.sign({ user_id: sub }, supabaseKey); //JWT_SECRET is from the supabase dashboard
		return jwt;
	} catch {
		return undefined;
	}
};

export const handle: Handle = async ({ event, resolve }) => {
	const supabase = createSupabaseServerClient({
		supabaseUrl: supabaseUrl,
		supabaseKey: supabaseKey,
		event
	});

	const token = await authenticatedUser(event);

	if (event.url.pathname.startsWith('/profile') && !token) {
		throw redirect(303, '/auth');
	}

	supabase.functions.setAuth(token || '');
	supabase.realtime.setAuth(token || '');
	event.locals.supabase = supabase;
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	const response = await resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});

	if (token) {
		(supabase as any).rest.headers.Authorization = `Bearer ${token}`;
		response.headers.set('Set-Cookie', token);
	}

	return response;
};
