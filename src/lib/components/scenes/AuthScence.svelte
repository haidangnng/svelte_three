<script lang="ts">
	import { T } from '@threlte/core';
	import { World, Attractor } from '@threlte/rapier';
	import Sphere from '../objects/Sphere.svelte';
	export let attractorCoords: { x: number; y: number };
	export let isAttract: boolean = true;
</script>

<World>
	<Sphere />
	<Attractor
		range={8}
		strength={isAttract ? 10 : -50}
		position={[attractorCoords.x, attractorCoords.y, 0]}
	/>

	<T.DirectionalLight position={[10, 10, 10]} />
	<T.AmbientLight intensity={1} />
</World>

<T.PerspectiveCamera
	makeDefault
	position={[0, 0, 20]}
	on:create={({ ref }) => {
		ref.lookAt(0, 1, 0);
	}}
/>
