<script lang="ts">
	import modelControl from '$lib/stores/builder/modelControl';
	import { X } from 'lucide-svelte';

	export let handleClose: () => void;
</script>

<div class="flex justify-between items-center w-full text-xl font-medium">
	<h3>Model</h3>
	<button class="p-1 btn btn-ghost btn-circle" on:click={handleClose}><X /></button>
</div>

<div class="form-control">
	<label class="cursor-pointer label">
		<span class="label-text">Scale</span>

		<input
			type="number"
			class="flex-shrink w-16 input"
			step="0.1"
			bind:value={$modelControl.scale}
		/>
	</label>
</div>

<div class="form-control">
	<label class="cursor-pointer label">
		<span class="label-text">Rotate</span>
		<input bind:checked={$modelControl.isRotating} type="checkbox" class="toggle toggle-success" />
	</label>
</div>

{#if $modelControl.isRotating}
	<div class="form-control">
		<label class="cursor-pointer label">
			<span class="label-text">Rotation speed</span>
			<div class="flex gap-1">
				<input
					type="number"
					step="0.01"
					class="flex-shrink w-16 input"
					bind:value={$modelControl.rotationSpeed}
				/>
			</div>
		</label>
	</div>
{/if}
