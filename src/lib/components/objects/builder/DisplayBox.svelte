<script lang="ts">
	import boxControl from '$lib/stores/builder/boxControl';
	import { T } from '@threlte/core';

	$: ({ metalness, roughness, transmission, useTransparent } = $boxControl);

	$: boxProps = useTransparent
		? {
				metalness,
				roughness,
				transmission
		  }
		: {};
</script>

<T.Mesh receiveShadow castShadow position={[0, 10, 0]}>
	<T.BoxGeometry args={[20, 20, 20]} />
	<T.MeshPhysicalMaterial {...boxProps} />
</T.Mesh>
