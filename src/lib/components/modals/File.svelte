<script lang="ts">
	import modelControl from '$lib/stores/builder/modelControl';
	import type { ModelControlType } from '$lib/stores/builder/type';

	export let open: boolean = false;

	let files: FileList;
	let fileInput: HTMLInputElement;
	let loading: boolean = false;

	const handleUpload = async () => {
		loading = true;
		const formData = new FormData();
		formData.append('model', files[0]);
		formData.append('name', files[0].name);

		const req = await fetch('/api/upload/model', {
			method: 'post',
			body: formData
		});

		const { url } = await req.json();

		loading = false;
		modelControl.update((val) => ({
			...val,
			url: url as string
		}));
	};
</script>

<div class="modal" class:modal-open={open}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Upload model</h3>
		<p class="py-4">Upload your model (.glb, .gltf)</p>

		<form id="upload_file" on:submit|preventDefault={handleUpload}>
			<input
				class="w-full max-w-xs file-input file-input-bordered"
				id="file-to-upload"
				type="file"
				accept=".glb, .gltf"
				bind:files
				bind:this={fileInput}
			/>
		</form>

		<div class="modal-action">
			<button type="button" class="btn btn-ghost" on:click={() => (open = false)} disabled={loading}
				>Cancel</button
			>
			<button class="btn btn-primary" type="submit" disabled={loading} form="upload_file">
				{#if loading}
					<span class="loading loading-spinner" />
				{/if}
				Upload</button
			>
		</div>
	</div>
</div>
