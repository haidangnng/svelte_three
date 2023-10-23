<script lang="ts">
	import { onMount } from 'svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { register, type RegisterOptions } from '@teamhanko/hanko-elements';
	import { env } from '$env/dynamic/public';
	const hankoApi = env.PUBLIC_HANKO_API_URL;

	const redirectAfterLogin = async () => {
		await invalidateAll();
		goto('/gallery');
	};

	const hankoOptions: Partial<RegisterOptions> = {
		enablePasskeys: false,
		hidePasskeyButtonOnLogin: true
		// shadow: false, // Set to false if you do not want the web component to be attached to the shadow DOM.
		// injectStyles: false // Set to false if you do not want to inject any default styles.
	};

	onMount(async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		register(hankoApi, hankoOptions).catch((_error) => {
			// handle error
		});
	});
</script>

<hanko-auth on:onAuthFlowCompleted={redirectAfterLogin} class="fade-in" />

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

	hanko-auth::part(container) {
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

	hanko-auth::part(headline1) {
		@apply text-accent text-center;
	}

	hanko-auth::part(input) {
		@apply bg-transparent border border-accent text-accent;
	}

	hanko-auth::part(error) {
		@apply bg-transparent border border-error text-error;
	}

	hanko-auth::part(paragraph) {
		@apply text-white;
	}

	hanko-auth::part(primary-button) {
		@apply bg-accent text-accent-content;
	}

	hanko-auth::part(link) {
		@apply text-white;
	}

	hanko-auth::part(secondary-button) {
		@apply bg-info text-white;
	}
</style>
