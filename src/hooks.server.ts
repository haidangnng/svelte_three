import { type RequestEvent, redirect, type Handle } from '@sveltejs/kit';

import { jwtVerify, createRemoteJWKSet } from 'jose';
import { env } from '$env/dynamic/public';

const hankoApiUrl = env.PUBLIC_HANKO_API_URL;

const authenticatedUser = async (event: RequestEvent) => {
	const { cookies } = event;
	const hanko = cookies.get('hanko');
	console.log('hanko', hanko);
	const JWKS = createRemoteJWKSet(new URL(`${hankoApiUrl}/.well-known/jwks.json`));

	try {
		const data: unknown = await jwtVerify(hanko ?? '', JWKS);

		console.log('data', data);
		return true;
	} catch {
		return false;
	}
};

export const handle: Handle = async ({ event, resolve }) => {
	const verified = await authenticatedUser(event);

	if (event.url.pathname.startsWith('/profile') && !verified) {
		throw redirect(303, '/auth');
	}

	const response = await resolve(event);
	return response;
};
