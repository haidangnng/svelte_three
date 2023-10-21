<script lang="ts">
	import { T } from '@threlte/core';
	import boxControl from '$lib/stores/builder/boxControl';

	$: ({
		color,
		metalness,
		roughness,
		transmission,
		useTransparent,
		size: [height, width, depth]
	} = $boxControl);

	$: boxProps = useTransparent
		? {
				metalness,
				roughness,
				transmission
		  }
		: {};
</script>

<T.Group position={[width / 2, height / 2, 0]} receiveShadow castShadow>
	<!-- RIGHT -->
	<T.Mesh receiveShadow castShadow position={[0, 0, 0]}>
		<T.BoxGeometry args={[0.1, height, depth]} />
		<T.MeshPhysicalMaterial bind:color {...boxProps} />
	</T.Mesh>

	<!-- LEFT -->
	<T.Mesh receiveShadow castShadow position={[-width, 0, 0]}>
		<T.BoxGeometry args={[0.1, height, depth]} />
		<T.MeshPhysicalMaterial bind:color {...boxProps} />
	</T.Mesh>

	<!-- BEHIND -->
	<T.Mesh receiveShadow castShadow position={[-width / 2, 0, -depth / 2]} rotation.y={Math.PI / 2}>
		<T.BoxGeometry args={[0.1, height, width]} />
		<T.MeshPhysicalMaterial bind:color {...boxProps} />
	</T.Mesh>

	<!-- TOP -->
	<T.Mesh receiveShadow castShadow position={[-width / 2, height / 2, 0]} rotation.z={Math.PI / 2}>
		<T.BoxGeometry args={[0.1, width, depth]} />
		<T.MeshPhysicalMaterial color="blue" {...boxProps} />
		<T.MeshPhysicalMaterial bind:color {...boxProps} />
	</T.Mesh>

	<!-- BOTTOM -->
	<T.Mesh receiveShadow castShadow position={[-width / 2, -height / 2, 0]} rotation.z={Math.PI / 2}>
		<T.BoxGeometry args={[0.1, width, depth]} />
		<T.MeshPhysicalMaterial bind:color {...boxProps} />
	</T.Mesh>
</T.Group>
