<script lang="ts">
	import { Canvas } from '@threlte/core';
	import type { PageServerData } from './$types';
	import BuilderScene from '$lib/components/scenes/BuilderScene.svelte';
	import boxControl from '$lib/stores/builder/boxControl';
	import modelControl from '$lib/stores/builder/modelControl';
	import ambientLightControl from '$lib/stores/builder/ambientLightControl';
	import directionLightControl from '$lib/stores/builder/directionalLightControl';
	import spotLightControl from '$lib/stores/builder/spotLightControl';
	import postControl from '$lib/stores/posts';
	import { onMount } from 'svelte';
	import { Edit3, Expand } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	export let data: PageServerData;
	let isExpanded: boolean = false;
	$: isEditable = data.user && data.user.user_id === data.postData.users.user_id;

	onMount(() => {
		const {
			box_settings,
			ambient_settings,
			direction_settings,
			spotlight_settings,
			model_settings,
			id,
			title,
			description
		} = data.postData;

		postControl.set({
			id,
			title,
			description
		});

		boxControl.set({
			...box_settings,
			size: [box_settings.dimension.x, box_settings.dimension.y, box_settings.dimension.z]
		});
		ambientLightControl.set(ambient_settings);
		directionLightControl.set({
			...direction_settings,
			position: [
				direction_settings.position.x,
				direction_settings.position.y,
				direction_settings.position.z
			],
			target: [
				direction_settings.target.x,
				direction_settings.target.y,
				direction_settings.target.z
			]
		});
		spotLightControl.set({
			...spotlight_settings,
			position: [
				spotlight_settings.position.x,
				spotlight_settings.position.y,
				spotlight_settings.position.z
			]
		});
		modelControl.set(model_settings);
	});

	$: canvasClass = isExpanded ? 'w-full h-2/3' : 'w-80 h-80';
	$: ({ title, description, users } = data.postData);
</script>

<div class="flex relative flex-col gap-4 justify-start items-center w-full h-full">
	<div
		class={`rounded-3xl border border-accent transition-all delay-150 ease-in-out relative ${canvasClass}`}
	>
		<Canvas>
			<BuilderScene />
		</Canvas>
		{#if isEditable}
			<button class="absolute right-4 bottom-4">
				<a href="/builder?isEdit=true">
					<Edit3 />
				</a>
			</button>
		{/if}
		<button class="absolute bottom-4 left-4" on:click={() => (isExpanded = !isExpanded)}>
			<Expand />
		</button>
	</div>

	<div class="flex flex-col gap-4 justify-center items-center">
		<h3 class="text-2xl">{title}</h3>
		<p class="">{description}</p>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="flex gap-2 cursor-pointer" on:click={() => goto(`/profile/${users.user_id}`)}>
			{#if users.avatar}
				<div class="avatar">
					<div class="w-16 rounded-full">
						<img src={users.avatar} alt="user avatar" />
					</div>
				</div>
			{/if}

			<div class="flex flex-col gap-2">
				<h3 class="text-xl text-accent">{users.name}</h3>
				<p class="flex-wrap w-56 break-words">{users.bio}</p>
			</div>
		</div>
	</div>
</div>
