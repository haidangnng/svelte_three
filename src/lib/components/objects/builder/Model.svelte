<script lang="ts">
	import { T, useFrame, useLoader } from '@threlte/core';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import modelControl from '$lib/stores/builder/modelControl';

	export let url: string;
	$: console.log('url', url);

	$: gltf = useLoader(GLTFLoader).load(url);

	let rotation: number = 0;
	useFrame(() => {
		if ($modelControl.isRotating) {
			rotation += $modelControl.rotationSpeed;
		}
	});
</script>

{#if $gltf}
	<T
		castShadow
		receiveShadow
		is={$gltf.scene}
		transparent={false}
		rotation.y={rotation}
		position={[0, 0, 0]}
		scale={[$modelControl.scale, $modelControl.scale, $modelControl.scale]}
	/>
{/if}
