<script>
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<div class="flex flex-col w-screen h-screen">
	<div class="h-full">
		<Navbar />
		<slot />
	</div>
</div>
