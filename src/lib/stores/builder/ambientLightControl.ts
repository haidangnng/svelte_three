import { writable } from 'svelte/store';
import type { LightingControlType } from './type';

const defaultAmbientLightControl: LightingControlType = {
	color: '#ffffff',
	intensity: 0.5
};

const ambientLightControl = writable<LightingControlType>(defaultAmbientLightControl);
export const resetAmbientLightControl = () => ambientLightControl.set(defaultAmbientLightControl);

export default ambientLightControl;
