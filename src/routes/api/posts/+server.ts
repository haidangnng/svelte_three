import { json } from '@sveltejs/kit';
import db from '$lib/database';

export async function GET() {
	const posts = await db.post.findMany();
	return json(posts);
}
