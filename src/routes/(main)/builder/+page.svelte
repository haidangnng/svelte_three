<script lang="ts">
	import { Canvas } from '@threlte/core';
	import BuilderScene from '$lib/components/scenes/BuilderScene.svelte';
	import BuilderController from '$lib/components/controller/BuilderController.svelte';
</script>

<div class="relative w-full h-full">
	<Canvas>
		<BuilderScene />
	</Canvas>

	<BuilderController />
</div>
