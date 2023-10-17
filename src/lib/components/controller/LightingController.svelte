<div class="text-xl font-medium collapse-title">Lighting</div>

<div class="collapse-content">
	<div class="form-control">
		<label class="cursor-pointer label">
			<span class="label-text">Color</span>
			<input type="checkbox" class="toggle toggle-success" checked />
		</label>
	</div>

	<div class="form-control">
		<label class="space-x-2 cursor-pointer label">
			<span class="label-text">Transparency</span>
			<input type="range" min="0" max="1" value="0" class="range" step={0.01} />
		</label>
	</div>

	<div class="form-control">
		<label class="space-x-2 cursor-pointer label">
			<span class="label-text">Roughness</span>
			<input type="range" min="0" max="1" value="0" class="range" step={0.01} />
		</label>
	</div>

	<div class="form-control">
		<label class="space-x-2 cursor-pointer label">
			<span class="label-text">Tranmission</span>
			<input type="range" min="0" max="1" value="0" class="range" step={0.01} />
		</label>
	</div>
</div>
