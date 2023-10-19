export enum BOX_TYPE {
	LIGHT = 'light_box',
	DISPLAY = 'display_box'
}

export const boxSelect = [
	{ value: BOX_TYPE.LIGHT, label: 'Light box' },
	{ value: BOX_TYPE.DISPLAY, label: 'display box' }
];

export type BoxControlType = {
	boxType: BOX_TYPE;
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
// color - (optional) hexadecimal color of the light. Default is 0xffffff (white).
// intensity - (optional) numeric value of the light's strength/intensity. Default is 1.
//
// distance - Maximum range of the light. Default is 0 (no limit).
// angle - Maximum angle of light dispersion from its direction whose upper bound is Math.PI/2.
// penumbra - Percent of the spotlight cone that is attenuated due to penumbra. Takes values between zero and 1. Default is zero.
// decay - The amount the light dims along the distance of the light.

export type SpotLightControlType = LightingControlType & {
	distance: number;
	angle: number;
	penumbra: number;
	decay: number;
	power: number;
	position: [number, number, number];
};

export type ModelControlType = {
	scale: number;
	isRotating: boolean;
	rotationSpeed: number;
};

export type SettingType = {
	isSettingOpen: boolean;
	isCameraOpen: boolean;
};
