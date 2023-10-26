<script lang="ts">
	export let open: boolean = false;
	import boxControl from '$lib/stores/builder/boxControl';
	import ambientLightControl from '$lib/stores/builder/ambientLightControl';
	import directionalLightControl from '$lib/stores/builder/directionalLightControl';
	import spotLightControl from '$lib/stores/builder/spotLightControl';
	import modelControl from '$lib/stores/builder/modelControl';
	import { goto, invalidateAll } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { SETTING_OPTIONS } from '$lib/types/settings';
	import snapshot from '$lib/stores/builder/snapshot';
	import postControl from '$lib/stores/posts';
	import { decode } from 'base64-arraybuffer';

	import type {
		BoxControlType,
		DirectionalLightControlType,
		LightingControlType,
		ModelControlType,
		SpotLightControlType
	} from '$lib/stores/builder/type';
	import type { WebGLRenderer } from 'three';
	import { saveAsImage } from '$lib/utils/snapshot';
	import { generateUUID } from 'three/src/math/MathUtils.js';

	export let userId: string | undefined = undefined;
	export let isEditable: boolean = false;
	export let supabase;
	let loading: boolean = false;
	let renderer: WebGLRenderer;

	snapshot.subscribe((val) => {
		renderer = val;
	});

	const createSettings = async (
		type: SETTING_OPTIONS,
		data:
			| BoxControlType
			| LightingControlType
			| DirectionalLightControlType
			| SpotLightControlType
			| ModelControlType
	) => {
		let route: string = `/api/${type}`;

		const body = Object.keys(data).reduce((formData, key) => {
			formData.append(key, data[key as keyof typeof data]);
			return formData;
		}, new FormData());

		const response = await fetch(route, {
			method: 'POST',
			body
		});

		return response.json();
	};

	const createScreenshot = async (title: string) => {
		// const body = new FormData();
		const imgData: string | undefined = saveAsImage(renderer);

		if (!imgData) {
			return;
		}

		const genTitle = `${generateUUID()}_${title}`;
		const base64 = imgData.split('base64,')[1];
		supabase.storage.from('thumbnail').upload(genTitle, decode(base64), {
			contentType: 'image/png'
		});

		const { data: thumbnailData } = await supabase.storage.from('thumbnail').getPublicUrl(genTitle);

		return thumbnailData.publicUrl;
	};

	const handleSubmit = async (event: Event) => {
		loading = true;
		if (!userId) return;

		const formEl = event.target as HTMLFormElement;
		const data = new FormData(formEl);

		const [box, ambient, directional, model, spotlight, thumbnail] = await Promise.all([
			createSettings(SETTING_OPTIONS.BOX, $boxControl),
			createSettings(SETTING_OPTIONS.AMBIENT, $ambientLightControl),
			createSettings(SETTING_OPTIONS.DIRECTION, $directionalLightControl),
			createSettings(SETTING_OPTIONS.MODEL, $modelControl),
			createSettings(SETTING_OPTIONS.SPOT, $spotLightControl),
			createScreenshot(String(data.get('title')))
		]);
		if ($postControl?.id !== undefined) {
			data.set('id', $postControl.id);
		}

		data.set('owner', userId);
		data.set('box_setting', box.id);
		data.set('ambient_setting', ambient.id);
		data.set('direction_setting', directional.id);
		data.set('model_setting', model.id);
		data.set('spotlight_setting', spotlight.id);
		data.set('thumbnail', thumbnail);

		const response = await fetch(formEl.action, {
			method: 'POST',
			body: data
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			await invalidateAll();
			if (result.data?.post?.id) {
				goto(`/gallery/${result.data.post.id}`);
			}
		}
		loading = false;

		applyAction(result);
	};
</script>

<div class="modal" class:modal-open={open}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Save post</h3>

		<form
			id="save_post"
			action="?/create_post"
			method="post"
			on:submit|preventDefault={handleSubmit}
		>
			<div class="form-control">
				<label class="cursor-pointer label">
					<span class="label-text">Title</span>
					<input
						type="text"
						name="title"
						bind:value={$postControl.title}
						placeholder="Title"
						class="w-full max-w-xs input input-sm input-bordered"
					/>
				</label>
			</div>

			<div class="form-control">
				<label class="cursor-pointer label">
					<span class="label-text">Description</span>
					<textarea
						name="description"
						bind:value={$postControl.description}
						placeholder="Description"
						class="w-full max-w-xs textarea textarea-bordered textarea-md"
					/>
				</label>
			</div>

			<div class="modal-action">
				<button
					class="btn btn-ghost"
					type="button"
					disabled={loading}
					on:click={() => (open = false)}>Cancel</button
				>
				<button class="btn btn-primary" disabled={loading} type="submit" form="save_post">
					{#if loading}
						<span class="loading loading-spinner" />
					{/if}
					Save
				</button>
			</div>
		</form>
	</div>
</div>
