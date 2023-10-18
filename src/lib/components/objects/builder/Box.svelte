<script lang="ts">
	import DisplayBox from './DisplayBox.svelte';
	import LightBox from './LightBox.svelte';
	import boxControl from '$lib/stores/builder/boxControl';
	import { BOX_TYPE } from '$lib/stores/builder/type';
</script>

{#if $boxControl.boxType === BOX_TYPE.LIGHT}
	<LightBox />
{:else}
	<DisplayBox />
{/if}
