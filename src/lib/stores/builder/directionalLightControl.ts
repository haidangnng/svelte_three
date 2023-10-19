import { writable } from 'svelte/store';
import type { DirectionalLightControlType } from './type';

const defaultDirectionalLightControl: DirectionalLightControlType = {
	color: '#ffffff',
	intensity: 0.5,
	position: [0.5, 0.5, 0.5],
	target: [0.5, 0.5, 0.5]
};

const directionLightControl = writable<DirectionalLightControlType>(defaultDirectionalLightControl);

export default directionLightControl;
