<script lang="ts">
	import AuthScence from '$lib/components/scenes/AuthScence.svelte';
	import { Canvas } from '@threlte/core';
	import { spring } from 'svelte/motion';
	let height: number;
	let width: number;
	let isAttract: boolean = true;

	let coords = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.1,
			damping: 0.5
		}
	);
	$: updateCoords = ({ x, y }: { x: number; y: number }) => {
		const { x: centerX, y: centerY } = {
			x: Math.floor(width / 2),
			y: Math.floor(height / 2)
		};

		const threeX = x > centerX ? x - centerX : -(centerX - x);
		const threeY = y > centerY ? -(y - centerY) : centerY - y;

		coords.set({
			x: threeX / 50,
			y: threeY / 50
		});
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:mousemove={(e) => {
		updateCoords({
			x: e.clientX,
			y: e.clientY
		});
	}}
	on:mousedown={() => (isAttract = false)}
	on:mouseup={() => (isAttract = true)}
	class="relative w-screen h-screen"
>
	<Canvas>
		<AuthScence attractorCoords={{ x: $coords.x, y: $coords.y }} {isAttract} />
	</Canvas>

	<div class="flex absolute top-0 right-0 bottom-0 left-0 justify-center items-center p-10">
		<div class="flex justify-center items-center bg-opacity-25 glass-container bg-info-content">
			<slot />
		</div>
	</div>
</div>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<style>
	.glass-container {
		border-radius: 16px;
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		border: 1px solid rgba(255, 255, 255, 0.3);
	}
</style>
