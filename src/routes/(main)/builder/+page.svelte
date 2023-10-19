<script lang="ts">
	import { Canvas } from '@threlte/core';
	import BuilderScene from '$lib/components/scenes/BuilderScene.svelte';
	import BuilderController from '$lib/components/controller/BuilderController.svelte';
	import { Settings2, Video } from 'lucide-svelte';

	import settingControl from '$lib/stores/builder/layout';
	import CameraController from '$lib/components/controller/CameraController.svelte';

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
	<Canvas>
		<BuilderScene />
	</Canvas>

	<form class="space-y-2" method="POST" on:submit|preventDefault />

	<div class="flex absolute bottom-0 justify-between p-4 w-full">
		<div class="flex flex-col-reverse">
			<button type="button" class="btn btn-circle" on:click={() => toggleSetting('setting')}>
				<Settings2 />
			</button>

			<div class="relative">
				<BuilderController />
			</div>
		</div>

		<button type="button" class="px-4 w-40 btn btn-primary">Save</button>

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
