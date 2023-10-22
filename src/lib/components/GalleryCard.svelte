<script lang="ts">
	import { goto } from '$app/navigation';
	import { Heart } from 'lucide-svelte';

	export let id: number;
	export let title: string;
	export let thumbnail: string;
	export let likes: number;
</script>

<div class="flex flex-col gap-2 justify-between p-4 w-full rounded-lg border box-border">
	<!-- Thumbnails  -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="rounded-lg border cursor-pointer" on:click={() => goto(`/gallery/${id}`)}>
		<img src={thumbnail} alt="post thumbnail" />
	</div>

	<!-- Interactions -->
	<div class="flex justify-between items-center">
		<div>
			<h1 class="text-xl text-white">{title}</h1>
		</div>

		<div class="flex space-x-2">
			<div class="flex gap-1 items-center">
				<Heart size="16" />
				<p class="text-xs">{likes}</p>
			</div>

			<!-- <div class="flex gap-1 items-center"> -->
			<!-- 	<Eye size="16" /> -->
			<!-- 	<p class="text-xs">123</p> -->
			<!-- </div> -->

			<!-- <div class="flex gap-1 items-center"> -->
			<!-- 	<MessageCircle size="20" /> -->
			<!-- 	<p>123</p> -->
			<!-- </div> -->
		</div>
	</div>
</div>
