<script lang="ts">
	import HankoProfile from '$lib/components/Hanko/HankoProfile.svelte';
	import Logout from '$lib/components/Hanko/Logout.svelte';
	import { onMount } from 'svelte';
	import type { LayoutData } from '../$types';
	import type { UserType } from '$lib/types/user';
	import { Edit2 } from 'lucide-svelte';
	import GalleryCard from '$lib/components/GalleryCard.svelte';
	export let data: LayoutData;

	$: ({
		user: { user_id },
		supabase
	} = data);

	let userInfo: UserType;

	const handleGetUserPosts = async () => {
		const { data } = await supabase.from('post').select().eq('owner', user_id);

		if (data && data.length > 0) {
			return data;
		}
		return [];
	};

	const handleGetUser = async () => {
		const { data } = await supabase.from('users').select().eq('user_id', user_id);

		if (data && data.length > 0) {
			userInfo = data[0];
		}
	};

	onMount(() => {
		handleGetUser();
	});
</script>

{#if userInfo}
	<div class="flex flex-col h-full md:flex-row">
		<div class="flex flex-col items-center p-4 w-full md:w-fit">
			<div class="flex flex-col gap-2 items-center">
				<div class="avatar">
					<div class="w-40 rounded-full">
						<img src={userInfo.avatar} alt="user avatar" />
					</div>
				</div>
				<h3 class="text-2xl text-accent">{userInfo.name}</h3>
				<p class="flex-wrap w-56 break-words">{userInfo.bio}</p>
			</div>
			<HankoProfile />

			<div class="flex flex-col gap-2 justify-center items-center w-full">
				<button class="w-full btn btn-primary">
					<Edit2 />
					Edit
				</button>
				<Logout />
			</div>
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
{/if}
