import { writable } from 'svelte/store';
import type { DirectionalLightControlType, LightingControlType } from './type';

const defaultDirectionalLightControl: DirectionalLightControlType = {
	color: '#000000',
	intensity: 0.5,
	position: [0.5, 0.5, 0.5],
	target: [0.5, 0.5, 0.5]
};

const directionLightControl = writable<LightingControlType>(defaultDirectionalLightControl);

export default directionLightControl;
