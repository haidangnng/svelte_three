<script lang="ts">
	import { T, useRender } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import Ground from '../objects/builder/Ground.svelte';
	import { Debug, World } from '@threlte/rapier';
	import Box from '../objects/builder/Box.svelte';

	import ambientLightControl from '$lib/stores/builder/ambientLightControl';
	import directionLightControl from '$lib/stores/builder/directionalLightControl';
	import spotLightControl from '$lib/stores/builder/spotLightControl';
	import modelControl from '$lib/stores/builder/modelControl';
	import Model from '../objects/builder/Model.svelte';
	import { Object3D } from 'three';
	import { onMount } from 'svelte';
	import snapshot from '$lib/stores/builder/snapshot';
	import { sceneCamera, sceneControl } from '$lib/stores/builder/sceneCamera';

	useRender(({ camera, renderer, scene }) => {
		renderer.render(scene, camera.current);
		snapshot.set(renderer);
	});

	$: ({ position, id, ...rest } = $spotLightControl);
	$: [x, y, z] = position;
	let target: Object3D | undefined;
	let directionalTarget: Object3D | undefined;

	$: (() => {
		directionalTarget = new Object3D();

		directionalTarget.position.set(
			$directionLightControl.target[0],
			$directionLightControl.target[1],
			$directionLightControl.target[2]
		);
		directionalTarget.updateMatrixWorld();
	})();

	onMount(() => {
		target = new Object3D();
		target.position.set(0, 0, 0);
		target.updateMatrixWorld();
		return () => {
			target = undefined;
		};
	});
</script>

<World>
	<Debug />
	<Box />
	{#if $modelControl.url}
		<Model url={$modelControl.url} />
	{/if}
	<Ground />

	<T.SpotLight bind:target position={[-1 * x, y, -1 * z]} {...rest} />
	<T.SpotLight bind:target position={[x, y, -1 * z]} {...rest} />
	<T.SpotLight bind:target position={[x, y, z]} {...rest} />
	<T.SpotLight bind:target position={[-1 * x, y, z]} {...rest} />

	<T.DirectionalLight
		position={$directionLightControl.position}
		intensity={$directionLightControl.intensity}
		color={$directionLightControl.color}
		target={directionalTarget}
	/>

	<T.AmbientLight color={$ambientLightControl.color} intensity={$ambientLightControl.intensity} />

	<!-- <T.AxesHelper /> -->

	<T.PerspectiveCamera
		makeDefault
		position={[0, 30, 45]}
		on:create={({ ref }) => {
			ref.lookAt(0, 1, 0);
			sceneCamera.set(ref);
		}}
		fov={50}
	>
		<OrbitControls
			on:create={({ ref }) => {
				sceneControl.set(ref);
			}}
			minPolarAngle={0}
			maxPolarAngle={Math.PI / 2}
			enableZoom={true}
			maxDistance={80}
			enableDamping={true}
			enablePan={false}
		/>
		<!-- <OrbitControls enableDamping /> -->
	</T.PerspectiveCamera>
</World>
