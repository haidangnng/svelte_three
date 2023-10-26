<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import userStore from '$lib/stores/user';
	import type { UserType } from '$lib/types/user';
	import type { ActionResult } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { generateUUID } from 'three/src/math/MathUtils.js';

	export let isEditing: boolean = false;
	export let userInfo: UserType;

	let files: FileList;
	let fileInput: HTMLInputElement;
	let loading: boolean = false;

	onMount(() => {
		if (userInfo) userStore.set(userInfo);
	});

	export let form;

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		loading = true;
		const action = event.currentTarget.action;
		const data = new FormData(event.currentTarget);

		if (files && fileInput && files.length > 0) {
			const url = await handleUpload();
			data.append('avatar', url);
		}

		data.append('user_id', userInfo.user_id);

		const response = await fetch(action, {
			method: 'POST',
			body: data
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			// rerun all `load` functions, following the successful update
			await invalidateAll();
			isEditing = false;
		}

		applyAction(result);
	}

	const handleUpload = async () => {
		const formData = new FormData();
		formData.append('avatar', files[0]);
		formData.append('name', `${generateUUID()}_${files[0].name}`);
		// formData.append('name', generateUUID());

		const req = await fetch('/api/upload/avatar', {
			method: 'post',
			body: formData
		});

		const { url } = await req.json();
		return url;
	};
</script>

<h3 class="mb-4 text-2xl font-bold">Edit Profile</h3>

<form id="edit_profile" on:submit|preventDefault={handleSubmit}>
	<div class="form-control">
		<label class="space-x-2 cursor-pointer label">
			<span class="label-text">Name</span>
			<input
				class="w-full max-w-xs input input-sm input-bordered"
				name="name"
				bind:value={$userStore.name}
			/>
		</label>
		{#if form?.missing}<p class="text text-error">The name field is required</p>{/if}
	</div>
	<div class="form-control">
		<label class="space-x-2 cursor-pointer label">
			<span class="label-text">Bio</span>
			<textarea
				name="bio"
				class="w-full max-w-xs textarea textarea-bordered textarea-md"
				bind:value={$userStore.bio}
			/>
		</label>
	</div>

	<div class="form-control">
		<label class="space-x-2 cursor-pointer label">
			<span class="label-text">avatar</span>
			<input
				class="w-full max-w-xs file-input file-input-bordered"
				id="file-to-upload"
				type="file"
				accept=".png, .jpg, .jpeg"
				bind:files
				bind:this={fileInput}
			/>
		</label>
	</div>
</form>

<div class="modal-action">
	<button
		type="button"
		class="btn btn-ghost"
		on:click={() => (isEditing = false)}
		disabled={loading}>Cancel</button
	>
	<button class="btn btn-primary" type="submit" disabled={loading} form="edit_profile">
		{#if loading}
			<span class="loading loading-spinner" />
		{/if}
		Save Profile</button
	>
</div>
