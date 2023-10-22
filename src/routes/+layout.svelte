<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import '../app.css';

	import toastStore from '$lib/stores/toast';
	import Toast from '$lib/components/Toast.svelte';
	import { ToastEnum } from '$lib/stores/toast/type';
	import { generateUUID } from 'three/src/math/MathUtils.js';
	import { onDestroy } from 'svelte';

	$: toasts = $toastStore;
	const interval = setInterval(() => {
		toastStore.timerToast();
	}, 3000);

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((res) => {
			document.startViewTransition(async () => {
				res();
				await navigation.complete;
			});
		});
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<slot />

<div class="absolute right-2 bottom-2">
	<div class="stack">
		{#each toasts.reverse() as toast}
			<Toast {toast} clearToast={toastStore.removeToast} />
		{/each}
	</div>
</div>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	@keyframes slide-from-right {
		from {
			transform: translateX(100px);
		}
	}

	@keyframes slide-to-left {
		to {
			transform: translateX(-100px);
		}
	}

	:root::view-transition-old(root) {
		animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
	}

	:root::view-transition-new(root) {
		animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
	}
</style>
