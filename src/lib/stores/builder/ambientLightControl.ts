import { writable } from 'svelte/store';
import type { LightingControlType } from './type';

const defaultAmbientLightControl: LightingControlType = {
	color: '#000000',
	intensity: 0.5
};

const ambientLightControl = writable<LightingControlType>(defaultAmbientLightControl);

export default ambientLightControl;
