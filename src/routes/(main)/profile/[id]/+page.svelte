<script lang="ts">
	import HankoProfile from '$lib/components/Hanko/HankoProfile.svelte';
	import Logout from '$lib/components/Hanko/Logout.svelte';
	import { page } from '$app/stores';
	import { Edit2 } from 'lucide-svelte';
	import GalleryCard from '$lib/components/GalleryCard.svelte';
	import type { LayoutData } from '../../$types';
	export let data: LayoutData;

	$: ({ user: loggedInUser, supabase } = data);

	$: userId = $page.url.pathname.split('/')[$page.url.pathname.split('/').length - 1];

	const handleGetUserPosts = async () => {
		const { data } = await supabase.from('post').select().eq('owner', userId);

		if (data && data.length > 0) {
			return data;
		} else {
			throw new Error();
		}
	};

	const handleGetUser = async () => {
		const { data } = await supabase.from('users').select().eq('user_id', userId);

		if (data && data.length > 0) {
			return data[0];
		} else {
			throw new Error();
		}
	};
</script>

{#await handleGetUser()}
	<span class="loading loading-spinner" />
{:then userInfo}
	<div class="flex flex-col h-full md:flex-row">
		<div class="flex flex-col items-center p-4 w-full md:w-1/4">
			<div class="flex flex-col gap-2 items-center">
				<div class="avatar">
					<div class="w-40 rounded-full">
						<img src={userInfo.avatar} alt="user avatar" />
					</div>
				</div>
				<h3 class="text-2xl text-accent">{userInfo.name}</h3>
				<p class="flex-wrap w-56 break-words">{userInfo.bio}</p>
			</div>

			{#if loggedInUser && userInfo.id === loggedInUser.user_id}
				<HankoProfile />

				<div class="flex flex-col gap-2 justify-center items-center w-full">
					<button class="w-full btn btn-primary">
						<Edit2 />
						Edit
					</button>
					<Logout />
				</div>
			{/if}
		</div>

		<div class="flex-1 p-4 w-full md:border-l">
			{#await handleGetUserPosts()}
				<p>Loading</p>
			{:then posts}
				<div class="grid grid-cols-1 gap-4 max-w-full md:grid-cols-2 lg:grid-cols-3">
					{#each posts as post}
						<GalleryCard
							id={post.id}
							title={post.title}
							thumbnail={post.thumbnail}
							likes={post.likes}
						/>
					{/each}
				</div>
			{/await}
		</div>
	</div>
{:catch}
	<div>Error</div>
{/await}
