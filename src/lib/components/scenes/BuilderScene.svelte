<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import Ground from '../objects/builder/Ground.svelte';
	import { Debug, World } from '@threlte/rapier';
	import Box from '../objects/builder/Box.svelte';
</script>

<World>
	<Debug />
	<Box />
	<Ground />

	<T.DirectionalLight position={[0, 10, 10]} />
	<T.AmbientLight />

	<T.AxesHelper />

	<T.PerspectiveCamera
		makeDefault
		position={[0, 30, 45]}
		on:create={({ ref }) => {
			ref.lookAt(0, 1, 0);
		}}
		fov={50}
	>
		<OrbitControls
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
