<script lang="ts">
	export let open: boolean = false;
	import boxControl from '$lib/stores/builder/boxControl';
	import ambientLightControl from '$lib/stores/builder/ambientLightControl';
	import directionalLightControl from '$lib/stores/builder/directionalLightControl';
	import spotLightControl from '$lib/stores/builder/spotLightControl';
	import modelControl from '$lib/stores/builder/modelControl';
	import { invalidateAll } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { SETTING_OPTIONS } from '$lib/types/settings';
	import snapshot from '$lib/stores/builder/snapshot';

	import type {
		BoxControlType,
		DirectionalLightControlType,
		LightingControlType,
		ModelControlType,
		SpotLightControlType
	} from '$lib/stores/builder/type';
	import type { WebGLRenderer } from 'three';
	import { saveAsImage } from '$lib/utils/snapshot';

	export let userId: string | undefined = undefined;
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
		const body = new FormData();
		const imgData: string | undefined = saveAsImage(renderer);

		if (!imgData) {
			return;
		}

		body.set('imgData', imgData);
		body.set('title', title);

		const response = await fetch('/api/upload/thumbnail', {
			method: 'POST',
			body
		});

		return response.json();
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
		data.set('owner', userId);
		data.set('box_setting', box.id);
		data.set('ambient_setting', ambient.id);
		data.set('direction_setting', directional.id);
		data.set('model_setting', model.id);
		data.set('spotlight_setting', spotlight.id);
		data.set('thumbnail', thumbnail.url);

		const response = await fetch(formEl.action, {
			method: 'POST',
			body: data
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			await invalidateAll();
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
