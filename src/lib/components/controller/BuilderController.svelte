<script lang="ts">
	import BoxController from './BoxController.svelte';
	import LightingController from './LightingController.svelte';
	import ModelController from './ModelController.svelte';
	import { Box, Lightbulb, SunDim, User } from 'lucide-svelte';

	import settingControl from '$lib/stores/builder/layout';

	enum SETTING_OPTIONS {
		AMBIENT = 'ambient',
		DIRECTION = 'direction',
		MODEL = 'model',
		BOX = 'box'
	}

	let openedSetting: SETTING_OPTIONS | undefined;

	const toggleSetting = (name: SETTING_OPTIONS) =>
		!openedSetting ? (openedSetting = name) : (openedSetting = undefined);
</script>

<div class="flex absolute bottom-0 flex-col-reverse gap-2 mb-2 h-fit">
	<button
		class="flex justify-center items-center bg-base-200 btn-circle hover:bg-base-300"
		class:!delay-50={$settingControl.isSettingOpen}
		class:!delay-200={!$settingControl.isSettingOpen}
		class:slide-in-left={$settingControl.isSettingOpen}
		class:slide-out-left={!$settingControl.isSettingOpen}
		on:click|preventDefault={() => toggleSetting(SETTING_OPTIONS.MODEL)}
	>
		<User />
	</button>

	<button
		class="flex justify-center items-center bg-base-200 btn-circle hover:bg-base-300"
		class:!delay-100={$settingControl.isSettingOpen}
		class:!delay-150={!$settingControl.isSettingOpen}
		class:slide-in-left={$settingControl.isSettingOpen}
		class:slide-out-left={!$settingControl.isSettingOpen}
		on:click|preventDefault={() => toggleSetting(SETTING_OPTIONS.AMBIENT)}
	>
		<SunDim />
	</button>

	<button
		class="flex justify-center items-center bg-base-200 btn-circle hover:bg-base-300"
		class:!delay-150={$settingControl.isSettingOpen}
		class:!delay-100={!$settingControl.isSettingOpen}
		class:slide-in-left={$settingControl.isSettingOpen}
		class:slide-out-left={!$settingControl.isSettingOpen}
		on:click|preventDefault={() => toggleSetting(SETTING_OPTIONS.DIRECTION)}
	>
		<Lightbulb />
	</button>

	<button
		class="flex justify-center items-center bg-base-200 btn-circle hover:bg-base-300"
		class:!delay-200={$settingControl.isSettingOpen}
		class:!delay-50={!$settingControl.isSettingOpen}
		class:slide-in-left={$settingControl.isSettingOpen}
		class:slide-out-left={!$settingControl.isSettingOpen}
		on:click|preventDefault={() => toggleSetting(SETTING_OPTIONS.BOX)}
	>
		<Box />
	</button>
</div>

<!-- <div class="flex absolute left-0 left-20 flex-col-reverse h-fit"> -->
<!-- 	{#if $settingControl.isSettingOpen} -->
<!-- 		<div class="space-y-2 collapse-content"> -->
<!-- 			<div class="w-96 collapse collapse-arrow bg-base-200"> -->
<!-- 				<input type="checkbox" name="my-accordion-2" /> -->
<!-- 				<BoxController /> -->
<!-- 			</div> -->
<!---->
<!-- 			<div class="w-96 collapse collapse-arrow bg-base-200"> -->
<!-- 				<input type="checkbox" name="my-accordion-2" /> -->
<!-- 				<LightingController /> -->
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
