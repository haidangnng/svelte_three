<script lang="ts">
	import type { ToastType } from '$lib/stores/toast/type';
	import { ToastEnum } from '$lib/stores/toast/type';
	import { X } from 'lucide-svelte';

	export let toast: ToastType;
	export let clearToast: (id: string) => void;

	$: alertClass = (() => {
		switch (toast.type) {
			case ToastEnum.INFO:
				return 'alert-info';
			case ToastEnum.SUCCESS:
				return 'alert-success';
			case ToastEnum.ERROR:
				return 'alert-error';
			case ToastEnum.WARNING:
				return 'alert-warning';
			default:
				return 'alert-info';
		}
	})();
</script>

<div class="w-72 toast">
	<div class={`block w-full alert ${alertClass}`}>
		<div class="flex justify-between items-center w-full">
			<h3>{toast.title}</h3>
			<button on:click={() => clearToast(toast.id)}><X size="14" /></button>
		</div>
		<p class="w-full text-sm">{toast.description}</p>
	</div>
</div>
