<!-- <script lang="ts"> -->
<!-- 	import { T, useFrame, useLoader } from '@threlte/core'; -->
<!-- 	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; -->
<!---->
<!-- 	const gltf = useLoader(GLTFLoader).load('/car.glb'); -->
<!---->
<!-- 	import { builderForm, type ModelControlType } from '$lib/stores/builder'; -->
<!---->
<!-- 	let modelControl: ModelControlType; -->
<!---->
<!-- 	builderForm.subscribe((value) => { -->
<!-- 		modelControl = value.modelControl; -->
<!-- 	}); -->
<!---->
<!-- 	$: ({ scale, rotationSpeed, isRotating } = modelControl); -->
<!---->
<!-- 	let rotation: number = 0; -->
<!-- 	useFrame(() => { -->
<!-- 		if (isRotating) { -->
<!-- 			rotation += rotationSpeed; -->
<!-- 		} -->
<!-- 	}); -->
<!-- </script> -->

<!-- {#if $gltf} -->
<!-- 	<T -->
<!-- 		is={$gltf.scene} -->
<!-- 		transparent={false} -->
<!-- 		rotation.y={rotation} -->
<!-- 		position={[0, 0, 0]} -->
<!-- 		scale={[scale, scale, scale]} -->
<!-- 	/> -->
<!-- {/if} -->
