<script>
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<div class="flex flex-col w-screen h-screen">
	<div class="flex flex-col h-full">
		<Navbar />
		<div class="flex-grow">
			<slot />
		</div>
	</div>
</div>
