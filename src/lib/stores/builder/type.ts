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

export type ModelControlType = {
	scale: number;
	isRotating: boolean;
	rotationSpeed: number;
};

export type SettingType = {
	isSettingOpen: boolean;
	isCameraOpen: boolean;
};
