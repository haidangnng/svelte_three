export enum BOX_TYPE {
	LIGHT = 'light_box',
	DISPLAY = 'display_box'
}

export const boxSelect = [
	{ value: BOX_TYPE.LIGHT, label: 'Light box' },
	{ value: BOX_TYPE.DISPLAY, label: 'display box' }
];

export type BoxControlType = {
	id?: string;
	boxType: BOX_TYPE;
	color: string;
	useTransparent: boolean;
	roughness?: number;
	transmission?: number;
	metalness?: number;
	size: [number, number, number];
};

export type LightingControlType = {
	id?: string;
	color: string;
	intensity: number;
};

export type DirectionalLightControlType = LightingControlType & {
	position: [number, number, number];
	target: [number, number, number];
};

export type SpotLightControlType = LightingControlType & {
	distance: number;
	angle: number;
	penumbra: number;
	decay: number;
	power: number;
	position: [number, number, number];
};

export type ModelControlType = {
	id?: string;
	url?: string;
	scale: number;
	isRotating: boolean;
	rotationSpeed: number;
};

export type SettingType = {
	isSettingOpen: boolean;
	isCameraOpen: boolean;
};
