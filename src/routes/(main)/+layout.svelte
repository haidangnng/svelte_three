<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import type { LayoutData } from './$types';
	export let data: LayoutData;

	$: userId = data?.user?.user_id || '';
</script>

<div class="flex flex-col w-screen h-screen">
	<div class="flex flex-col h-full">
		<Navbar bind:userId />
		<div class="flex-grow">
			<slot />
		</div>
	</div>
</div>
