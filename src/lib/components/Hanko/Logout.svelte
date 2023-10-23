<script>
	import { Hanko } from '@teamhanko/hanko-elements';
	import { goto, invalidateAll } from '$app/navigation';
	import { env } from '$env/dynamic/public';
	const hankoApi = env.PUBLIC_HANKO_API_URL;

	const hanko = new Hanko(hankoApi);
	const logout = async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		hanko.user.logout().catch((error) => {
			// handle error
		});

		await invalidateAll();
		goto('/');
	};
</script>

<button class="w-full btn btn-warning" on:click={logout}>Logout</button>
