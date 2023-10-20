<script lang="ts">
	import { T } from '@threlte/core';
	import { AutoColliders } from '@threlte/rapier';
</script>

<T.Group position={[0, -0.5, 0]}>
	<AutoColliders shape={'cuboid'}>
		<T.Mesh receiveShadow>
			<T.BoxGeometry args={[40, 1, 40]} />
			<T.MeshStandardMaterial color="white" />
		</T.Mesh>
	</AutoColliders>
</T.Group>
