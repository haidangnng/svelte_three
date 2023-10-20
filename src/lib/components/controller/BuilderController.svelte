<script lang="ts">
	import BoxController from './BoxController.svelte';
	import AmbientLightingController from './AmbientLightingController.svelte';
	import DirectionalLightingController from './DirectionalLightingController.svelte';
	import ModelController from './ModelController.svelte';
	import { Box, LampDesk, Lightbulb, SunDim, User } from 'lucide-svelte';

	import settingControl from '$lib/stores/builder/layout';
	import SpotLightController from './SpotLightController.svelte';

	enum SETTING_OPTIONS {
		AMBIENT = 'ambient',
		DIRECTION = 'direction',
		MODEL = 'model',
		BOX = 'box',
		SPOT = 'spot'
	}

	let openedSetting: SETTING_OPTIONS | undefined;

	$: openedSetting = $settingControl.isSettingOpen ? openedSetting : undefined;

	$: boxSettingOpen = openedSetting === SETTING_OPTIONS.BOX;
	$: directionalSettingOpen = openedSetting === SETTING_OPTIONS.DIRECTION;
	$: ambientSettingOpen = openedSetting === SETTING_OPTIONS.AMBIENT;
	$: modelSettingOpen = openedSetting === SETTING_OPTIONS.MODEL;
	$: spotLightSettingOpen = openedSetting === SETTING_OPTIONS.SPOT;

	const handleClose = () => (openedSetting = undefined);
	const toggleSetting = (name: SETTING_OPTIONS) =>
		!openedSetting || openedSetting !== name ? (openedSetting = name) : (openedSetting = undefined);
</script>

<div class="flex absolute bottom-0 flex-col-reverse gap-2 mb-2 h-fit">
	<div
		class:!delay-50={$settingControl.isSettingOpen}
		class:!delay-200={!$settingControl.isSettingOpen}
		class:slide-in-left={$settingControl.isSettingOpen}
		class:slide-out-left={!$settingControl.isSettingOpen}
		class="flex gap-2 items-center w-fit group"
	>
		<button
			class="flex flex-shrink-0 justify-center items-center bg-base-200 btn-circle hover:bg-base-300"
			on:click|preventDefault={() => toggleSetting(SETTING_OPTIONS.MODEL)}
		>
			<User />
		</button>
		<p class="hidden text-white whitespace-nowrap group-hover:block">Model settings</p>
	</div>

	<div
		class:!delay-100={$settingControl.isSettingOpen}
		class:!delay-150={!$settingControl.isSettingOpen}
		class:slide-in-left={$settingControl.isSettingOpen}
		class:slide-out-left={!$settingControl.isSettingOpen}
		class="flex gap-2 items-center w-fit group"
	>
		<button
			class="flex flex-shrink-0 justify-center items-center bg-base-200 btn-circle hover:bg-base-300"
			on:click|preventDefault={() => toggleSetting(SETTING_OPTIONS.AMBIENT)}
		>
			<SunDim />
		</button>
		<p class="hidden text-white whitespace-nowrap group-hover:block">Ambient light settings</p>
	</div>

	<div
		class:!delay-150={$settingControl.isSettingOpen}
		class:!delay-100={!$settingControl.isSettingOpen}
		class:slide-in-left={$settingControl.isSettingOpen}
		class:slide-out-left={!$settingControl.isSettingOpen}
		class="flex gap-2 items-center w-fit group"
	>
		<button
			class="flex flex-shrink-0 justify-center items-center bg-base-200 btn-circle hover:bg-base-300"
			on:click|preventDefault={() => toggleSetting(SETTING_OPTIONS.SPOT)}
		>
			<LampDesk />
		</button>
		<p class="hidden text-white whitespace-nowrap group-hover:block">Spot light settings</p>
	</div>

	<div
		class:!delay-150={$settingControl.isSettingOpen}
		class:!delay-100={!$settingControl.isSettingOpen}
		class:slide-in-left={$settingControl.isSettingOpen}
		class:slide-out-left={!$settingControl.isSettingOpen}
		class="flex gap-2 items-center w-fit group"
	>
		<button
			class="flex flex-shrink-0 justify-center items-center bg-base-200 btn-circle hover:bg-base-300"
			on:click|preventDefault={() => toggleSetting(SETTING_OPTIONS.DIRECTION)}
		>
			<Lightbulb />
		</button>
		<p class="hidden text-white whitespace-nowrap group-hover:block">Directional light settings</p>
	</div>

	<div
		class:!delay-200={$settingControl.isSettingOpen}
		class:!delay-50={!$settingControl.isSettingOpen}
		class:slide-in-left={$settingControl.isSettingOpen}
		class:slide-out-left={!$settingControl.isSettingOpen}
		class="flex gap-2 items-center w-fit group"
	>
		<button
			class="flex flex-shrink-0 justify-center items-center bg-base-200 btn-circle hover:bg-base-300"
			on:click|preventDefault={() => toggleSetting(SETTING_OPTIONS.BOX)}
		>
			<Box />
		</button>
		<p class="hidden text-white whitespace-nowrap group-hover:block">Model settings</p>
	</div>

	{#if boxSettingOpen}
		<div class="absolute left-14 p-4 rounded-xl bg-base-300 w-[500px]">
			<BoxController {handleClose} />
		</div>
	{/if}

	{#if spotLightSettingOpen}
		<div class="absolute left-14 p-4 rounded-xl bg-base-300 w-[500px]">
			<SpotLightController {handleClose} />
		</div>
	{/if}

	{#if ambientSettingOpen}
		<div class="absolute left-14 p-4 rounded-xl bg-base-300 w-[500px]">
			<AmbientLightingController {handleClose} />
		</div>
	{/if}

	{#if directionalSettingOpen}
		<div class="absolute left-14 p-4 rounded-xl bg-base-300 w-[500px]">
			<DirectionalLightingController {handleClose} />
		</div>
	{/if}

	{#if modelSettingOpen}
		<div class="absolute left-14 p-4 rounded-xl bg-base-300 w-[500px]">
			<ModelController {handleClose} />
		</div>
	{/if}
</div>

<!-- <div class="flex absolute left-0 left-20 flex-col-reverse h-fit"> -->
<!-- 	{#if $settingControl.isSettingOpen} -->
<!-- 		<div class="space-y-2 collapse-content"> -->
<!-- 			<div class="w-96 collapse collapse-arrow bg-base-200"> -->
<!-- 				<input type="checkbox" name="my-accordion-2" /> -->
<!-- 			</div> -->
<!---->
<!-- 			<div class="w-96 collapse collapse-arrow bg-base-200"> -->
<!-- 				<input type="checkbox" name="my-accordion-2" /> -->
<!-- 				<AmbientLightingController /> -->
<!-- 			</div> -->
<!---->
<!-- 			<div class="w-96 collapse collapse-arrow bg-base-200"> -->
<!-- 				<input type="checkbox" name="my-accordion-2" /> -->
<!-- 				<ModelController /> -->
<!-- 			</div> -->
<!-- 		</div> -->
<!-- 	{/if} -->
<!-- </div> -->

<style>
	.slide-in-left {
		-webkit-animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
		animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
	}
	.slide-out-left {
		-webkit-animation: slide-out-left 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
		animation: slide-out-left 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
	}

	@-webkit-keyframes slide-in-left {
		0% {
			-webkit-transform: translateX(-1000px);
			transform: translateX(-1000px);
			opacity: 0;
		}
		100% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			opacity: 1;
		}
	}
	@keyframes slide-in-left {
		0% {
			-webkit-transform: translateX(-1000px);
			transform: translateX(-1000px);
			opacity: 0;
		}
		100% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			opacity: 1;
		}
	}
	@-webkit-keyframes slide-out-left {
		0% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			opacity: 1;
		}
		100% {
			-webkit-transform: translateX(-1000px);
			transform: translateX(-1000px);
			opacity: 0;
		}
	}
	@keyframes slide-out-left {
		0% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			opacity: 1;
		}
		100% {
			-webkit-transform: translateX(-1000px);
			transform: translateX(-1000px);
			opacity: 0;
		}
	}
</style>
