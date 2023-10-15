<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { register, type RegisterOptions } from '@teamhanko/hanko-elements';
	import { env } from '$env/dynamic/public';
	const hankoApi = env.PUBLIC_HANKO_API_URL;

	const redirectAfterLogin = () => {
		goto('/dashboard');
	};

	const hankoOptions: Partial<RegisterOptions> = {
		enablePasskeys: false,
		hidePasskeyButtonOnLogin: true
		// shadow: true,                    // Set to false if you do not want the web component to be attached to the shadow DOM.
		// injectStyles: true,              // Set to false if you do not want to inject any default styles.
		// enablePasskeys: true,            // Set to false if you do not want to display passkey-related content.
		// hidePasskeyButtonOnLogin: false, // Hides the button to sign in with a passkey on the login page.
		// translations: null,              // Additional translations can be added here. English is used when the option is not
		//                                  // present or set to `null`, whereas setting an empty object `{}` prevents the elements
		//                                  // from displaying any translations.
		// translationsLocation: "/i18n",   // The URL or path where the translation files are located.
		// fallbackLanguage: "en",          // The fallback language to be used if a translation is not available.
		// storageKey: "hanko",
	};

	onMount(async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		register(hankoApi, hankoOptions).catch((_error) => {
			// handle error
		});
	});
</script>

<hanko-auth on:onAuthFlowCompleted={redirectAfterLogin} />
