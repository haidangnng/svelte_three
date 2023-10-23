<script lang="ts">
	import { Canvas } from '@threlte/core';
	import type { PageServerData } from '../$types';
	import BuilderScene from '$lib/components/scenes/BuilderScene.svelte';

	export let data: PageServerData;
	$: console.log('data', data.postData);
</script>

<div class="flex flex-col gap-4 justify-start items-center w-full">
	<div class="w-3/5 max-h-full rounded-3xl border aspect-square border-accent">
		<Canvas>
			<BuilderScene />
		</Canvas>
	</div>
</div>
