<script>
	import { register } from '@teamhanko/hanko-elements';
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';

	const hankoApi = env.PUBLIC_HANKO_API_URL;

	onMount(async () => {
		register(hankoApi).catch((error) => {
			// handle error
		});
	});
</script>

<hanko-profile />

<style>
	/* container - the UI container */
	/* headline1 - the "h1" headlines */
	/* headline2 - the "h2" headlines */
	/* paragraph - the paragraph elements */
	/* button - every button element */
	/* primary-button - the primary button */
	/* secondary-button - the secondary button on the email login page */
	/* input - every input field */
	/* text-input - every input field not used for passcodes */
	/* passcode-input - the passcode input fields */
	/* link - the links in the footer section */
	/* error - the error message container */
	/* error-text - the error message */
	/* divider - the horizontal divider on the login page */
	/* divider-text - the divider text */
	/* divider-line - the line before and after the divider-text */
	/* form-item - the container of a form item, e.g. an input field or a button */

	hanko-profile::part(container) {
		background: transparent;
		-webkit-animation: fade-in 1.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
		animation: fade-in 1.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
	}

	@-webkit-keyframes fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	hanko-profile::part(headline1) {
		@apply text-accent text-center;
	}

	hanko-profile::part(headline2) {
		@apply text-primary;
	}

	hanko-profile::part(input) {
		@apply bg-transparent border border-accent text-accent;
	}

	hanko-profile::part(error) {
		@apply bg-transparent border border-error text-error;
	}

	hanko-profile::part(paragraph) {
		@apply text-white;
	}

	hanko-profile::part(primary-button) {
		@apply bg-accent text-accent-content;
	}

	hanko-profile::part(link) {
		@apply text-white;
	}

	hanko-profile::part(secondary-button) {
		@apply bg-info text-white;
	}
</style>
