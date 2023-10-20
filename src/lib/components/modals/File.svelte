<script lang="ts">
	export let open: boolean = false;

	let files: FileList;
	let fileInput: HTMLInputElement;

	const handleUpload = async () => {
		const formData = new FormData();
		formData.append('image', files[0]);

		const req = await fetch('/api/image-upload', {
			method: 'post',
			body: formData
		});

		const res = await req.json();

		console.log(res);
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
				accept=".png,.jpg"
				bind:files
				bind:this={fileInput}
			/>
		</form>

		<div class="modal-action">
			<button class="btn btn-ghost" on:click={() => (open = false)}>Cancel</button>
			<button class="btn btn-primary" type="submit" form="upload_file">Upload</button>
		</div>
	</div>
</div>
