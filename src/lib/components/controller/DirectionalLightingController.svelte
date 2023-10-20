<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';
	import PickerWrapper from '../PickerWrapper.svelte';
	import directionLightControl from '$lib/stores/builder/directionalLightControl';
	import { X } from 'lucide-svelte';

	export let handleClose: () => void;
</script>

<div class="flex justify-between items-center w-full text-xl font-medium">
	<h3>Directional Light</h3>
	<button class="p-1 btn btn-ghost btn-circle" on:click={handleClose}><X /></button>
</div>

<div class="form-control">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="cursor-pointer label">
		<span class="label-text">Color</span>
		<ColorPicker
			isAlpha={false}
			bind:hex={$directionLightControl.color}
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
			bind:value={$directionLightControl.intensity}
			class="range"
			step={0.01}
		/>
	</label>
</div>

<div class="form-control">
	<label class="space-x-2 cursor-pointer label !items-start">
		<span class="label-text">Position</span>
		<div class="flex flex-col gap-2 w-full">
			<div class="flex gap-2 items-center">
				<span class="w-fit shrink-0">x</span>
				<input
					type="range"
					min="-40"
					max="40"
					bind:value={$directionLightControl.position[0]}
					class="range"
					step={0.01}
				/>
			</div>
			<div class="flex gap-2 items-center">
				<span class="w-fit shrink-0">y</span>
				<input
					type="range"
					min="-40"
					max="40"
					bind:value={$directionLightControl.position[1]}
					class="range"
					step={0.01}
				/>
			</div>
			<div class="flex gap-2 items-center">
				<span class="w-fit shrink-0">z</span>
				<input
					type="range"
					min="-40"
					max="40"
					bind:value={$directionLightControl.position[2]}
					class="range"
					step={0.01}
				/>
			</div>
		</div>
	</label>
</div>

<div class="form-control">
	<label class="space-x-2 cursor-pointer label !items-start">
		<span class="label-text">Target</span>
		<div class="flex flex-col gap-2 w-full">
			<div class="flex gap-2 items-center">
				<span class="w-fit shrink-0">x</span>
				<input
					type="range"
					min="-10"
					max="10"
					bind:value={$directionLightControl.target[0]}
					class="range"
					step={0.01}
				/>
			</div>
			<div class="flex gap-2 items-center">
				<span class="w-fit shrink-0">y</span>
				<input
					type="range"
					min="0"
					max="20"
					bind:value={$directionLightControl.target[1]}
					class="range"
					step={0.01}
				/>
			</div>
			<div class="flex gap-2 items-center">
				<span class="w-fit shrink-0">z</span>
				<input
					type="range"
					min="-10"
					max="10"
					bind:value={$directionLightControl.target[2]}
					class="range"
					step={0.01}
				/>
			</div>
		</div>
	</label>
</div>
