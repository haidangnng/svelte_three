<script lang="ts">
	export let open: boolean = false;
	import boxControl from '$lib/stores/builder/boxControl';
	import ambientLightControl from '$lib/stores/builder/ambientLightControl';
	import directionalLightControl from '$lib/stores/builder/directionalLightControl';
	import spotLightControl from '$lib/stores/builder/spotLightControl';
	import modelControl from '$lib/stores/builder/modelControl';

	$: onSubmit = async () => {
		console.log($boxControl);
		console.log($directionalLightControl);
		console.log($ambientLightControl);
		console.log($spotLightControl);
		console.log($modelControl);
	};
</script>

<div class="modal" class:modal-open={open}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Upload model</h3>
		<p class="py-4">Upload your model (.glb, .gltf)</p>

		<form id="save_post" on:submit|preventDefault={onSubmit}>
			<div class="form-control">
				<label class="cursor-pointer label">
					<span class="label-text">Title</span>
					<input
						type="text"
						name="title"
						placeholder="Title"
						class="w-full max-w-xs input input-sm input-bordered"
					/>
				</label>
			</div>

			<div class="form-control">
				<label class="cursor-pointer label">
					<span class="label-text">Description</span>
					<textarea
						name="description"
						placeholder="Description"
						class="w-full max-w-xs textarea textarea-bordered textarea-md"
					/>
				</label>
			</div>
		</form>

		<div class="modal-action">
			<button class="btn btn-ghost" on:click={() => (open = false)}>Cancel</button>
			<button class="btn btn-primary" type="submit" form="save_post">Save</button>
		</div>
	</div>
</div>
