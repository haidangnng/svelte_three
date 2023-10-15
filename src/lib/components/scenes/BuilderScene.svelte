<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import Ground from '../objects/builder/Ground.svelte';
	import { Debug, World } from '@threlte/rapier';
</script>

<World>
	<Debug />
	<Ground />

	<T.DirectionalLight position={[0, 10, 10]} />

	<T.AxesHelper />

	<T.PerspectiveCamera
		makeDefault
		position={[10, 10, 20]}
		on:create={({ ref }) => {
			ref.lookAt(0, 1, 0);
		}}
	>
		<OrbitControls enableDamping />
	</T.PerspectiveCamera>
</World>
