<script lang="ts">
	import { boxSelect } from '$lib/stores/builder/type';
	import boxControl from '$lib/stores/builder/boxControl';
</script>

<div class="text-xl font-medium">Box</div>

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
