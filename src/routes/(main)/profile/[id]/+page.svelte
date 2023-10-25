<script lang="ts">
	import HankoProfile from '$lib/components/Hanko/HankoProfile.svelte';
	import Logout from '$lib/components/Hanko/Logout.svelte';
	import { page } from '$app/stores';
	import { Edit2 } from 'lucide-svelte';
	import GalleryCard from '$lib/components/GalleryCard.svelte';
	import type { LayoutData } from '../../$types';
	import EditProfile from '$lib/components/EditProfile.svelte';
	import type { ActionData } from '../../builder/$types';
	import type { UserType } from '$lib/types/user';

	export let data: LayoutData;
	export let form: ActionData;
	let isEditing: boolean = false;

	$: ({ user: loggedInUser, supabase } = data);
	$: isOwner = (userInfo: UserType) => loggedInUser && userInfo.user_id === loggedInUser.user_id;
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

	$: if (!isEditing) {
		fetchData = handleGetUser();
	}

	let fetchData = handleGetUser();
</script>

{#await fetchData}
	<span class="loading loading-spinner" />
{:then userInfo}
	{#if !userInfo.isCreated}
		<div class="flex flex-col justify-center items-center h-full md:flex-row">
			<div class="flex flex-col items-center p-4 w-full md:w-1/2 lg:w-1/3">
				{#if isEditing}
					<EditProfile bind:form {userInfo} bind:isEditing />
				{:else}
					<div>
						<div class="flex flex-col gap-2 items-center mb-4">
							<h3 class="text-2xl text-accent">You need to setup your profile</h3>
						</div>

						{#if isOwner(userInfo)}
							<div class="flex flex-col gap-2 justify-center items-center w-full">
								<button class="w-full btn btn-primary" on:click={() => (isEditing = true)}>
									<Edit2 />
									Edit
								</button>
								<Logout />
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	{:else}
		<div class="flex flex-col h-full md:flex-row">
			<div class="flex flex-col items-center p-4 w-full md:w-1/2 lg:w-1/3">
				{#if isEditing}
					<EditProfile bind:form {userInfo} bind:isEditing />
				{:else}
					<div>
						<div class="flex flex-col gap-2 items-center">
							{#if userInfo.avatar}
								<div class="avatar">
									<div class="w-40 rounded-full">
										<img src={userInfo.avatar} alt="user avatar" />
									</div>
								</div>
							{/if}
							<h3 class="text-2xl text-accent">{userInfo.name}</h3>
							<p class="flex-wrap w-56 break-words">{userInfo.bio}</p>
						</div>

						{#if isOwner(userInfo)}
							<HankoProfile />

							<div class="flex flex-col gap-2 justify-center items-center w-full">
								<button class="w-full btn btn-primary" on:click={() => (isEditing = true)}>
									<Edit2 />
									Edit
								</button>
								<Logout />
							</div>
						{/if}
					</div>
				{/if}
			</div>

			<div class="flex-1 p-4 w-full h-full md:border-l">
				{#await handleGetUserPosts()}
					<p>Loading</p>
				{:then posts}
					{#if posts && posts.length > 0}
						<div class="grid grid-cols-1 gap-4 max-w-full sm:grid-cols-2 lg:grid-cols-3">
							{#each posts as post}
								<GalleryCard
									id={post.id}
									title={post.title}
									thumbnail={post.thumbnail}
									likes={post.likes}
								/>
							{/each}
						</div>
					{:else}
						<div class="flex justify-center items-center w-full">
							<h3 class="text-2xl">User has no posts yet</h3>
						</div>
					{/if}
				{/await}
			</div>
		</div>
	{/if}
{:catch}
	<div>Error</div>
{/await}
