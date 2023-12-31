<script lang="ts">
	import { Canvas } from '@threlte/core';
	import BuilderScene from '$lib/components/scenes/BuilderScene.svelte';
	import BuilderController from '$lib/components/controller/BuilderController.svelte';
	import { Settings2, Video } from 'lucide-svelte';
	import { resetBoxControl } from '$lib/stores/builder/boxControl';
	import { resetModelControl } from '$lib/stores/builder/modelControl';
	import { resetAmbientLightControl } from '$lib/stores/builder/ambientLightControl';
	import { resetDirectionLightControl } from '$lib/stores/builder/directionalLightControl';
	import { resetSpotlightControl } from '$lib/stores/builder/spotLightControl';

	import settingControl from '$lib/stores/builder/layout';

	import File from '$lib/components/modals/File.svelte';
	import SavePost from '$lib/components/modals/SavePost.svelte';
	import type { LayoutData } from '../$types';
	import CameraController from '$lib/components/controller/CameraController.svelte';
	import { onMount } from 'svelte';
	import postControl from '$lib/stores/posts';

	export let data: LayoutData;

	onMount(() => {
		if (!data.isEditable) {
			postControl.set({
				title: '',
				description: ''
			});
			resetModelControl();
			resetBoxControl();
			resetAmbientLightControl();
			resetDirectionLightControl();
			resetAmbientLightControl();
			resetSpotlightControl();
		}
	});

	$: userId = data?.user?.user_id || '';
	$: userProfileReady = data?.user?.isCreated || '';
	let inputModalOpen: boolean = false;
	let saveModalOpen: boolean = false;

	$: toggleSetting = (name: string) => {
		if (name === 'setting') {
			settingControl.update((val) => ({
				...val,
				isSettingOpen: !val.isSettingOpen
			}));
		} else {
			settingControl.update((val) => ({
				...val,
				isCameraOpen: !val.isCameraOpen
			}));
		}
	};
</script>

<div class="overflow-hidden relative w-full h-full">
	<Canvas
		rendererParameters={{
			preserveDrawingBuffer: true
		}}
	>
		<BuilderScene />
	</Canvas>

	<div class="flex absolute bottom-0 justify-between p-4 w-full">
		<div class="flex flex-col-reverse">
			<button type="button" class="btn btn-circle" on:click={() => toggleSetting('setting')}>
				<Settings2 />
			</button>

			<div class="relative">
				<BuilderController />
			</div>
		</div>

		<div>
			{#if userId}
				{#if userProfileReady}
					<button
						type="button"
						on:click={() => (saveModalOpen = true)}
						class="px-4 w-40 btn btn-primary">Save</button
					>
				{:else}
					<div class="tooltip" data-tip="You need to setup your account first">
						<button
							type="button"
							disabled
							on:click={() => (saveModalOpen = true)}
							class="px-4 w-40 btn btn-primary">Save</button
						>
					</div>
				{/if}
			{/if}
			<button
				type="button"
				on:click={() => (inputModalOpen = true)}
				class="px-4 w-40 btn btn-secondary">Upload model</button
			>
		</div>

		<div class="flex flex-col-reverse">
			<button type="button" class="btn btn-circle" on:click={() => toggleSetting('camera')}>
				<Video />
			</button>

			<div class="relative">
				<CameraController />
			</div>
		</div>
	</div>
</div>

<File bind:open={inputModalOpen} />
<SavePost
	supabase={data.supabase}
	bind:userId
	bind:open={saveModalOpen}
	isEditable={data?.isEditable}
/>
