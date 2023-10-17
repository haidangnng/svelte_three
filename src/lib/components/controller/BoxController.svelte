<script lang="ts">
	import { builderForm } from '$lib/stores/builder';
</script>

<div class="text-xl font-medium collapse-title">Display Box</div>

<div class="collapse-content">
	<div class="form-control">
		<label class="cursor-pointer label">
			<span class="label-text">Use display box</span>
			<input
				name="useBox"
				bind:checked={$builderForm.boxControl.useBox}
				type="checkbox"
				class="toggle toggle-success"
			/>
		</label>
	</div>

	{#if $builderForm.boxControl.useBox}
		<div class="form-control">
			<label class="cursor-pointer label">
				<span class="label-text">Transparent</span>
				<input
					bind:checked={$builderForm.boxControl.useTransparent}
					type="checkbox"
					class="toggle toggle-success"
				/>
			</label>
		</div>
	{/if}

	{#if $builderForm.boxControl.useBox && $builderForm.boxControl.useTransparent}
		<div class="form-control">
			<label class="space-x-2 cursor-pointer label">
				<span class="label-text">Roughness</span>
				<input
					bind:value={$builderForm.boxControl.roughness}
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
					bind:value={$builderForm.boxControl.metalness}
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
					bind:value={$builderForm.boxControl.transmission}
					type="range"
					min="0"
					max="1"
					class="range"
					step={0.01}
				/>
			</label>
		</div>
	{/if}
</div>
