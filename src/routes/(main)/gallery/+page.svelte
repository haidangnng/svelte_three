<script lang="ts">
	import GalleryCard from '$lib/components/GalleryCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: posts = data.post;
</script>

<div class="p-10">
	<h1 class="mb-4 text-2xl font-semibold text-white uppercase">Gallery</h1>

	<div class="grid grid-cols-1 gap-4 max-w-full md:grid-cols-2 lg:grid-cols-4">
		{#if posts && posts.length > 0}
			{#each posts as post}
				<GalleryCard
					id={post.id}
					title={post.title}
					thumbnail={post.thumbnail}
					likes={post.likes}
				/>
			{/each}
		{/if}
	</div>
</div>
