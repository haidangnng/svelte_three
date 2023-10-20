<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';
	import { boxSelect } from '$lib/stores/builder/type';
	import boxControl from '$lib/stores/builder/boxControl';
	import PickerWrapper from '../PickerWrapper.svelte';
	import { X } from 'lucide-svelte';

	export let handleClose: () => void;
</script>

<div class="flex justify-between items-center w-full text-xl font-medium">
	<h3>Box</h3>
	<button class="p-1 btn btn-ghost btn-circle" on:click={handleClose}><X /></button>
</div>

<div class="form-control">
	<label class="cursor-pointer label">
		<span class="label-text">Box type</span>
		<select bind:value={$boxControl.boxType} class="w-full max-w-xs select select-bordered">
			{#each boxSelect as { value, label }}
				<option {value}>{label}</option>
			{/each}
		</select>
	</label>
</div>

<div class="form-control">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="cursor-pointer label">
		<span class="label-text">Color</span>
		<ColorPicker
			isAlpha={false}
			bind:hex={$boxControl.color}
			components={{ wrapper: PickerWrapper }}
			label=""
		/>
	</label>
</div>
<!-- <div class="form-control"> -->
<!-- 	<label class="cursor-pointer label"> -->
<!-- 		<span class="label-text">Use Texture</span> -->
<!-- 		<input bind:checked={$boxControl.useTexture} type="checkbox" class="toggle toggle-success" /> -->
<!-- 	</label> -->
<!-- </div> -->
<div class="form-control">
	<label class="space-x-2 cursor-pointer label !items-start">
		<span class="label-text">Size</span>
		<div class="flex flex-col gap-2 w-full">
			<div class="flex gap-2 items-center">
				<span class="w-fit shrink-0">Height</span>
				<input
					type="range"
					min="10"
					max="30"
					bind:value={$boxControl.size.height}
					class="range"
					step={0.01}
				/>
			</div>
			<div class="flex gap-2 items-center">
				<span class="w-fit shrink-0">Width</span>
				<input
					type="range"
					min="10"
					max="30"
					bind:value={$boxControl.size.width}
					class="range"
					step={0.01}
				/>
			</div>
			<div class="flex gap-2 items-center">
				<span class="w-fit shrink-0">Depth</span>
				<input
					type="range"
					min="10"
					max="30"
					bind:value={$boxControl.size.depth}
					class="range"
					step={0.01}
				/>
			</div>
		</div>
	</label>
</div>

<div class="form-control">
	<label class="cursor-pointer label">
		<span class="label-text">Transparent</span>
		<input
			bind:checked={$boxControl.useTransparent}
			type="checkbox"
			class="toggle toggle-success"
		/>
	</label>
</div>

{#if $boxControl.useTransparent}
	<div class="form-control">
		<label class="space-x-2 cursor-pointer label">
			<span class="label-text">Roughness</span>
			<input
				bind:value={$boxControl.roughness}
				type="range"
				min="0"
				max="1"
				class="range"
				step={0.01}
			/>
		</label>
	</div>

	<div class="form-control">
		<label class="space-x-2 cursor-pointer label">
			<span class="label-text">Metalness</span>
			<input
				bind:value={$boxControl.metalness}
				type="range"
				min="0"
				max="1"
				class="range"
				step={0.01}
			/>
		</label>
	</div>
	<div class="form-control">
		<label class="space-x-2 cursor-pointer label">
			<span class="label-text">Transmission</span>
			<input
				bind:value={$boxControl.transmission}
				type="range"
				min="0"
				max="1"
				class="range"
				step={0.01}
			/>
		</label>
	</div>
{/if}
