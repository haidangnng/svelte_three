<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';
	import PickerWrapper from '../PickerWrapper.svelte';
	import ambientLightControl from '$lib/stores/builder/ambientLightControl';
</script>

<div class="text-xl font-medium">Ambient light</div>

<div class="form-control">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="cursor-pointer label">
		<span class="label-text">Color</span>
		<ColorPicker
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
