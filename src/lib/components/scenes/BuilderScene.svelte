<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import Ground from '../objects/builder/Ground.svelte';
	import { Debug, World } from '@threlte/rapier';
	import Box from '../objects/builder/Box.svelte';

	import { builderForm, type BuilderForm } from '$lib/stores/builder';

	let builderControl: BuilderForm;

	builderForm.subscribe((value) => {
		builderControl = value;
	});
</script>

<World>
	<Debug />
	{#if builderControl.boxControl.useBox}
		<Box />
	{/if}
	<Ground />

	<T.DirectionalLight position={[0, 10, 10]} />
	<T.AmbientLight />

	<T.AxesHelper />

	<T.PerspectiveCamera
		makeDefault
		position={[10, 15, 20]}
		on:create={({ ref }) => {
			ref.lookAt(0, 1, 0);
		}}
		fov={50}
	>
		<!-- <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} enableZoom={false} /> -->
		<OrbitControls enableDamping />
	</T.PerspectiveCamera>
</World>
