<script lang="ts">
	import { Eye, Heart, MessageCircle } from 'lucide-svelte';
</script>

<div class="flex flex-col gap-2 justify-between p-2 rounded-lg border">
	<!-- Thumbnails  -->
	<div class="">thumbnails</div>

	<!-- Interactions -->
	<div class="flex justify-between items-center">
		<div>Author</div>

		<div class="flex space-x-2">
			<div class="flex gap-1 items-center">
				<Heart size="20" />
				<p>123</p>
			</div>

			<div class="flex gap-1 items-center">
				<Eye size="20" />
				<p>123</p>
			</div>

			<div class="flex gap-1 items-center">
				<MessageCircle size="20" />
				<p>123</p>
			</div>
		</div>
	</div>
</div>
