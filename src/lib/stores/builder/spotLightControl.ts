import { writable } from 'svelte/store';
import type { SpotLightControlType } from './type';

const defaultSpotlightControl: SpotLightControlType = {
	color: '#ffffff',
	intensity: 0.5,
	distance: 1,
	angle: 1,
	decay: 1,
	penumbra: 1,
	power: 1,
	position: [10, 20, 10]
};

const spotLightControl = writable<SpotLightControlType>(defaultSpotlightControl);

export default spotLightControl;