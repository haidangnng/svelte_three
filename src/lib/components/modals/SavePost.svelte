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
	import type {
		BoxControlType,
		DirectionalLightControlType,
		LightingControlType,
		ModelControlType,
		SpotLightControlType
	} from '$lib/stores/builder/type';

	export let userId: string | undefined = undefined;

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

	const handleSubmit = async (event: Event) => {
		if (!userId) return;

		const formEl = event.target as HTMLFormElement;
		const data = new FormData(formEl);

		const [box, ambient, directional, model, spotlight] = await Promise.all([
			createSettings(SETTING_OPTIONS.BOX, $boxControl),
			createSettings(SETTING_OPTIONS.AMBIENT, $ambientLightControl),
			createSettings(SETTING_OPTIONS.DIRECTION, $directionalLightControl),
			createSettings(SETTING_OPTIONS.MODEL, $modelControl),
			createSettings(SETTING_OPTIONS.SPOT, $spotLightControl)
		]);

		data.set('owner', userId);
		data.set('box_setting', box.id);
		data.set('ambient_setting', ambient.id);
		data.set('direction_setting', directional.id);
		data.set('model_setting', model.id);
		data.set('spotlight_setting', spotlight.id);

		const response = await fetch(formEl.action, {
			method: 'POST',
			body: data
		});

		const result: ActionResult = deserialize(await response.text());
		console.log('result', result);

		if (result.type === 'success') {
			// rerun all `load` functions, following the successful update
			await invalidateAll();
		}

		applyAction(result);
	};
</script>

<div class="modal" class:modal-open={open}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Upload model</h3>
		<p class="py-4">Save post</p>

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
				<button class="btn btn-ghost" on:click={() => (open = false)}>Cancel</button>
				<button class="btn btn-primary" type="submit" form="save_post">Save</button>
			</div>
		</form>
	</div>
</div>
