<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: posts = data.posts;
</script>

<div>Gallery</div>
<p>Showing {posts.length}</p>

<ul>
	{#each posts as post}
		<li>
			<a href="/gallery/{post.slug}">{post.title}</a>
		</li>
	{/each}
</ul>
