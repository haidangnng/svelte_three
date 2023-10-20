<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';
	import PickerWrapper from '../PickerWrapper.svelte';
	import ambientLightControl from '$lib/stores/builder/ambientLightControl';
	import { X } from 'lucide-svelte';

	export let handleClose: () => void;
</script>

<div class="flex justify-between items-center w-full text-xl font-medium">
	<h3>Ambient Light</h3>
	<button class="p-1 btn btn-ghost btn-circle" on:click={handleClose}><X /></button>
</div>

<div class="form-control">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="cursor-pointer label">
		<span class="label-text">Color</span>
		<ColorPicker
			isAlpha={false}
			bind:hex={$ambientLightControl.color}
			components={{ wrapper: PickerWrapper }}
			label=""
		/>
	</label>
</div>

<div class="form-control">
	<label class="space-x-2 cursor-pointer label">
		<span class="label-text">Intensity</span>
		<input
			type="range"
			min="0"
			max="5"
			bind:value={$ambientLightControl.intensity}
			class="range"
			step={0.01}
		/>
	</label>
</div>
