<script lang="ts">
	import { T } from '@threlte/core';
	import { Debug, World, Attractor } from '@threlte/rapier';
	import Sphere from '../objects/Sphere.svelte';
	export let attractorCoords: { x: number; y: number };
	export let isAttract: boolean = true;
</script>

<World>
	<Debug />

	<Sphere />
	<Attractor
		range={8}
		strength={isAttract ? 8 : -2}
		position={[attractorCoords.x, attractorCoords.y, 0]}
	/>

	<T.DirectionalLight position={[0, 10, 10]} />

	<T.AxesHelper />
</World>

<T.PerspectiveCamera
	makeDefault
	position={[0, 0, 20]}
	on:create={({ ref }) => {
		ref.lookAt(0, 1, 0);
	}}
/>
