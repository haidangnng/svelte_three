<script lang="ts">
	import { page } from '$app/stores';
</script>

<header class="navbar bg-base-100 header">
	<div class="navbar-start">
		<div class="dropdown">
			<button class="lg:hidden btn btn-ghost">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="w-5 h-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</button>
			<ul class="p-2 mt-3 w-52 shadow menu menu-sm dropdown-content z-[1] bg-base-100 rounded-box">
				<li><a href="/builder">Builder</a></li>
				<li><a href="/">Item 1</a></li>
			</ul>
		</div>
		<a href="/" class="text-xl normal-case btn btn-ghost">daisyUI</a>
	</div>
	<div class="hidden lg:flex navbar-center">
		<ul class="px-1 menu menu-horizontal">
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/builder' ? 'page' : undefined}>
				<a href="/builder">Builder</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/gallery') ? 'page' : undefined}>
				<a href="/gallery">Gallery</a>
			</li>
		</ul>
	</div>
	<div class="navbar-end">
		<a href="/auth" class="btn btn-primary">Login</a>
	</div>
</header>

<style>
	.header {
		view-transition-name: header;
	}

	li[aria-current='page']::after {
		content: ' ';
		border-bottom: 1px solid white;
		view-transition-name: active-page;
	}
</style>
