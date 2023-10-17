import { writable } from 'svelte/store';

export type BoxControlType = {
	useBox: boolean;
	useTransparent: boolean;
	roughness?: number;
	transmission?: number;
	metalness?: number;
};

export type LightingControlType = {
	color: string;
	intensity: number;
};

export type DirectionalLightControlType = LightingControlType & {
	position: [number, number, number];
	target: [number, number, number];
};

export type ModelControlType = {
	scale: number;
	isRotating: boolean;
	rotationSpeed: number;
};

export type BuilderForm = {
	boxControl: BoxControlType;
	ambientLightControl: LightingControlType;
	directionalLightControl: DirectionalLightControlType;
	modelControl: ModelControlType;
};

const defaultBoxControl: BoxControlType = {
	useBox: true,
	useTransparent: true,
	roughness: 0.5,
	transmission: 0.5,
	metalness: 0.5
};

const defaultAmbientLightControl: LightingControlType = {
	color: '#000000',
	intensity: 0.5
};

const defaultDirectionalLightControl: DirectionalLightControlType = {
	color: '#000000',
	intensity: 0.5,
	position: [0.5, 0.5, 0.5],
	target: [0.5, 0.5, 0.5]
};

const defaultModelControl: ModelControlType = {
	scale: 0,
	isRotating: true,
	rotationSpeed: 0.5
};

const defaultBuilderForm: BuilderForm = {
	boxControl: defaultBoxControl,
	ambientLightControl: defaultAmbientLightControl,
	directionalLightControl: defaultDirectionalLightControl,
	modelControl: defaultModelControl
};

export const builderForm = writable(defaultBuilderForm);
