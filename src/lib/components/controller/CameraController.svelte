<script lang="ts">
	import { Camera } from 'lucide-svelte';
	import settingControl from '$lib/stores/builder/layout';
	import { saveAsImage } from '$lib/utils/snapshot';

	import snapshot from '$lib/stores/builder/snapshot';
	// import { sceneCamera, sceneControl } from '$lib/stores/builder/sceneCamera';
	import type { WebGLRenderer } from 'three';
	// import type { OrbitControls } from '@threlte/extras';

	let renderer: WebGLRenderer;
	// let camera: PerspectiveCamera;
	// let control: OrbitControls;

	snapshot.subscribe((val) => {
		renderer = val;
	});

	const screenshot = () => saveAsImage(renderer);

	// sceneCamera.subscribe((val) => {
	// 	camera = val;
	// });
	//
	// sceneControl.subscribe((val) => {
	// 	control = val;
	// });

	// const centerCamera = () => {
	// 	camera.lookAt(0, 5, 0);
	// 	control.update();
	// };
</script>

<div class="flex absolute bottom-0 flex-col-reverse gap-2 mb-2 h-fit">
	<!-- <button -->
	<!-- 	on:click={centerCamera} -->
	<!-- 	class="flex justify-center items-center bg-base-200 btn-circle hover:bg-base-300" -->
	<!-- 	class:!delay-50={$settingControl.isCameraOpen} -->
	<!-- 	class:!delay-100={!$settingControl.isCameraOpen} -->
	<!-- 	class:slide-in-right={$settingControl.isCameraOpen} -->
	<!-- 	class:slide-out-right={!$settingControl.isCameraOpen} -->
	<!-- > -->
	<!-- 	<AlignVerticalSpaceAround /> -->
	<!-- </button> -->

	<button
		on:click={screenshot}
		class="flex justify-center items-center bg-base-200 btn-circle hover:bg-base-300"
		class:!delay-100={$settingControl.isCameraOpen}
		class:!delay-50={!$settingControl.isCameraOpen}
		class:slide-in-right={$settingControl.isCameraOpen}
		class:slide-out-right={!$settingControl.isCameraOpen}
	>
		<Camera />
	</button>
</div>

<style>
	.slide-in-right {
		-webkit-animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
		animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
	}

	.slide-out-right {
		-webkit-animation: slide-out-right 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
		animation: slide-out-right 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
	}
	@-webkit-keyframes slide-in-right {
		0% {
			-webkit-transform: translateX(1000px);
			transform: translateX(1000px);
			opacity: 0;
		}
		100% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			opacity: 1;
		}
	}

	@keyframes slide-in-right {
		0% {
			-webkit-transform: translateX(1000px);
			transform: translateX(1000px);
			opacity: 0;
		}
		100% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			opacity: 1;
		}
	}

	@-webkit-keyframes slide-out-right {
		0% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			opacity: 1;
		}
		100% {
			-webkit-transform: translateX(1000px);
			transform: translateX(1000px);
			opacity: 0;
		}
	}
	@keyframes slide-out-right {
		0% {
			-webkit-transform: translateX(0);
			transform: translateX(0);
			opacity: 1;
		}
		100% {
			-webkit-transform: translateX(1000px);
			transform: translateX(1000px);
			opacity: 0;
		}
	}
</style>
