<script lang="ts">
	import { AlignVerticalSpaceAround, Camera } from 'lucide-svelte';
	import settingControl from '$lib/stores/builder/layout';

	import snapshot from '$lib/stores/builder/snapshot';
	import { sceneCamera, sceneControl } from '$lib/stores/builder/sceneCamera';
	import type { PerspectiveCamera, WebGLRenderer } from 'three';
	import type { OrbitControls } from '@threlte/extras';

	let renderer: WebGLRenderer;
	let camera: PerspectiveCamera;
	let control: OrbitControls;
	const strDownloadMime = 'image/octet-stream';

	snapshot.subscribe((val) => {
		renderer = val;
	});

	sceneCamera.subscribe((val) => {
		camera = val;
	});

	sceneControl.subscribe((val) => {
		control = val;
	});

	const centerCamera = () => {
		camera.lookAt(0, 5, 0);
		control.update();
	};

	function saveAsImage() {
		var imgData, imgNode;

		try {
			var strMime = 'image/jpeg';
			imgData = renderer.domElement.toDataURL(strMime);

			saveFile(imgData.replace(strMime, strDownloadMime), 'test.jpg');
		} catch (e) {
			console.log(e);
			return;
		}
	}

	var saveFile = function (strData, filename) {
		var link = document.createElement('a');
		if (typeof link.download === 'string') {
			document.body.appendChild(link); //Firefox requires the link to be in the body
			link.download = filename;
			link.href = strData;
			link.click();
			document.body.removeChild(link); //remove the link when done
		}
	};
</script>

<div class="flex absolute bottom-0 flex-col-reverse gap-2 mb-2 h-fit">
	<button
		on:click={centerCamera}
		class="flex justify-center items-center bg-base-200 btn-circle hover:bg-base-300"
		class:!delay-50={$settingControl.isCameraOpen}
		class:!delay-100={!$settingControl.isCameraOpen}
		class:slide-in-right={$settingControl.isCameraOpen}
		class:slide-out-right={!$settingControl.isCameraOpen}
	>
		<AlignVerticalSpaceAround />
	</button>

	<!-- <button -->
	<!-- 	on:click={saveAsImage} -->
	<!-- 	class="flex justify-center items-center bg-base-200 btn-circle hover:bg-base-300" -->
	<!-- 	class:!delay-100={$settingControl.isCameraOpen} -->
	<!-- 	class:!delay-50={!$settingControl.isCameraOpen} -->
	<!-- 	class:slide-in-right={$settingControl.isCameraOpen} -->
	<!-- 	class:slide-out-right={!$settingControl.isCameraOpen} -->
	<!-- > -->
	<!-- 	<Camera /> -->
	<!-- </button> -->
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
