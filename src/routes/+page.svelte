<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	$: userId = data?.user?.user_id || '';
</script>

<div class="flex flex-col h-screen">
	<Navbar bind:userId />

	<div class="flex flex-grow justify-center items-center h-full">
		<div class="text-center hero-content">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">Display your model</h1>
				<p class="py-6">
					Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
					exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
				</p>
				<button class="btn btn-primary">
					<a href="/auth"> Get Started </a>
				</button>
			</div>
		</div>
	</div>
</div>
