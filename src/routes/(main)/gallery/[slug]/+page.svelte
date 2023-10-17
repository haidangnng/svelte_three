<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const formatDate = (date: Date) =>
		new Intl.DateTimeFormat('en', {
			dateStyle: 'long'
		}).format(date);
</script>

<hgroup>
	<h1>{data.title}</h1>
	<h2>{formatDate(data.createdAt)}</h2>
</hgroup>
