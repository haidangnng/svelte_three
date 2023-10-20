<script lang="ts">
	import boxControl from '$lib/stores/builder/boxControl';
	import { T } from '@threlte/core';

	$: ({
		size: { height, width, depth },
		color,
		metalness,
		roughness,
		transmission,
		useTransparent
	} = $boxControl);

	$: boxProps = useTransparent
		? {
				metalness,
				roughness,
				transmission
		  }
		: {};
</script>

<T.Mesh receiveShadow castShadow position={[0, height / 2, 0]}>
	<T.BoxGeometry args={[width, height, depth]} />
	<T.MeshPhysicalMaterial bind:color {...boxProps} />
</T.Mesh>
