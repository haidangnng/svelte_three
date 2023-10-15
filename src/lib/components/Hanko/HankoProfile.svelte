<script>
	import { register } from '@teamhanko/hanko-elements';
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';

	const hankoApi = env.PUBLIC_HANKO_API_URL;

	onMount(async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		register(hankoApi).catch((error) => {
			// handle error
		});
	});
</script>

<hanko-profile />
