<script lang="ts">
	import BoxController from './BoxController.svelte';
	import LightingController from './LightingController.svelte';
	import ModelController from './ModelController.svelte';
</script>

<div class="absolute top-0 left-0 h-fit">
	<form method="POST" on:submit|preventDefault>
		<!-- DISPLAY BOX -->
		<div class="w-96 collapse collapse-arrow bg-base-200">
			<input type="radio" name="my-accordion-2" />
			<BoxController />
		</div>

		<!-- LIGHTING -->
		<div class="w-96 collapse collapse-arrow bg-base-200">
			<input type="radio" name="my-accordion-2" />
			<LightingController />
		</div>

		<!-- MODEL -->
		<div class="w-96 collapse collapse-arrow bg-base-200">
			<input type="radio" name="my-accordion-2" />
			<ModelController />
		</div>
	</form>
</div>
