<script lang="ts">
	import { T } from '@threlte/core';
	import boxControl from '$lib/stores/builder/boxControl';

	$: ({ metalness, roughness, transmission, useTransparent } = $boxControl);

	$: boxProps = useTransparent
		? {
				metalness,
				roughness,
				transmission
		  }
		: {};
</script>

<T.Group position={[0, 5, 0]} receiveShadow castShadow>
	<T.Mesh receiveShadow castShadow position={[10, 5, 0]}>
		<T.BoxGeometry args={[0.1, 20, 20]} />
		<T.MeshPhysicalMaterial {...boxProps} />
	</T.Mesh>
	<T.Mesh receiveShadow castShadow position={[-10, 5, 0]}>
		<T.BoxGeometry args={[0.1, 20, 20]} />
		<T.MeshPhysicalMaterial {...boxProps} />
	</T.Mesh>
	<T.Mesh receiveShadow castShadow position={[0, 5, -10]} rotation.y={Math.PI / 2}>
		<T.BoxGeometry args={[0.1, 20, 20]} />
		<T.MeshPhysicalMaterial {...boxProps} />
	</T.Mesh>
	<T.Mesh receiveShadow castShadow position={[0, 15, 0]} rotation.z={Math.PI / 2}>
		<T.BoxGeometry args={[0.1, 20, 20]} />
		<T.MeshPhysicalMaterial {...boxProps} />
	</T.Mesh>
	<T.Mesh receiveShadow castShadow position={[0, -5, 0]} rotation.z={Math.PI / 2}>
		<T.BoxGeometry args={[0.1, 20, 20]} />
		<T.MeshPhysicalMaterial {...boxProps} />
	</T.Mesh>
</T.Group>
