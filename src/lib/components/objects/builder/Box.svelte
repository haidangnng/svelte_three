<script lang="ts">
	import { T, useFrame, useLoader } from '@threlte/core';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

	const gltf = useLoader(GLTFLoader).load('/car.glb');

	import { builderForm, type BoxControlType, type ModelControlType } from '$lib/stores/builder';

	let boxControl: BoxControlType;
	let modelControl: ModelControlType;

	builderForm.subscribe((value) => {
		boxControl = value.boxControl;
		modelControl = value.modelControl;
	});

	$: ({ metalness, roughness, transmission, useTransparent } = boxControl);
	$: ({ scale, rotationSpeed, isRotating } = modelControl);

	$: boxProps = useTransparent
		? {
				metalness,
				roughness,
				transmission
		  }
		: {};

	let rotation: number = 0;
	useFrame(() => {
		if (isRotating) {
			rotation += rotationSpeed;
		}
	});
</script>

<T.Mesh receiveShadow position={[0, 5, 0]}>
	<T.BoxGeometry args={[10, 10, 10]} />
	<T.MeshPhysicalMaterial transparent={useTransparent} {...boxProps} />
</T.Mesh>

{#if $gltf}
	<T
		is={$gltf.scene}
		transparent={false}
		rotation.y={rotation}
		position={[0, 0, 0]}
		scale={[scale, scale, scale]}
	/>
{/if}
