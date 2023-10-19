import { writable } from 'svelte/store';
import type { ModelControlType } from './type';

const defaultModelControl: ModelControlType = {
	scale: 2,
	isRotating: true,
	rotationSpeed: 0.01
};

const modelControl = writable<ModelControlType>(defaultModelControl);

export default modelControl;
